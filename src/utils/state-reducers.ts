import { UserAction } from "./global-context";
import { GState } from "./global-context-types";

export const userReducer = (state: GState, action: UserAction) => {
  switch (action.type) {
    case 'CHANGE_USER': {
      console.log("here");
      return { ...state, user: action.payload };
    }
  }
}