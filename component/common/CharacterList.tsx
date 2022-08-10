import React from "react";
import Link from "next/link";
import characterSlice from "../store/character-slice";
import { useAppDispatch, useAppSelector } from "../hook/redux-hooks";
import { CharacterModel } from "../models/redux.models";
import { useSelector, useDispatch } from "react-redux";

const CharactersList = () => {
  const characterActions = characterSlice.actions;
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );

  const dispatch = useAppDispatch();
  return (
    <div>
      characters
      <Link href="/">
        <a>Go to Home</a>
      </Link>
    </div>
  );
};

export default CharactersList;
