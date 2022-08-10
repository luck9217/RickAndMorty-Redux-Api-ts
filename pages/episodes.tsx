import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAppSelector } from "../component/hook/redux-hooks";
import styles from "../styles/Home.module.css";
const CardEpisode = lazy(() => import("../component/common/CardEpisode"));

import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SearchBarComponent } from "../component/common/SearchBar";
import { SideBarComponent } from "../component/common/SideBar";
import { GET_SEARCHEPISODES } from "../component/apollo/queries/episodes";
import LoadingComponent from "../component/common/LoadingComponent";

const Episodes = () => {
  //Return redux state
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  const [getMyValues, { loading, error, data: myValues }] = useLazyQuery(
    GET_SEARCHEPISODES(dataSearch, page)
  );
  const [viewEpisodes, setViewEpisodes] = useState([]);

  useEffect(() => {
    //get data from api
    getData();
  }, [favoriteRedux, myValues]);

  const getData = () => {
    getMyValues();
    if (!myValues) {
    } else {
      setViewEpisodes([...myValues.episodes.results]);
      let tempCounter = [];
      for (let i = 0; i < myValues.episodes.info.pages; i++) {
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
          <h1 className={styles.title}>Episodes</h1>

          <SearchBarComponent setPage={setPage} setDataSearch={setDataSearch} />

          {viewEpisodes ? (
            <div className={styles.grid}>
              {viewEpisodes.map((episode: any, index: number) => {
                return (
                  <Suspense fallback={<LoadingComponent/>} key={index}>
                    <CardEpisode episode={episode} />
                  </Suspense>
                );
              })}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </main>

        {viewEpisodes ? (
          <footer className={styles.footer}>
            <ul className="pagination">
              {allPage.map((element: any, index: number) => {
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

export default Episodes;
