import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../styles/SideBar.module.css";

export const SideBarComponent = () => {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  let home = false;
  let characters = false;
  let locations = false;
  let episodes = false;

  switch (pathName) {
    case "/":
      home = true;
      break;
    case "/characters":
      characters = true;
      break;
    case "/locations":
      locations = true;
      break;
    case "/episodes":
      episodes = true;
      break;

    default:
      console.log("pathName");
  }

  return (
    <nav className={SideBar.container}>
      <button
        className={SideBar.hamburger}
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        ☰
      </button>
      <div
        className={`${
          isNavExpanded ? SideBar.menuexpanded : SideBar.menuhidden
        }`}
      >
        <ul>
          <li>
            <Link href="/">
              <a className={`${home ? SideBar.active : ""}`}>Home</a>
            </Link>
          </li>

          <li>
            <Link href="/characters">
              <a className={`${characters ? SideBar.active : ""}`}>
                Characters
              </a>
            </Link>
          </li>
          <li>
            <Link href="/locations">
              <a className={`${locations ? SideBar.active : ""}`}>Locations</a>
            </Link>
          </li>
          <li>
            <Link href="/episodes">
              <a className={`${episodes ? SideBar.active : ""}`}>Episodes</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
