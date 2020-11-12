import React, { Dispatch, useContext, useEffect, useReducer, useState } from "react";
import { LoginPopup } from "../Loginpopup";
import { AState } from "../../utils/global-context-types";
import { Action } from "../../utils/state-reducers";

const AppContext = React.createContext<{
  state: AState;
  reducer: Dispatch<Action>;
}>(null!)

export const AppState: React.FC<{
  initialState: AState;
  reducer: (state: AState, action: Action) => AState;
}> = ({ initialState, reducer, children }) => {

  const [state, red] = useReducer(reducer, initialState);
  const [popupState, setPopupState] = useState<boolean>(state.user === "" ? true : false);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  })

  return <AppContext.Provider value={{
    state: state,
    reducer: red
  }} >
    {popupState && <LoginPopup togglePopup={setPopupState} />}
    {children}
  </AppContext.Provider>
}

export const useStateValue = () => useContext(AppContext);
