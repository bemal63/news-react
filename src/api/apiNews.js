import axios from "axios";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async ({
  page_number = 1,
  page_size = 10,
  category,
  keywords,
}) => {
  try {
    const responseNews = await axios.get(`${BASE_URL}search`, {
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
  }
};

export const getLatestNews = async () => {
  try {
    const responseCategories = await axios.get(
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
  }
};

export const getCategories = async () => {
  try {
    const responseCategories = await axios.get(
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
  }
};
