// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer } from "reduxjs-toolkit-persist";
// import storage from "reduxjs-toolkit-persist/lib/storage";
// import hardSet from "reduxjs-toolkit-persist/lib/stateReconciler/hardSet";
// import thunk from "redux-thunk";

// import storage from "redux-persist/lib/storage";
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";

// import userSlice from "./userSlice";

// const persistConfig = {
//   key: "root",
//   storage: storage,
//   stateReconciler: hardSet,
// };

// const reducers = combineReducers({
//   // todo: todoSlice,
//   user: userSlice,
// });

// const _persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: _persistedReducer,
//   middleware: [thunk],
// });

// export default store;

// ========================================================

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
