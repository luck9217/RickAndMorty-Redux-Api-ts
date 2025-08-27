import styles from "../styles/Home.module.css";
import buttonSpecial from "../styles/Button.module.css";
import CardComponent from "../component/common/CardComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";
import { ConfigRedux } from "../component/common/handleFavorites";
import characterSlice from "../component/store/character-slice";
import { useRouter } from "next/router";
import { SideBarComponent } from "../component/common/SideBar";
import CardEmpty from "../component/common/CardEmpty";
import { ButtonTwo } from "../component/styled/Button";
import { Header } from "../component/common/Header";

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
    let configAmount = 10;
    let totalLength = viewCharacters.length;
    let arrayTotal = [];
    let pageTemp = 0;
    let arrayNumber = 0;

    while (totalLength > 0) {
      let arrayPage = 0;
      let tempRow = [];

      while (arrayPage < configAmount && totalLength > 0) {
        tempRow[arrayPage] = viewCharacters[arrayNumber];

        arrayPage++;
        totalLength--;
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
      <Header title="Home" />
      <div className={styles.container}>
        <main className={styles.main}>
          <button
            className={buttonSpecial.button}
            onClick={() => checkLocalStore(favoriteRedux)}
          >
            REFRESH
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
            <CardEmpty />
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

        <div className={styles.copyright}>
          <p>© 2025 Rick and Morty App - Created by Lucas Chavez</p>
        </div>
      </div>
    </div>
  );
}
