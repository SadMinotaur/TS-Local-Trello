import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./state-reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistedReducer = persistReducer<RootState>(
  {
    key: "root",
    storage: storage,
  },
  // TODO: Figure out types
  rootReducer as any
);

export const store = createStore(persistedReducer, applyMiddleware());
export const persistor = persistStore(store);
