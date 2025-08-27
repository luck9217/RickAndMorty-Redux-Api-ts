import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SideBar from "../../styles/SideBar.module.css";

export const SideBarComponent = () => {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // Allow other components (e.g., CardEmpty) to toggle/open the nav in mobile
  useEffect(() => {
    const onToggle = () => setIsNavExpanded((v) => !v);
    const onOpen = () => setIsNavExpanded(true);
    const onClose = () => setIsNavExpanded(false);
    window.addEventListener("toggle-nav", onToggle as EventListener);
    window.addEventListener("open-nav", onOpen as EventListener);
    window.addEventListener("close-nav", onClose as EventListener);
    return () => {
      window.removeEventListener("toggle-nav", onToggle as EventListener);
      window.removeEventListener("open-nav", onOpen as EventListener);
      window.removeEventListener("close-nav", onClose as EventListener);
    };
  }, []);

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
      console.log(pathName);
  }

  return (
    <>
      {isNavExpanded && (
        <div
          className={SideBar.overlay}
          onClick={() => setIsNavExpanded(false)}
          aria-label="Close navigation overlay"
        />
      )}
      <nav
        className={`${SideBar.container} ${
          isNavExpanded ? SideBar.menuexpanded : SideBar.menuhidden
        }`}
      >
        <div>
          <ul>
            <li>
              <Link href="/">
                <a
                  className={`${home ? SideBar.active : ""}`}
                  onClick={() => setIsNavExpanded(false)}
                >
                  Home
                </a>
              </Link>
            </li>

            <li>
              <Link href="/characters">
                <a
                  className={`${characters ? SideBar.active : ""}`}
                  onClick={() => setIsNavExpanded(false)}
                >
                  Characters
                </a>
              </Link>
            </li>
            <li>
              <Link href="/locations">
                <a
                  className={`${locations ? SideBar.active : ""}`}
                  onClick={() => setIsNavExpanded(false)}
                >
                  Locations
                </a>
              </Link>
            </li>
            <li>
              <Link href="/episodes">
                <a
                  className={`${episodes ? SideBar.active : ""}`}
                  onClick={() => setIsNavExpanded(false)}
                >
                  Episodes
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
