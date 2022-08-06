import styles from "../../styles/Home.module.css";
import buttonSpecial from "../../styles/Button.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const CardComponent = ({
  character,
  handleClickFav,
  handleClickDel,
  handleClickDetails,
  fav,
  pathName,
}) => {
  //looking favorites character and create new propietie to filter on DOM
  let newData = { ...character };

  if (JSON.parse(localStorage.getItem("fav"))) {
    const found = JSON.parse(localStorage.getItem("fav")).find(
      (data: any) => data.id === character.id
    );
    if (found) {
      newData.isFav = true;
    } else {
      newData.isFav = false;
    }
  }

  if (!character) {
    return <h4>Loading</h4>;
  }

  return (
    <div className={styles.card}>
      {pathName === "/characters" && newData.isFav ? (
        <div className={styles.badge}>❤</div>
      ) : (
        ""
      )}

      <img src={newData.image} style={{ width: "100%" }} />

      <h2>{newData.name}</h2>
      <p>{newData.species}</p>

      <div className={buttonSpecial.containerButton}>
        <Link href={`/characters/details/${newData.id}`}>
          <button className={buttonSpecial.button} onClick={handleClickDetails}>
            Details
          </button>
        </Link>

        {pathName != "/" && !newData.isFav ? (
          <button
            className={buttonSpecial.button}
            onClick={() => handleClickFav(character)}
          >
            ❤ +
          </button>
        ) : (
          <button
            className={buttonSpecial.button}
            onClick={() => handleClickDel(character)}
          >
            ✘
          </button>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
