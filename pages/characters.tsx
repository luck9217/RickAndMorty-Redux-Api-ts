import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";
import { ConfigRedux } from "../component/common/handleFavorites";
import styles from "../styles/Home.module.css";
const CardComponent = lazy(() => import("../component/common/CardComponent"));
import { GET_SEARCHCHARACTERS } from "../component/apollo/queries/characters";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SearchBarComponent } from "../component/common/SearchBar";
import { SideBarComponent } from "../component/common/SideBar";
import LoadingComponent from "../component/common/LoadingComponent";

const Characters = () => {
  const { handleClickFav, handleClickDel } = ConfigRedux();
  //Return redux state
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );

  const [fav, setFav] = useState(true);

  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState([]);
  const [dataSearch, setDataSearch] = useState("");

  const [getMyValues, { loading, error, data: myValues }] = useLazyQuery(
    GET_SEARCHCHARACTERS(dataSearch, page)
  );

  const [viewCharacters, setViewCharacters] = useState([]);

  useEffect(() => {
    if (favoriteRedux.length > 0) {
      localStorage.setItem("fav", JSON.stringify(favoriteRedux));
    }

    //get data from api
    getData();
  }, [favoriteRedux, myValues]);

  const getData = () => {
    getMyValues();
    if (!myValues) {
    } else {
      setViewCharacters([...myValues.characters.results]);
      let tempCounter = [];
      for (let i = 0; i < myValues.characters.info.pages; i++) {
        tempCounter.push(i);
      }
      setAllPage(tempCounter);
    }
  };

  return (
    <div>
      <SideBarComponent />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Characters</h1>

          <SearchBarComponent setPage={setPage} setDataSearch={setDataSearch} />

          {viewCharacters ? (
            <div className={styles.grid}>
              {viewCharacters.map((character: any, index: number) => {
                return (
                  <Suspense fallback={<LoadingComponent/>} key={index}>
                    <CardComponent
                      pathName={pathName}
                      character={character}
                      handleClickFav={handleClickFav}
                      handleClickDel={handleClickDel}
                    />
                  </Suspense>
                );
              })}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </main>

        {viewCharacters ? (
          <footer className={styles.footer}>
            <ul className="pagination">
              {allPage.map((element: CharacterModel, index: number) => {
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
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Characters;
