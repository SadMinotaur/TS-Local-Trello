import { GState } from "./global-context-types";

export const reducer = (state: GState, action: { type: any; }) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return {};
  }
}