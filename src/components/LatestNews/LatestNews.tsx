import { getLatestNews } from "../../api/apiNews";
import { useFetch } from "../../helpers/hooks/useFetch";
import { NewsApiResponse } from "../../interfaces";
import BannersList from "../BannersList/BannersList";
import styles from "./styles.module.css";

export const LatestNews = () => {
  const { data, isLoading, error } = useFetch<NewsApiResponse, null>(getLatestNews);

  return (
    <section className={styles.section}>
      {error && <p role="alert">Could not load latest news. Please try again later.</p>}
      <BannersList banners={data && data.news} isLoading={isLoading} />
    </section>
  );
};
