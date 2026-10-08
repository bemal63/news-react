import type { IncomingMessage, ServerResponse } from "node:http";
import { loadArticle } from "../../server/article.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.statusCode = 405;
    res.end(JSON.stringify({ message: "Method not allowed." }));
    return;
  }
  const url = new URL(req.url || "/", "https://localhost");
  const id = url.pathname.split("/").pop() || "";
  if (!/^\d{1,12}$/.test(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: "Invalid story ID." }));
    return;
  }
  try {
    const article = await loadArticle(id);
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.end(JSON.stringify(url.searchParams.get("preview") === "1" ? { image: article.image } : article));
  } catch {
    res.statusCode = 502;
    res.end(JSON.stringify({ message: "Could not load this article." }));
  }
}
