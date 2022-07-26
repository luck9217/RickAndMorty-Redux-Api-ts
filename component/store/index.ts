import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "./character-slice";

const store = configureStore({
  reducer: { character: characterSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
