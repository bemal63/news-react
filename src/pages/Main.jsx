import { useEffect, useState } from "react";
import NewsBanner from "../components/NewsBanner/NewsBanner";
import styles from "./styles.module.css";
import { getCategories, getNews } from "../api/apiNews";
import NewsList from "../components/NewsList/NewsList";
import Skeleton from "../components/Skeleton/Skeleton";
import { Pagination } from "../components/Pagination/Pagination";
import { Categories } from "../components/Categories/Categories";
import { Search } from "../components/Search/Search";
import { useDebounce } from "../helpers/hooks/useDebounced";

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState("All");
  const [keywords, setKeywords] = useState("")
  const totalPage = 10;
  const pageSize = 10;
  const debouncedKeywords = useDebounce(keywords, 1500)

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true);
      const responseNews = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectCategories === "All" ? null : selectCategories,
        keywords: debouncedKeywords,
      });
      setNews(responseNews.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const responseCategories = await getCategories();
      setCategories(["All", ...responseCategories.categories]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectCategories, debouncedKeywords]);

  const hendleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const hendlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const hendlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(keywords)

  return (
    <main className={styles.main}>
      <Categories
        categories={categories}
        setSelectCategories={setSelectCategories}
        selectCategories={selectCategories}
      />
      <Search keywords={keywords} setKeywords={setKeywords} />
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton type={"banner"} count={1} />
      )}
      <Pagination
        hendlePrevPage={hendlePrevPage}
        hendleNextPage={hendleNextPage}
        hendlePageClick={hendlePageClick}
        totalPage={totalPage}
        currentPage={currentPage}
      />
      {!isLoading ? (
        <NewsList news={news} />
      ) : (
        <Skeleton type={"item"} count={10} />
      )}
      <Pagination
        hendlePrevPage={hendlePrevPage}
        hendleNextPage={hendleNextPage}
        hendlePageClick={hendlePageClick}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Main;
