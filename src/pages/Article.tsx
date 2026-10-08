import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../api/apiArticle";
import { useFetch } from "../helpers/hooks/useFetch";
import styles from "./article.module.css";

const Article = () => {
  const { id = "" } = useParams();
  const { data, isLoading, error } = useFetch(getArticle, id);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) heading.current?.focus();
    document.title = data ? `${data.title} — News` : "Article — News";
    return () => { document.title = "React News"; };
  }, [data]);

  return (
    <main className={styles.article}>
      <Link className={styles.back} to="/">← Back to news</Link>
      {isLoading ? <p className={styles.notice} role="status">Loading article…</p> : error ? (
        <div className={styles.notice} role="alert">
          <h1>Article unavailable</h1>
          <p>We could not load this story. Please try again later.</p>
        </div>
      ) : data ? (
        <article>
          <header className={styles.header}>
            <a className={styles.source} href={data.sourceUrl} target="_blank" rel="noopener noreferrer">{data.source} ↗</a>
            <h1 ref={heading} tabIndex={-1} className={styles.title}>{data.title}</h1>
            <div className={styles.metadata}>
              <span>{data.author || "Author not provided by source"}</span>
              <time dateTime={data.published}>{data.publishedFromSource ? "Published " : "Shared "}{new Date(data.published).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</time>
            </div>
            <p className={styles.submitted}>Shared on Hacker News by {data.submittedBy}</p>
          </header>
          <img className={styles.preview} src={data.image || "/news-placeholder.svg"} alt={data.image ? `Preview for ${data.title}` : ""} referrerPolicy="no-referrer" onError={(event) => { if (event.currentTarget.getAttribute("src") !== "/news-placeholder.svg") {
              event.currentTarget.src = "/news-placeholder.svg";
            } }} />
          {data.unavailable ? (
            <div className={styles.notice}>
              <h2>Read this article at the source</h2>
              <p>The source did not provide readable article text. It may require a subscription or contain video instead of text.</p>
              <a className={styles.original} href={data.sourceUrl} target="_blank" rel="noopener noreferrer">Open original article ↗</a>
            </div>
          ) : (
            <div className={styles.body}>{data.blocks.map((block, index) => {
              if (block.type === "h2" || block.type === "h3") return <h2 key={index}>{block.text}</h2>;
              if (block.type === "blockquote") return <blockquote key={index}>{block.text}</blockquote>;
              if (block.type === "pre") return <pre key={index}>{block.text}</pre>;
              return <p key={index}>{block.type === "li" ? "• " : ""}{block.text}</p>;
            })}</div>
          )}
          <footer className={styles.footer}>
            <p>Source: <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer">{data.source} ↗</a></p>
            <p>Available text from the original page. Some sources provide only an excerpt.</p>
          </footer>
        </article>
      ) : null}
    </main>
  );
};

export default Article;
