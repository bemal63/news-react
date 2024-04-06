import axios from "axios";
import { CategoriApiResponse, NewsApiResponse, ParamsType } from "../interfaces";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;


export const getNews = async (params?: ParamsType): Promise<NewsApiResponse> => {
  try {
    const {
      page_number = 1,
      page_size = 10,
      category,
      keywords,
    } = params || {};
    const responseNews = await axios.get<NewsApiResponse>(`${BASE_URL}search`, {
      params: {
        apiKey: API_KEY,
        page_number,
        page_size,
        category,
        keywords,
      },
    });
    return responseNews.data;
  } catch (error) {
    console.log(error);
    return {news: [], page: 1, status: "error"}
  }
};

export const getLatestNews = async (): Promise<NewsApiResponse> => {
  try {
    const responseCategories = await axios.get<NewsApiResponse>(
      `${BASE_URL}latest-news`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    return responseCategories.data;
  } catch (error) {
    console.log(error);
    return {news: [], page: 1, status: "error"}
  }
};

export const getCategories = async (): Promise<CategoriApiResponse> => {
  try {
    const responseCategories = await axios.get<CategoriApiResponse>(
      `${BASE_URL}available/categories`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    return responseCategories.data;
  } catch (error) {
    console.log(error);
    return {category: [], description: "", status: "error"}
  }
};
