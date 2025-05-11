import styles from "./styles.module.css";
import { LatestNews } from "../components/LatestNews/LatestNews";
import NewsByFilter from "../components/NewsByFilter/NewsByFilter";

// TODO:

const Main = () => {
  return (
    <main className={styles.main}>
      <LatestNews />
      <NewsByFilter />
    </main>
  );
};

export default Main;
