import React, { Dispatch, useContext, useEffect, useReducer } from "react";
import { AState } from "../../utils/global-context-types";
import { Action } from "../../utils/state-reducers";

interface AppContextContent {
  state: AState;
  reducer: Dispatch<Action>;
}

const AppContext = React.createContext<AppContextContent>(null!);

interface Props {
  initialState: AState;
  reducer: (state: AState, action: Action) => AState;
}

export const AppState: React.FC<Props> = ({
  initialState,
  reducer,
  children,
}) => {
  const [state, red] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  });

  return (
    <AppContext.Provider
      value={{
        state: state,
        reducer: red,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useStateValue = () => useContext(AppContext);
