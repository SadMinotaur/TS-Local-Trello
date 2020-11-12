import { AState } from "./global-context-types";

export const reducer = (state: AState, action: Action) => {
  switch (action.type) {
    case 'CHANGE_USER': {
      return {
        ...state,
        user: action.payload.name
      };
    }
    case 'CHANGE_COL_NAME': {
      const { id, name } = action.payload;
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === id ? { id: id, name: name } : column)
      };
    }
    default: {
      return state
    }
  }
}

export type UserActions =
  | { type: 'CHANGE_USER', payload: { name: string } };

export type ColumnAction =
  | { type: 'CHANGE_COL_NAME', payload: { id: number, name: string } };

export type CardAction =
  | { type: 'ADD_CARD', payload: { id: number, name: string, columnId: number } }
  | { type: 'CHANGE_CARD_NAME', payload: { id: number, name: string } }
  | { type: 'DEL_CARD', payload: { id: number } };

export type СommAction =
  | { type: 'ADD_COMM', payload: { id: number, author: string, content: string, cardId: number } }
  | { type: 'CHANGE_COMM_CONTENT', payload: { id: number, content: string } }
  | { type: 'DEL_COMM', payload: { id: number } };

export type Action = UserActions | ColumnAction | CardAction | СommAction;