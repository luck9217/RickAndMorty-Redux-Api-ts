import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAppSelector } from "../component/hook/redux-hooks";
import styles from "../styles/Home.module.css";
const CardLocation = lazy(() => import("../component/common/CardLocation"));

import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SearchBarComponent } from "../component/common/SearchBar";
import { SideBarComponent } from "../component/common/SideBar";
import { GET_SEARCHLOCATIONS } from "../component/apollo/queries/locations";
import LoadingComponent from "../component/common/LoadingComponent";

const Locations = () => {
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
    GET_SEARCHLOCATIONS(dataSearch, page)
  );
  const [viewLocations, setViewCharacters] = useState([]);

  useEffect(() => {
    //get data from api
    getData();
  }, [favoriteRedux, myValues]);

  const getData = () => {
    getMyValues();
    if (!myValues) {
    } else {
      setViewCharacters([...myValues.locations.results]);
      let tempCounter = [];
      for (let i = 0; i < myValues.locations.info.pages; i++) {
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
          <h1 className={styles.title}>Locations</h1>

          <SearchBarComponent setPage={setPage} setDataSearch={setDataSearch} />

          {viewLocations ? (
            <div className={styles.grid}>
              {viewLocations.map((location: any, index: number) => {
                return (
                  <Suspense fallback={<LoadingComponent />} key={index}>
                    <CardLocation location={location} />
                  </Suspense>
                );
              })}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </main>

        {viewLocations ? (
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

export default Locations;
