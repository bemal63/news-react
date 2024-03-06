
import { TOTAL_PAGES } from "../../constants/constants";
import { NewsFilters } from "../NewsFilters/NewsFilters";
import NewsList from "../NewsList/NewsList";
import { Pagination } from "../Pagination/Pagination";
import styles from "./styles.module.css";

const NewsByFilter = ({ filters, changeFilters, isLoading, news }) => {

  const hendleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilters(filters.page_number + 1);
    }
  };

  const hendlePrevPage = () => {
    if (filters.page_number > 1) {
      changeFilters(filters.page_number - 1);
    }
  };

  const hendlePageClick = (pageNumber) => {
    changeFilters("page_number", pageNumber);
  };
  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} changeFilters={changeFilters} />
      
      <Pagination
        hendlePrevPage={hendlePrevPage}
        hendleNextPage={hendleNextPage}
        hendlePageClick={hendlePageClick}
        totalPage={TOTAL_PAGES}
        currentPage={filters.page_number}
      />

      <NewsList isLoading={isLoading} news={news} />

      <Pagination
        hendlePrevPage={hendlePrevPage}
        hendleNextPage={hendleNextPage}
        hendlePageClick={hendlePageClick}
        totalPage={TOTAL_PAGES}
        currentPage={filters.page_number}
      />
    </section>
  );
};

export default NewsByFilter;
