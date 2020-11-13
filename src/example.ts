export enum IBoardActionType {
  BOARD_EDIT_COLUMN_NAME = "BOARD/EDIT_COLUMN_NAME",
  BOARD_TOGGLE_EDIT_COLUMN_NAME = "BOARD/TOGGLE_EDIT_COLUMN_NAME",
}

// export interface IToggleEditColumnName {
//   type: IBoardActionType;
//   payload: IColumn;
// }

// export interface IEditColumnName {
//   type: IBoardActionType;
//   payload: IColumn;
// }

// type BoardActionTypes = IToggleEditColumnName | IEditColumnName;

// export const boardActionHandlersCollection = {
//   [EDIT_COLUMN_NAME]: editColumnNameHandler,
//   [TOGGLE_EDIT_COLUMN_NAME]: toggleEditColumnNameHandler,
// };

// export const boardReducer = (
//   initialState = boardInitialState,
//   handlersCollection = boardActionHandlersCollection
// ) => {
//   return function (state = initialState, action: BoardActionTypes) {
//     const handler = handlersCollection[action.type];
//     return handler ? handler(state, action) : state;
//   };
// }; 