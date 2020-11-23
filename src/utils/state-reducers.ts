import { Card, Column, Comm, User } from "./global-types";
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
    cardsArrayAdd: {
      reducer: (state: Card[], action: PayloadAction<Card>) => [
        ...state,
        action.payload,
      ],
      prepare: (card: Card) => {
        const { name, authorId, columnId } = card;
        const newId: number =
          Array.from(name).reduce(stringHash, 0) * getRandInt(1000) +
          columnId * 3 +
          authorId * 3;
        return {
          payload: { ...card, id: newId },
        };
      },
    },
    cardsArrayChange: (state: Card[], action: PayloadAction<Card>) =>
      state.map((v: Card) =>
        v.key !== action.payload.key ? v : action.payload
      ),
    cardsArrayRemove: (state: Card[], action: PayloadAction<number>) =>
      state.filter((v: Card) => v.key !== action.payload),
  },
});

export const commentsSlice = createSlice({
  name: "commentsArray",
  initialState: [] as Comm[],
  reducers: {
    commArrayAdd: {
      reducer: (state: Comm[], action: PayloadAction<Comm>) => [
        ...state,
        action.payload,
      ],
      prepare: (comment: Comm) => {
        const { content, authorId, cardId } = comment;
        const newId: number =
          Array.from(content).reduce(stringHash, 0) * getRandInt(1000) +
          cardId * 3 +
          authorId * 3;
        return { payload: { ...comment, id: newId } };
      },
    },
    commArrayChange: (state: Comm[], action: PayloadAction<Comm>) =>
      state.map((v: Comm) =>
        v.key !== action.payload.key ? v : action.payload
      ),
    commArrayRemove: (state: Comm[], action: PayloadAction<number>) =>
      state.filter((v: Comm) => v.key !== action.payload),
    commArrayCardIdRemove: (state: Comm[], action: PayloadAction<number>) =>
      state.filter((v: Comm) => v.cardId !== action.payload),
  },
});

export const userArraySlice = createSlice({
  name: "userArray",
  initialState: [] as User[],
  reducers: {
    userArrayAdd: (state: User[], action: PayloadAction<User>) => [
      ...state.map((v: User, i: number) => {
        return {
          key: i,
          name: v.name,
        };
      }),
      action.payload,
    ],
    userArrayChange: (state: User[], action: PayloadAction<User>) =>
      state.map((v: User) =>
        v.key !== action.payload.key ? v : action.payload
      ),
    userArrayRemove: (state: User[], action: PayloadAction<number>) =>
      state.filter((v: User) => v.key !== action.payload),
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

const getRandInt = (max: number) => Math.floor(Math.random() * Math.floor(max));
const stringHash = (s: number, c: string) => s + c.charCodeAt(0);
