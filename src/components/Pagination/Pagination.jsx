/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

const Pagination = ({
  totalPage,
  hendlePrevPage,
  hendleNextPage,
  hendlePageClick,
  currentPage,
}) => {
  return (
    <div className={styles.pagination}>
      <button onClick={hendlePrevPage} className={styles.arrow}>
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
      <button onClick={hendleNextPage} className={styles.arrow}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
