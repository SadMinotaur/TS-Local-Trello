import { createStructuredSelector } from "reselect";
import { Card, Column, Comm, User } from "./global-types";
import { RootState } from "./state-reducers";

interface ColumnProps {
  key: number;
}

interface ColumnRet {
  column: Column;
  cards: Card[];
  userId: number;
}

export const ColumnSelector = createStructuredSelector<
  RootState,
  ColumnProps,
  ColumnRet
>({
  column: (state: RootState, props: ColumnProps) =>
    state.columnsArray.find((v: Column) => v.key === props.key) as Column,
  cards: (state: RootState, props: ColumnProps) =>
    state.cardsArray.filter((v: Card) => v.columnId === props.key),
  userId: (state: RootState) => state.user,
});

interface CardProps {
  key: number;
}

interface CardRet {
  card: Card;
  comments: Comm[];
}

export const CardSelector = createStructuredSelector<
  RootState,
  CardProps,
  CardRet
>({
  card: (state: RootState, props: CardProps) =>
    state.cardsArray.find((v: Card) => v.key === props.key) as Card,
  comments: (state: RootState, props: CardProps) =>
    state.commentsArray.filter((v: Comm) => v.cardId === props.key),
});

interface CommentProps {
  key: number;
}

interface CommentRet {
  comment: Comm;
  author: User;
  currUser: number;
}

const selectComment = (state: RootState, props: CommentProps) =>
  state.commentsArray.find((v: Comm) => v.key === props.key) as Comm;

export const CommentSelector = createStructuredSelector<
  RootState,
  CommentProps,
  CommentRet
>({
  comment: selectComment,
  author: (state: RootState, props: CommentProps) => {
    const userKey: number = selectComment(state, props).authorId;
    return state.usersArray.find((v: User) => userKey === v.key) as User;
  },
  currUser: (state: RootState) => state.user,
});

interface CardPopupRet {
  card: Card;
  column: Column;
  cardAuthor: User;
  comments: Comm[];
  currUser: number;
}

const selectorGetCard = (state: RootState) =>
  state.cardsArray.find((v) => v.key === state.popup) as Card;

export const CardPopupSelector = createStructuredSelector<
  RootState,
  CardPopupRet
>({
  card: selectorGetCard,
  column: (state: RootState) => {
    const card: Card = selectorGetCard(state);
    return state.columnsArray.find(
      (v: Column) => v.key === card.columnId
    ) as Column;
  },
  cardAuthor: (state: RootState) => {
    const card: Card = selectorGetCard(state);
    return state.usersArray.find((v: User) => v.key === card.authorId) as User;
  },
  comments: (state: RootState) =>
    state.commentsArray.filter((v: Comm) => v.cardId === state.popup),
  currUser: (state: RootState) => state.user,
});
