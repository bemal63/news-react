import { request as httpsRequest } from "node:https";
import { request as httpRequest } from "node:http";
import { lookup } from "node:dns/promises";
import { BlockList } from "node:net";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const blocked = new BlockList();
for (const [address, prefix] of [["0.0.0.0", 8], ["10.0.0.0", 8], ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.168.0.0", 16], ["192.0.0.0", 24], ["192.0.2.0", 24], ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24], ["100.64.0.0", 10], ["224.0.0.0", 3]] as const) blocked.addSubnet(address, prefix);
// Only global-unicast IPv6 destinations are allowed.
const safeImage = (value: string | null, base: string) => {
  try {
    const url = new URL(value || "", base);
    return value && url.protocol === "https:" ? url.href : null;
  } catch { return null; }
};

const fetchText = async (url: URL, signal: AbortSignal, redirects = 0): Promise<string> => {
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.port) throw new Error("Unsupported source URL");
  const addresses = await lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some(({ address, family }) => family === 4 ? blocked.check(address) : !/^2[0-9a-f]{3}:/i.test(address))) throw new Error("Source is not public");
  const destination = addresses[0];
  return new Promise((resolve, reject) => {
    const request = url.protocol === "https:" ? httpsRequest : httpRequest;
    const req = request(url, {
      signal,
      family: destination.family,
      headers: { "User-Agent": "NewsReader/1.0", Accept: "text/html,application/json" },
      // Pin the connection to the validated address, including for redirects.
      lookup: (_hostname, _options, callback) => callback(null, destination.address, destination.family),
    }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= 3) return reject(new Error("Too many redirects"));
        fetchText(new URL(res.headers.location, url), signal, redirects + 1).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) { res.resume(); reject(new Error("Source is unavailable")); return; }
      const type = res.headers["content-type"] || "";
      if (!/text\/html|application\/json|application\/xhtml\+xml/.test(type)) { res.resume(); reject(new Error("Not an article")); return; }
      const chunks: Buffer[] = [];
      let size = 0;
      res.on("data", (chunk: Buffer) => {
        size += chunk.length;
        if (size > 2_000_000) { res.destroy(new Error("Article too large")); return; }
        chunks.push(chunk);
      });
      res.on("error", reject);
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
    req.on("error", reject);
    req.end();
  });
};

const extractArticle = async (id: string) => {
  if (!/^\d{1,12}$/.test(id)) throw new Error("Invalid story ID");
  const signal = AbortSignal.timeout(18000);
  const story = JSON.parse(await fetchText(new URL(`https://hn.algolia.com/api/v1/items/${id}`), signal));
  if (story.type !== "story" || !story.title) throw new Error("Story not found");
  const discussionUrl = `https://news.ycombinator.com/item?id=${id}`;
  let sourceUrl = discussionUrl;
  if (story.url) {
    try {
      const url = new URL(story.url);
      if (["http:", "https:"].includes(url.protocol) && !url.username && !url.password) sourceUrl = url.href;
    } catch { /* Invalid source URLs fall back to the discussion. */ }
  }
  const result = {
    id,
    title: story.title as string,
    sourceUrl,
    source: new URL(sourceUrl).hostname.replace(/^www\./, ""),
    submittedBy: story.author as string,
    author: null as string | null,
    published: story.created_at as string,
    image: null as string | null,
    blocks: [] as { type: string; text: string }[],
    publishedFromSource: false,
    unavailable: false,
  };
  let dom: JSDOM | undefined;
  try {
    // JSDOM executes no scripts and loads no subresources by default.
    const html = sourceUrl !== discussionUrl ? await fetchText(new URL(sourceUrl), signal) : `<article>${story.text || ""}</article>`;
    dom = new JSDOM(html, { url: sourceUrl });
    const doc = dom.window.document;
    result.image = safeImage(doc.querySelector('meta[property="og:image"], meta[name="twitter:image"]')?.getAttribute("content") || null, sourceUrl);
    const author = doc.querySelector('meta[name="author"]')?.getAttribute("content");
    const article = new Readability(doc, { maxElemsToParse: 30000 }).parse();
    if (article?.content) {
      result.author = author || article.byline || null;
      if (article.publishedTime && !Number.isNaN(Date.parse(article.publishedTime))) { result.published = article.publishedTime; result.publishedFromSource = true; }
      const content = new JSDOM(article.content);
      result.blocks = Array.from(content.window.document.querySelectorAll("p, h2, h3, li, blockquote, pre"))
        .filter(el => !el.parentElement?.closest("li, blockquote, pre"))
        .map(el => ({ type: el.tagName.toLowerCase(), text: el.textContent?.trim() || "" }))
        .filter(block => block.text);
      if (!result.blocks.length && article.textContent) result.blocks = [{ type: "p", text: article.textContent.trim() }];
      content.window.close();
    }
    result.unavailable = !result.blocks.length;
  } catch { result.unavailable = true; }
  finally { dom?.window.close(); }
  return result;
};

// Small, temporary cache shared by feed previews and the article reader.
const articleCache = new Map<string, { expires: number; data: Awaited<ReturnType<typeof extractArticle>> }>();
const pendingArticles = new Map<string, Promise<Awaited<ReturnType<typeof extractArticle>>>>();

export const loadArticle = (id: string) => {
  const cached = articleCache.get(id);
  if (cached && cached.expires > Date.now()) return Promise.resolve(cached.data);
  const pending = pendingArticles.get(id);
  if (pending) return pending;
  const request = extractArticle(id).then(data => {
    articleCache.delete(id);
    if (articleCache.size >= 40) articleCache.delete(articleCache.keys().next().value!);
    articleCache.set(id, { data, expires: Date.now() + 5 * 60 * 1000 });
    return data;
  }).finally(() => pendingArticles.delete(id));
  pendingArticles.set(id, request);
  return request;
};
