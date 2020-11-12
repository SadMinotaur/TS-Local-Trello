import React, { Dispatch, useContext, useEffect, useReducer, useState } from "react";
import { LoginPopup } from "../components/Loginpopup";
import { GState } from "./global-context-types";

const AppContext = React.createContext<{
  state: GState;
  userReducer: Dispatch<UserAction>;
}>(null!)

export type UserAction =
  | { type: 'CHANGE_USER', payload: string };

const AppState: React.FC<{
  initialState: GState;
  userReducer: (state: GState, action: UserAction) => GState;
}> = ({ initialState, userReducer, children }) => {

  const [state, userRed] = useReducer(userReducer, initialState);
  const [popupState, setPopupState] = useState<boolean>(state.user === "" ? true : false);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  })

  return <AppContext.Provider value={{
    state: state,
    userReducer: userRed
  }} >
    {popupState && <LoginPopup togglePopup={setPopupState} />}
    {children}
  </AppContext.Provider>
}

const useStateValue = () => useContext(AppContext);

export { useStateValue, AppState }