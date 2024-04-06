import { useRef } from "react";
import styles from "./styles.module.css";
import * as React from "react";

interface Props {
  children: React.ReactElement;
  step?: number;
}

export const Slider = ({ children, step = 150 }: Props) => {
  const sliderlRef = useRef<HTMLElement | null>(null);

  const scrollLeft = () => {
    if (!sliderlRef.current) return
    sliderlRef.current.scrollLeft -= step;
  };

  const scrollRight = () => {
    if (!sliderlRef.current) return;
    sliderlRef.current.scrollLeft += step;
  };
  return (
    <div className={styles.slider}>
      <button onClick={scrollLeft} className={styles.arrow}>{`<`}</button>
      {React.cloneElement(children, { ref: sliderlRef })}
      <button onClick={scrollRight} className={styles.arrow}>{`>`}</button>
    </div>
  );
};
