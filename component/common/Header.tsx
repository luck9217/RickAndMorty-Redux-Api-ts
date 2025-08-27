import React from "react";
import styles from "../../styles/Header.module.css";

export const Header = ({ title }) => {
  const handleMenuClick = () => {
    window.dispatchEvent(new Event("toggle-nav"));
  };

  // Show main app title on home page, otherwise show page title
  const displayTitle = title === "Home" ? "Rick and Morty App!" : title;

  return (
    <header className={styles.header}>
      <button
        className={styles.hamburger}
        onClick={handleMenuClick}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <h1 className={styles.title}>{displayTitle}</h1>
    </header>
  );
};
