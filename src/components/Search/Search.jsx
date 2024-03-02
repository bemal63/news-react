import styles from "./styles.module.css";

export const Search = ({ keywords, setKeywords }) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};
