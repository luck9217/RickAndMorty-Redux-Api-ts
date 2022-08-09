import characterSlice from "../store/character-slice";
import { useAppDispatch, useAppSelector } from "../hook/redux-hooks";
import { CharacterModel } from "../models/redux.models";

export const ConfigRedux = () => {
  const characterActions = characterSlice.actions;
  const favoriteRedux = useAppSelector(
    (state) => state.character.all_characters
  );

  const dispatch = useAppDispatch();



  const handleClickClean = () => {
    localStorage.removeItem("fav");
    dispatch(characterActions.cleanCharacter());
  };

  //ADD character selecter
  const handleClickFav = (characterSelected: CharacterModel) => {
    //Redux data
    checkLocalStore(favoriteRedux);

    dispatch(characterActions.addCharacter(characterSelected));
  };

  //DELETE character selecter
  const handleClickDel = (characterSelected: CharacterModel) => {
    checkLocalStore(favoriteRedux);

    const foundFav = favoriteRedux.find(
      (fav) => fav.id === characterSelected.id
    );
    if (foundFav) {
      if (favoriteRedux.length === 1) {
        localStorage.removeItem("fav");
      }
      //Redux data
      dispatch(characterActions.deleteCharacter(characterSelected));
    }
  };

  const checkLocalStore = (favoriteRedux: CharacterModel[]) => {
    const checkLocalStorage = JSON.parse(localStorage.getItem("fav"));
    if (favoriteRedux.length === 0) {
      if (checkLocalStorage) {
        if (checkLocalStorage.length > 0) {
          pushToRedux(checkLocalStorage);
        }
      }
    }
  };

  const pushToRedux = (dataArray: CharacterModel[]) => {
    dataArray.map((data) => {
      dispatch(characterActions.addCharacter(data));
    });
  };

  return {
   
    handleClickClean,
    handleClickFav,
    handleClickDel,
    checkLocalStore
  };
};
