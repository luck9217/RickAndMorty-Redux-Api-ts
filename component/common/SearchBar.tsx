import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchSpecial from "../../styles/SearchBar.module.css";
import { GET_SEARCHCHARACTERS } from "../apollo/queries/characters";

export const SearchBarComponent = ({ setDataSearch, setPage }) => {
  const router = useRouter();
  const pathName = router.pathname.slice(1, -1);
  const [tempSearch, setTempSearch] = useState("");

  const handleChange = (event: any) => {
    if (event.target.value.length >= 3) {
      setDataSearch(event.target.value);
      setPage(1);
    }
    setTempSearch(event.target.value);
    if (event.target.value.length === 0) {
      setTempSearch("");
    }
  };

  return (
    <div className={SearchSpecial.wrap}>
      <div className={SearchSpecial.search}>
        <input
          className={SearchSpecial.searchTerm}
          type="text"
          placeholder={`Search ${pathName}`}
          onChange={(event) => handleChange(event)}
        />
        <button
          type="submit"
          className={SearchSpecial.searchButton}
          onClick={() => setDataSearch(tempSearch)}
        >
          🔎︎
        </button>
      </div>
    </div>
  );
};
