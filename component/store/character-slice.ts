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
      const checkRepeat = state.all_characters.find(
        (fav) => fav.id === action.payload.id
      );
      if (!checkRepeat) {
        state.all_characters.push(action.payload);
      }
    },

    deleteCharacter(state, action: PayloadAction<CharacterModel>) {
      let indexTemp = -1;

      state.all_characters.map((element, index) => {
        if (element.id === action.payload.id) indexTemp = index;
      });

      if (indexTemp != -1) {
        //clear data from state array
        state.all_characters.splice(indexTemp, 1);
      }
    },

    addArrayCharacter(state, action: PayloadAction<CharacterModel[]>) {
      action.payload.map((elementArray) => {
        state.all_characters.push(elementArray);
      });
    },

    cleanCharacter(state) {
      state.all_characters = [];
    },
  },
});
export default characterSlice;
