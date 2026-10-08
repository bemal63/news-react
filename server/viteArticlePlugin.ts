import type { Plugin } from "vite";
import { loadArticle } from "./article";

export const articlePlugin = (): Plugin => ({
  name: "news-article-reader",
  configureServer(server) {
    server.middlewares.use("/api/articles", async (req, res) => {
      if (req.method !== "GET") { res.statusCode = 405; res.end(); return; }
      const id = req.url?.split("?")[0].replace(/^\//, "") || "";
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (!/^\d{1,12}$/.test(id)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Invalid story ID." }));
        return;
      }
      try {
        const article = await loadArticle(id);
        const previewOnly = new URL(req.url || "/", "http://localhost").searchParams.get("preview") === "1";
        res.end(JSON.stringify(previewOnly ? { image: article.image } : article));
      }
      catch { res.statusCode = 502; res.end(JSON.stringify({ message: "Could not load this article." })); }
    });
  },
});
