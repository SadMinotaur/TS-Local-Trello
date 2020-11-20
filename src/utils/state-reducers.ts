import { Card, Column, Comm, User } from "./global--types";
import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
  name: "userId",
  initialState: -1,
  reducers: {
    changeUserId: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const popupSlice = createSlice({
  name: "popup",
  initialState: -1,
  reducers: {
    changePopup: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const cardsArraySlice = createSlice({
  name: "cardsArray",
  initialState: [] as Card[],
  reducers: {
    // Solves problem with same indexes after card deletion.
    cardsArrayAdd: (state: Card[], action: PayloadAction<Card>) => [
      ...state.map((v: Card, i: number) => {
        return {
          id: i,
          name: v.name,
          desc: v.desc,
          authorId: v.authorId,
          columnId: v.columnId,
        };
      }),
      action.payload,
    ],
    cardsArrayChange: (state: Card[], action: PayloadAction<Card>) =>
      state.map((v: Card) => (v.id !== action.payload.id ? v : action.payload)),
    cardsArrayRemove: (state: Card[], action: PayloadAction<number>) =>
      state.filter((v: Card) => v.id !== action.payload),
  },
});

export const commentsSlice = createSlice({
  name: "commentsArray",
  initialState: [] as Comm[],
  reducers: {
    commArrayAdd: (state: Comm[], action: PayloadAction<Comm>) => [
      ...state,
      action.payload,
    ],
    commArrayChange: (state: Comm[], action: PayloadAction<Comm>) =>
      state.map((v: Comm) => (v.id !== action.payload.id ? v : action.payload)),
    commArrayRemove: (state: Comm[], action: PayloadAction<number>) =>
      state.filter((v: Comm) => v.id !== action.payload),
  },
});

export const userArraySlice = createSlice({
  name: "userArray",
  initialState: [] as User[],
  reducers: {
    userArrayAdd: (state: User[], action: PayloadAction<User>) => [
      ...state,
      action.payload,
    ],
    userArrayChange: (state: User[], action: PayloadAction<User>) =>
      state.map((v: User) => (v.id !== action.payload.id ? v : action.payload)),
    userArrayRemove: (state: User[], action: PayloadAction<number>) =>
      state.filter((v: User) => v.id !== action.payload),
  },
});

export const columnSlice = createSlice({
  name: "column",
  initialState: [
    { id: 0, name: "TODO" },
    { id: 1, name: "In Progress" },
    { id: 2, name: "Testing" },
    { id: 3, name: "Done" },
  ],
  reducers: {
    changeColumn: (state, action: PayloadAction<Column>) =>
      state.map((v) => (v.id !== action.payload.id ? v : action.payload)),
  },
});

export const rootReducer = combineReducers({
  popup: popupSlice.reducer,
  user: userIdSlice.reducer,
  columnsArray: columnSlice.reducer,
  usersArray: userArraySlice.reducer,
  commentsArray: commentsSlice.reducer,
  cardsArray: cardsArraySlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
