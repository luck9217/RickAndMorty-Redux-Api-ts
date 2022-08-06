import React, { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import characterSlice from "../component/store/character-slice";
import { useAppDispatch, useAppSelector } from "../component/hook/redux-hooks";
import { CharacterModel } from "../component/models/redux.models";
import { useSelector, useDispatch } from "react-redux";
import { ConfigRedux } from "../component/common/handleFavorites";
import styles from "../styles/Home.module.css";
const CardComponent = lazy(() => import("../component/common/CardComponent"));
import { GET_SEARCHCHARACTERS } from "../component/apollo/queries/characters";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SearchBarComponent } from "../component/common/SearchBar";

const Characters = () => {
  const { handleClickDetails, handleClickFav, handleClickDel } = ConfigRedux();
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

          <SearchBarComponent
            setPage={setPage}
            setDataSearch={setDataSearch}
            // handleChangeSearch={(event) => handleChangeSearch(event)}
          />

          {viewCharacters ? (
            <div className={styles.grid}>
              {viewCharacters.map((character: any, index: number) => {
                return (
                  <Suspense fallback={<div>Loading...</div>} key={index}>
                    <CardComponent
                      pathName={pathName}
                      character={character}
                      handleClickFav={handleClickFav}
                      handleClickDel={handleClickDel}
                      handleClickDetails={handleClickDetails}
                      fav={fav}
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
