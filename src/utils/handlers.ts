import { AState } from "./global-context-types";
import { CardAction, ColumnAction, UserActions, СommAction } from "./state-reducers";

export const changeUser = function (state: AState, action: UserActions): AState {
  return {
    ...state,
    user: action.payload.name
  };
}

export const changeColName = function (state: AState, action: ColumnAction): AState {
  const { id, name } = action.payload;
  return {
    ...state,
    columns: state.columns.map((column) =>
      column.id === id ? { id: id, name: name } : column)
  };
}

export const addCard = function (state: AState, action: CardAction): AState {
  const { id, name, desc, columnId, author } = action.payload;
  return {
    ...state,
    cards: [...state.cards, { id: id, name: name, desc: desc, author: author, idColumn: columnId }]
  };
}

export const changeCard = function (state: AState, action: CardAction): AState {
  const { id, name, desc } = action.payload;
  return {
    ...state,
    cards: state.cards.map((card) =>
      card.id === id ? {
        id: card.id, name: name, desc: desc,
        author: card.author, idColumn: card.idColumn
      } : card)
  };
}

export const delCard = function (state: AState, action: CardAction): AState {
  const { id } = action.payload;
  return {
    ...state,
    cards: state.cards.filter(card => card.id !== id)
  };
}

export const addComm = function (state: AState, action: СommAction): AState {
  const { id, author, content, cardId } = action.payload;
  return {
    ...state,
    comments: [...state.comments, { id, author, content, idCard: cardId }]
  };
}

export const changeCommContent = function (state: AState, action: СommAction): AState {
  const { id, content } = action.payload;
  return {
    ...state,
    comments: state.comments.map((comm) =>
      comm.id === id ? {
        id, content: content, author: comm.author,
        idCard: comm.idCard
      } : comm)
  };
}

export const delComm = function (state: AState, action: СommAction): AState {
  const { id } = action.payload;
  return {
    ...state,
    comments: state.comments.filter((comm) => comm.id !== id)
  };
}