import { AState } from "./global-context-types";
import { changeUser, changeColName, addCard, changeCard, delCard, addComm, changeCommContent, delComm, popupChange } from "./handlers";

export const mainReducer = (state: AState, action: Action) => {
  // TODO: Fix this.
  const handler: (state: AState, action: any) => AState = AllActionCollection[action.type];
  return handler ? handler(state, action) : state;
}

export const AllActionCollection = {
  'CHANGE_USER': changeUser,
  'CHANGE_COL_NAME': changeColName,
  'ADD_CARD': addCard,
  'CHANGE_CARD': changeCard,
  'DEL_CARD': delCard,
  'ADD_COMM': addComm,
  'CHANGE_COMM_CONTENT': changeCommContent,
  'DEL_COMM': delComm,
  'CHANGE_POPUP': popupChange
}

export type Action =
  | UserActions
  | ColumnAction
  | CardAction
  | PopupAction
  | СommAction;

export type UserActions =
  | { type: 'CHANGE_USER', payload: IUserPayload };

export type ColumnAction =
  | { type: 'CHANGE_COL_NAME', payload: IColumnPayload };

export type CardAction =
  | { type: 'ADD_CARD', payload: ICardPayload }
  | { type: 'CHANGE_CARD', payload: ICardPayload }
  | { type: 'DEL_CARD', payload: ICardPayload };

export type СommAction =
  | { type: 'ADD_COMM', payload: ICommPayload }
  | { type: 'CHANGE_COMM_CONTENT', payload: ICommPayload }
  | { type: 'DEL_COMM', payload: ICommPayload };

export type PopupAction =
  | { type: 'CHANGE_POPUP', payload: IPopupPayload };

interface IUserPayload {
  name: string;
}

interface IColumnPayload {
  id: number, name: string
}

interface ICardPayload {
  id: number, name: string, desc: string, author: string, columnId: number
}

interface ICommPayload {
  id: number, content: string, author: string, cardId: number
}

interface IPopupPayload {
  state: boolean,
  idCard: number
}