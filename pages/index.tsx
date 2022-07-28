import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GET_CHARACTERS } from "../component/apollo/queries/characters";
import { useQuery } from "@apollo/client";
import { CardComponent } from "../component/common/CardComponent";
import InfoBarComponent from "../component/common/InfoBar";
import characterSlice from "../component/store/character-slice";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";
//import { useLocalStorage } from "../component/hook/useLocalStorage";

export default function Home() {
  const characterActions = characterSlice.actions;
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );
  const dispatch = useAppDispatch();
  //const [favSavedStorage, setfavSavedStorage] = useLocalStorage("fav", []);

  const [temp, setTemp] = useState([]);

  const [fav, setFav] = useState(true);

  const [page, setPage] = useState(10);

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

  const handleClickDetails = () => {
    console.log("CART Redux", favoriteRedux);
    console.log("CART localstore", JSON.parse(localStorage.getItem("fav")));
  };

  const handleClickClean = () => {
    localStorage.removeItem("fav");
    dispatch(characterActions.cleanCharacter());
  };

  //ADD character selecter
  const handleClickFav = (characterSelected: CharacterModel) => {
    //Redux data
    checkLocalStore(favoriteRedux);

    dispatch(characterActions.addCharacter(characterSelected));
  };

  //DELETE character selecter
  const handleClickDel = (characterSelected: CharacterModel) => {
    checkLocalStore(favoriteRedux);

    const foundFav = favoriteRedux.find(
      (fav) => fav.id === characterSelected.id
    );
    if (foundFav) {
      if (favoriteRedux.length === 1) {
        localStorage.removeItem("fav");
      }
      //Redux data
      dispatch(characterActions.deleteCharacter(characterSelected));
    }
  };

  const checkLocalStore = (favoriteRedux: CharacterModel[]) => {
    const checkLocalStorage = JSON.parse(localStorage.getItem("fav"));
    if (favoriteRedux.length === 0) {
      if (checkLocalStorage) {
        if (checkLocalStorage.length > 0) {
          pushToRedux(checkLocalStorage);
        }
      }
    }
  };

  const pushToRedux = (dataArray: CharacterModel[]) => {
    dataArray.map((data) => {
      dispatch(characterActions.addCharacter(data));
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Ricky and Morty App!</h1>
        <button onClick={handleClickDetails}>VER CART</button>
        <button onClick={handleClickClean}>LIMPIAR TODO</button>

        <div className="flex">
          <button onClick={() => setFav(true)}>FAVORITOS</button>
          <button onClick={() => setFav(false)}>DELETE</button>
        </div>

        <InfoBarComponent />

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
        <div className={styles.pagination}>
          <a href="#">&laquo;</a>
          {viewCharacters.map((element: CharacterModel, index: number) => {
            return (
              <a key={index + 1} href="#">
                {" "}
                {index + 1}
              </a>
            );
          })}

          <a href="#">&raquo;</a>
        </div>
      </footer>
    </div>
  );
}
