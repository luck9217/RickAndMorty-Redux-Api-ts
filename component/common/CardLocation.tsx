import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import buttonSpecial from "../../styles/Button.module.css";

const CardLocation = ({ location }) => {
  return (
    <div className={styles.card}>
      <h2>{location.name}</h2>
      <p>{location.dimension}</p>
      <Link href={`/locations/details/${location.id}`}>
        <button className={buttonSpecial.button}>Details</button>
      </Link>
    </div>
  );
};

export default CardLocation;
