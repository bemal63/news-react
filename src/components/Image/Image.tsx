import styles from "./styles.module.css";

interface Props {
  image: string;
}

const Image = ({ image }: Props) => {
  return (
    <div className={styles.wrapper}>
      {image ? <img src={image} alt="" loading="lazy" referrerPolicy="no-referrer" className={styles.image} onError={(event) => {
        if (event.currentTarget.getAttribute("src") !== "/news-placeholder.svg") event.currentTarget.src = "/news-placeholder.svg";
      }} /> : null}
    </div>
  );
};

export default Image;
