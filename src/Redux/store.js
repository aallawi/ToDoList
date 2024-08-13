import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import taskSlice from "./taskSlice";

const persistConfig = {
  key: "root",
  storage, // استخدام localStorage
};

// Redux-persist
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSlice,
    task: taskSlice,
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
