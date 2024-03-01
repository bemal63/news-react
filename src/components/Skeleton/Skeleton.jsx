/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

const Skeleton = ({ count = 1, type = "banner" }) => {
  return (
    <div>
      {count > 1 ? (
        <ul className={styles.list}>
          {[...Array(count)].map((_, index) => {
            <li
              key={index}
              className={type === "banner" ? styles.banner : styles.item}
            ></li>;
          })}
        </ul>
      ) : (
        <li className={type === "banner" ? styles.banner : styles.item}></li>
      )}
    </div>
  );
};

export default Skeleton;
