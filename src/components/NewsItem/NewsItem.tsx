import { useNewsPreview } from "../../helpers/hooks/useNewsPreview";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import { INews } from "../../interfaces";
import styles from "./styles.module.css";

interface Props {
  item: INews;
}

const NewsItem = ({ item }: Props) => {
  const { ref, image } = useNewsPreview(item.id, item.image);
  return (
    <li className={styles.item}>
      <Link ref={ref} to={`/news/${item.id}`} tabIndex={-1} aria-hidden="true"
        className={styles.wrapper}
      >
        <img src={image} alt="" loading="lazy" referrerPolicy="no-referrer" className={styles.image} onError={(event) => {
          if (event.currentTarget.getAttribute("src") !== item.image) event.currentTarget.src = item.image;
        }} />
      </Link>
      <div className={styles.info}>
        <h3 className={styles.title}><Link to={`/news/${item.id}`}>{item.title}</Link></h3>
        <p className={styles.extra}>
          {formatTimeAgo(item.published)} by {item.author}
        </p>
      </div>
    </li>
  );
};

export default NewsItem;
