/* eslint-disable react/prop-types */
import styles from "./styles.module.css";
import { IPaginationProps } from "../../interfaces";

export const Pagination = ({
  totalPage,
  hendlePrevPage,
  hendleNextPage,
  hendlePageClick,
  currentPage,
}: IPaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage <= 1}
        onClick={hendlePrevPage}
        className={styles.arrow}
      >
        {"<"}
      </button>
      <div className={styles.list}>
        {[...Array(totalPage)].map((_, index) => {
          return (
            <button
              onClick={() => hendlePageClick(index + 1)}
              className={styles.pageNumber}
              disabled={index + 1 === currentPage}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      <button
        disabled={currentPage >= totalPage}
        onClick={hendleNextPage}
        className={styles.arrow}
      >
        {">"}
      </button>
    </div>
  );
};
