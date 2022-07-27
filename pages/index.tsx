import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GET_CHARACTERS } from "../component/apollo/queries/characters";
import { useQuery } from "@apollo/client";
import { CardComponent } from "../component/common/CardComponent";
import InfoBarComponent from "../component/common/InfoBar";
import characterSlice from "../component/store/character-slice";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";

export default function Home() {
  const characterActions = characterSlice.actions;
  const favorite = useAppSelector((state) => state.character.all_characters);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  console.log("favorites: ", favorite);

  console.log("favorites: ", favorite.length);

  const mock = { id: 222, image: "ada", name: "asda", species: "asda" };

  const mock2 = { id: 222, image: "ada", name: "asda", species: "asda" };

  if (favorite.length === 0) {
  }

  const handleClick = () => {
    dispatch(characterActions.deleteCharacter(mock2));
  };

  const handleClick2 = () => {
    dispatch(characterActions.addCharacter(mock));
    console.log(favorite);
  };

  const { data } = useQuery(GET_CHARACTERS(page));
  if (!data) {
    return "loading";
  }

  const viewCharacters = data.characters.results;
  console.log(viewCharacters);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Ricky and Morty App!</h1>
        <button onClick={handleClick}>TEST REDUX</button>
        <button onClick={handleClick2}>TEST FAV</button>
        <InfoBarComponent />

        <div className={styles.grid}>
          {viewCharacters.map((element: any, index: number) => {
            return (
              <div key={index}>
                <CardComponent character={element} />
              </div>
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.pagination}>
          <a href="#">&laquo;</a>
          {viewCharacters.map((element: any, index: number) => {
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
