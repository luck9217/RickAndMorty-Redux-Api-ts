import { CharacterModel, CharacterArrayModel } from "../models/redux.models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCharacterState: CharacterArrayModel = {
  all_characters: [],
};

const characterSlice = createSlice({
  name: "character",
  initialState: initialCharacterState,
  reducers: {
    addCharacter(state, action: PayloadAction<CharacterModel[]>) {
      state.all_characters = action.payload;
    },
    deleteCharacter(state, action) {
        let newsa =state[0]
        console.log("WWWWWWWWWWW",newsa)
      const foundFav = state.all_characters.find(
        (fav) => fav.id === action.payload.id
      );
      if (foundFav) {
       
        const hola=state.all_characters.filter((data:CharacterModel)=>data.id!==action.payload.id)
        console.log("aadA",hola)
        //state.all_characters.splice(state.all_characters.indexOf(foundFav), 1);
      }
    },
  },
});
export default characterSlice;
