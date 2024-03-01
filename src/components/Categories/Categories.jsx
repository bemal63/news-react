import styles from "./styles.module.css";

export const Categories = ({
  categories,
  selectCategories,
  setSelectCategories,
}) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => {
        return (
          <button
            onClick={() => setSelectCategories(category)}
            className={
              selectCategories === category ? styles.active : styles.item
            }
            key={category}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
