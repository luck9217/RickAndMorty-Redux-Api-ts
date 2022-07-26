import styles from "../../styles/Home.module.css";
import buttonSpecial from "../../styles/Button.module.css";
import Image from "next/image";
import { useState } from "react";

export const CardComponent = ({ character }) => {
  const [fav, setFav] = useState(false);
  if (!character) {
    return <h4>Loading</h4>;
  }
  return (
    <div className={styles.card}>
      <img src={character.image} style={{ width: "100%" }} />
      <h2>{character.name}</h2>
      <p>{character.species}</p>

      <div className={buttonSpecial.containerButton}>
        <button className={buttonSpecial.button}>Details</button>

        {fav ? (
          <button className={buttonSpecial.button}>❤</button>
        ) : (
          <button className={buttonSpecial.button}>✘</button>
        )}
      </div>
    </div>
  );
};
