import { useNewsPreview } from "../../helpers/hooks/useNewsPreview";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import { INews } from "../../interfaces";
import Image from "../Image/Image";
import styles from "./styles.module.css";

interface Props {
  item: INews;
}

const NewsBanner = ({ item }: Props) => {
  const { ref, image } = useNewsPreview(item.id, item.image);
  return (
    <div className={styles.newsbanner}>
      <Link ref={ref} to={`/news/${item.id}`} tabIndex={-1} aria-hidden="true"><Image image={image} /></Link>
      <h3 className={styles.title}><Link to={`/news/${item.id}`}>{item.title}</Link></h3>
      <p className={styles.extra}>
        {formatTimeAgo(item.published)} by {item.author}
      </p>
    </div>
  );
};

export default NewsBanner;
