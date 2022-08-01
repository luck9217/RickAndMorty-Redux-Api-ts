import React, { useEffect, useState } from "react";
import Link from "next/link";
import characterSlice from "../component/store/character-slice";
import { useAppDispatch, useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";
import { useSelector, useDispatch } from "react-redux";
import { ConfigRedux } from "../component/common/handleFavorites";
import styles from "../styles/Home.module.css";
import { CardComponent } from "../component/common/CardComponent";
import { GET_CHARACTERS } from "../component/apollo/queries/characters";
import { useQuery } from "@apollo/client";

const Characters = () => {
  const {
    handleClickDetails,
    handleClickClean,
    handleClickFav,
    handleClickDel,
  } = ConfigRedux();
  //Return redux state
  
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );

  const [fav, setFav] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (favoriteRedux.length > 0) {
      localStorage.setItem("fav", JSON.stringify(favoriteRedux));
    }

    console.log("Redux", favoriteRedux);
    console.log("localStorage", JSON.parse(localStorage.getItem("fav")));
  }, [favoriteRedux]);

  const { data } = useQuery(GET_CHARACTERS(page));
  if (!data) {
    return "loading";
  }

  //   //send data of character to component card
  const viewCharacters = data.characters.results;

  return (
    <div className={styles.container}>
      characters
      <Link href="/">
        <a>Go to Home</a>
      </Link>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Characters</h1>

          <ul>
            <li>
              <Link href="/characters">
                <a>Characters</a>
              </Link>
            </li>
            <li>
              <Link href="/locations">
                <a>Locations</a>
              </Link>
            </li>
            <li>
              <Link href="/episodes">
                <a>Episodes</a>
              </Link>
            </li>
          </ul>

          <button onClick={handleClickDetails}>VER CART</button>
          <button onClick={handleClickClean}>LIMPIAR TODO</button>

          <div className="flex">
            <button onClick={() => setFav(true)}>FAVORITOS</button>
            <button onClick={() => setFav(false)}>DELETE</button>
          </div>

          {/* <InfoBarComponent /> */}

          <div className={styles.grid}>
            {viewCharacters.map((character: any, index: number) => {
              return (
                <div key={index}>
                  <CardComponent
                    character={character}
                    handleClickFav={handleClickFav}
                    handleClickDel={handleClickDel}
                    handleClickDetails={handleClickDetails}
                    fav={fav}
                  />
                </div>
              );
            })}
          </div>
        </main>
        <footer className={styles.footer}>
          <ul className="pagination">
            {viewCharacters.map((element: CharacterModel, index: number) => {
              return (
                <li key={index}>
                  <a
                    onClick={() => {
                      setPage(index + 1);
                    }}
                    className={`${page === index + 1 ? "active" : ""}`}
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Characters;
