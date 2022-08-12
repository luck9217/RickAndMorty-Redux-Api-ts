import React from "react";
import styles from "../../styles/Home.module.css";
import SideBar from "../../styles/SideBar.module.css";

const CardEmpty = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>• • • CardEmpty • • •</h1>
        <p>
          Please press
          <button className={SideBar.hamburger}>☰</button> on left side
        </p>
        <p>You can choose Character, Episode and Location</p>
        <p>And select your favorite Character for Card</p>
        <p>All favorite charctares are saved in memory, if the web has been closed</p>
      </div>
    </div>
  );
};

export default CardEmpty;
