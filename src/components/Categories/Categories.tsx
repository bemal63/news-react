import { forwardRef } from "react";
import styles from "./styles.module.css";
import { CategoriType } from "../../interfaces";
import * as React from "react";

interface Props {
  categories?: CategoriType[];
  setSelectCategories: (category: CategoriType | null) => void;
  selectCategories: CategoriType | null;
}

export const Categories = forwardRef(
  (
    { categories, selectCategories, setSelectCategories }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={styles.categories}>
        <button
          onClick={() => setSelectCategories(null)}
          className={!selectCategories ? styles.active : styles.item}
        >
          All
        </button>
        {categories?.map((category) => {
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
        s
      </div>
    );
  }
);

Categories.displayName = "Categories";
