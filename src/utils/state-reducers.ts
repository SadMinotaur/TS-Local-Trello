import { AState } from "./global-context-types";
import {
  changeUser,
  changeColName,
  addCard,
  changeCard,
  delCard,
  addComm,
  changeComm,
  delComm,
  popupChange,
} from "./context-handlers";

export const mainReducer = (state: AState, action: Action) => {
  switch (action.type) {
    case "CHANGE_USER":
      return changeUser(state, action);
    case "CHANGE_COL":
      return changeColName(state, action);
    case "ADD_CARD":
      return addCard(state, action);
    case "CHANGE_CARD":
      return changeCard(state, action);
    case "DEL_CARD":
      return delCard(state, action);
    case "ADD_COMM":
      return addComm(state, action);
    case "CHANGE_COMM":
      return changeComm(state, action);
    case "DEL_COMM":
      return delComm(state, action);
    case "CHANGE_POPUP":
      return popupChange(state, action);
  }
};

export type Action =
  | UserActions
  | ColumnAction
  | CardAction
  | PopupAction
  | СommAction;

export type UserActions = { type: "CHANGE_USER"; payload: IUserPayload };

export type ColumnAction = { type: "CHANGE_COL"; payload: IColumnPayload };

export type CardAction =
  | { type: "ADD_CARD"; payload: ICardPayload }
  | { type: "CHANGE_CARD"; payload: ICardPayload }
  | { type: "DEL_CARD"; payload: ICardPayload };

export type СommAction =
  | { type: "ADD_COMM"; payload: ICommPayload }
  | { type: "CHANGE_COMM"; payload: ICommPayload }
  | { type: "DEL_COMM"; payload: ICommPayload };

export type PopupAction = { type: "CHANGE_POPUP"; payload: IPopupPayload };

interface IUserPayload {
  name: string;
}

interface IColumnPayload {
  id: number;
  name: string;
}

interface ICardPayload {
  id: number;
  name: string;
  desc: string;
  author: string;
  columnId: number;
}

interface ICommPayload {
  id: number;
  content: string;
  author: string;
  cardId: number;
}

interface IPopupPayload {
  state: boolean;
  idCard: number;
}
