
import styles from "./styles.module.css";
import { getNews } from "../api/apiNews";
import { useDebounce } from "../helpers/hooks/useDebounced";
import { useFetch } from "../helpers/hooks/useFetch";
import { PAGE_SIZE } from "../constants/constants";
import { useFilters } from "../helpers/hooks/useFilters";
import { LatestNews } from "../components/LatestNews/LatestNews";
import NewsByFilter from "../components/NewsByFilter/NewsByFilter";

const Main = () => {
  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  });

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  console.log(filters.keywords);

  return (
    <main className={styles.main}>
      <LatestNews isLoading={isLoading} banners={data && data.news} />
      <NewsByFilter
        news={data?.news}
        isLoading={isLoading}
        filters={filters}
        changeFilters={changeFilters}
      />
    </main>
  );
};

export default Main;
