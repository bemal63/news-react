import { getNews } from "../../api/apiNews";
import { PAGE_SIZE, TOTAL_PAGES } from "../../constants/constants";
import { useDebounce } from "../../helpers/hooks/useDebounced";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useFilters } from "../../helpers/hooks/useFilters";
import { NewsFilters } from "../NewsFilters/NewsFilters";
import NewsList from "../NewsList/NewsList";
import { PaginationWrapper } from "../PaginationWrapper/PaginationWrapper";
import styles from "./styles.module.css";
import { NewsApiResponse, ParamsType } from "../../interfaces";

const NewsByFilter = () => {
  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  });

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading, error } = useFetch<NewsApiResponse, ParamsType>(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  const totalPages = Math.min(data?.totalPages || 1, TOTAL_PAGES);

  const hendleNextPage = () => {
    if (filters.page_number < totalPages) {
      changeFilters("page_number", filters.page_number + 1);
    }
  };

  const hendlePrevPage = () => {
    if (filters.page_number > 1) {
      changeFilters("page_number", filters.page_number - 1);
    }
  };

  const hendlePageClick = (pageNumber: number) => {
    changeFilters("page_number", pageNumber);
  };
  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} changeFilters={changeFilters} />

      {error && <p role="alert">Could not load news. Please try again later.</p>}
      {!isLoading && !error && data?.news.length === 0 && <p>No news found.</p>}
      <PaginationWrapper
        top
        hendlePrevPage={hendlePrevPage}
        hendleNextPage={hendleNextPage}
        hendlePageClick={hendlePageClick}
        totalPage={totalPages}
        currentPage={filters.page_number}
      >
        <NewsList isLoading={isLoading} news={data?.news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilter;
