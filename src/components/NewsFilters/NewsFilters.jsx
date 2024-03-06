import { getCategories } from "../../api/apiNews";
import { useFetch } from "../../helpers/hooks/useFetch";
import { Categories } from "../Categories/Categories";
import { Search } from "../Search/Search";
import styles from "./styles.module.css";

export const NewsFilters = ({ filters, changeFilters }) => {
  const { data: dataCategories } = useFetch(getCategories);
  return (
    <div className={styles.filters}>
      {dataCategories ? (
        <Categories
          categories={dataCategories.categories}
          setSelectCategories={(category) =>
            changeFilters("category", category)
          }
          selectCategories={filters.category}
        />
      ) : null}
      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilters("keywords", keywords)}
      />
    </div>
  );
};
