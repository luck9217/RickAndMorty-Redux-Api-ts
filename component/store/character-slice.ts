import { CharacterModel, CharacterArrayModel } from "../models/redux.models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useState } from "react";

const initialCharacterState: CharacterArrayModel = {
  all_characters: [],
};

const characterSlice = createSlice({
  name: "character",
  initialState: initialCharacterState,
  reducers: {
    addCharacter(state, action: PayloadAction<CharacterModel>) {
      state.all_characters.push(action.payload)
     
    },
    deleteCharacter(state, action: PayloadAction<CharacterModel>) {
      const foundFav = state.all_characters.find(
        (fav) => fav.id === action.payload.id
      );
      if (foundFav) {
        state.all_characters.splice(
          state.all_characters.indexOf(action.payload),
          1
        );
      }
    },
  },
});
export default characterSlice;
