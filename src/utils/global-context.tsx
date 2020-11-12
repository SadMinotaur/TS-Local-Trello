import React, { DispatchWithoutAction, useContext, useReducer } from "react";
import { GState } from "./global-context-types";

export const AppContext = React.createContext<Partial<{
  initialState: GState;
  reducer: DispatchWithoutAction;
}>>(null!)

export const useStateValue = () => useContext(AppContext);

export const State: React.FC<{
  initialState: GState;
  reducer: () => GState;
}> = ({ initialState, reducer, children }) => {
  const [state, red] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{
    initialState: state,
    reducer: red
  }} >
    {children}
  </AppContext.Provider>
}