import axios from "axios";
import { CategoriApiResponse, CategoriType, INews, NewsApiResponse, ParamsType } from "../interfaces";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const categories: CategoriType[] = ["technology", "programming", "science", "business", "health", "environment"];

interface Story {
  objectID: string;
  title: string | null;
  url: string | null;
  author: string;
  created_at: string;
}
interface SearchResponse {
  hits: Story[];
  page: number;
  nbPages: number;
}

const fetchNews = async (params: ParamsType = {}): Promise<NewsApiResponse> => {
  if (!BASE_URL) throw new Error("News API URL is not configured.");
  const { page_number = 1, page_size = 10, category, keywords = "" } = params;
  const query = [category, keywords.trim()].filter(Boolean).join(" ");
  const { data } = await axios.get<SearchResponse>(`${BASE_URL.replace(/\/$/, "")}/search_by_date`, {
    params: { tags: "story", query, page: page_number - 1, hitsPerPage: page_size },
    timeout: 15000,
  });
  if (!Array.isArray(data.hits)) throw new Error("Unexpected news API response.");
  const news: INews[] = data.hits.filter((story) => story.title).map((story) => ({
    id: story.objectID,
    title: story.title!,
    url: story.url || `https://news.ycombinator.com/item?id=${story.objectID}`,
    author: story.author,
    published: story.created_at,
    category: category ? [category] : [],
    description: "",
    image: "/news-placeholder.svg",
    language: "en",
  }));
  return { news, page: data.page + 1, totalPages: data.nbPages, status: "ok" };
};

export const getNews = (params?: ParamsType): Promise<NewsApiResponse> => fetchNews(params);
export const getLatestNews = (): Promise<NewsApiResponse> => fetchNews({ page_size: 6 });
// Hacker News has no category taxonomy; these buttons search for topics.
export const getCategories = async (): Promise<CategoriApiResponse> => ({
  category: categories, description: "Hacker News topics", status: "ok",
});
