import axios from "axios";

export interface ArticleResponse {
  id: string;
  title: string;
  sourceUrl: string;
  source: string;
  submittedBy: string;
  author: string | null;
  published: string;
  image: string | null;
  blocks: { type: string; text: string }[];
  publishedFromSource: boolean;
  unavailable: boolean;
}

export const getArticle = async (id = ""): Promise<ArticleResponse> => {
  const { data } = await axios.get<ArticleResponse>(`/api/articles/${encodeURIComponent(id)}`, { timeout: 22000 });
  return data;
};
