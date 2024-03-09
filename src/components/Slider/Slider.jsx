import React, { useRef } from "react";
import styles from "./styles.module.css";

export const Slider = ({ children }) => {
  const sliderlRef = useRef(null)

  const scrollLeft = () => {
    sliderlRef.current.scrollLeft -= 150;
  }

  const scrollRight = () => {
    sliderlRef.current.scrollLeft += 150;
  
  }
  return (
    <div className={styles.slider}>
      <botton onClick={scrollLeft} className={styles.arrow}>{`<`}</botton>
      {React.cloneElement(children, {ref: sliderlRef})}
      <botton onClick={scrollRight} className={styles.arrow}>{`>`}</botton>
    </div>
  );
}; 
