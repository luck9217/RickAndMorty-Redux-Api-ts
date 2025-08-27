import React from "react";
import styles from "../../styles/Home.module.css";
import SideBar from "../../styles/SideBar.module.css";

const CardEmpty = () => {
  return (
    <div className={styles.main}>
      <h1>• • • CardEmpty • • •</h1>
      <p>
        Please use the menu button in the header to navigate and choose
        Characters, Episodes, or Locations.
      </p>
      <p>Select your favorite Characters to add them to your collection!</p>
      <p>Your favorite characters are saved even if you close the site.</p>
    </div>
  );
};

export default CardEmpty;
