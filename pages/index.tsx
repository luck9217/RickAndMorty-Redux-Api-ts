import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import CardComponent from "../component/common/CardComponent";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";
import Link from "next/link";
import { ConfigRedux } from "../component/common/handleFavorites";
import characterSlice from "../component/store/character-slice";
import { useRouter } from "next/router";
import { SideBarComponent } from "../component/common/SideBar";

export default function Home() {
  const { handleClickFav, handleClickDel, checkLocalStore } = ConfigRedux();

  const characterActions = characterSlice.actions;

  const dispatch = useAppDispatch();

  //Return redux state
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );

  const [viewCharacters, setViewCharacters] = useState(favoriteRedux);
  const [page, setPage] = useState(0);
  const [viewPage, setViewPage] = useState([]);
  const [viewCard, setViewCard] = useState([]);

  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);

  useEffect(() => {
    if (favoriteRedux.length > 0) {
      localStorage.setItem("fav", JSON.stringify(favoriteRedux));
    }

    setViewCharacters(favoriteRedux);
  }, [favoriteRedux]);

  useEffect(() => {
    listPages(viewCharacters);
  }, [viewCharacters, page]);

  const listPages = (viewCharacters: CharacterModel[]) => {
    let congifAmount = 10;
    let totalLegth = viewCharacters.length;
    let arrayTotal = [];
    let pageTemp = 0;
    let arrayNumber = 0;

    while (totalLegth > 0) {
      let arrayPage = 0;
      let tempRow = [];

      while (arrayPage < congifAmount && totalLegth > 0) {
        tempRow[arrayPage] = viewCharacters[arrayNumber];

        arrayPage++;
        totalLegth--;
        arrayNumber++;
      }
      arrayTotal[pageTemp] = tempRow;
      pageTemp++;
    }

    setViewPage(arrayTotal);
    setViewCard(arrayTotal[page]);
  };

  return (
    <div className="container">
      <SideBarComponent />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Ricky and Morty App!</h1>

          <button onClick={() => console.log(viewPage)}>PROBAR</button>
          <button onClick={() => checkLocalStore(favoriteRedux)}>
            ACTUALIZAR
          </button>

          {viewCard ? (
            <div className={styles.grid}>
              {viewCard.map((character: any, index: number) => {
                return (
                  <div key={index}>
                    <CardComponent
                      pathName={pathName}
                      character={character}
                      handleClickFav={handleClickFav}
                      handleClickDel={handleClickDel}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>CART EMPTY</div>
          )}
        </main>

        {viewPage ? (
          <footer className={styles.footer}>
            <ul className="pagination">
              {viewPage.map((element: CharacterModel, index: number) => {
                return (
                  <li key={index}>
                    <a
                      onClick={() => {
                        setPage(index);
                      }}
                      className={`${index === page ? "active" : ""}`}
                    >
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            </ul>
          </footer>
        ) : (
          <div>FOOTER EMPTY</div>
        )}
      </div>
    </div>
  );
}
