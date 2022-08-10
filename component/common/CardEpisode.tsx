import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import buttonSpecial from "../../styles/Button.module.css";

const CardEpisode = ({ episode }) => {
   
  return (
    <div className={styles.card}>
      <h2>{episode.name}</h2>
      <p>{episode.episode}</p>
      <Link href={`/episodes/details/${episode.id}`}>
        <button className={buttonSpecial.button}>Details</button>
      </Link>
    </div>
  );
};

export default CardEpisode;
