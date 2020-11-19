import React from "react";
import "../Board/Board";
import { Board } from "../Board";
import { MainComp } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { LoginPopup } from "../Loginpopup/LoginPopup";
import { CardPopup } from "../Cardpopup/CardPopup";
import { RootState } from "../../utils/state-reducers";

export const MainComponent: React.FC = () => {
  const popupState = useSelector((store: RootState) => store.mainReducer.popup);

  return (
    <MainComp>
      <Board />
      {/* {popupState && <LoginPopup togglePopup={setPopupState} />} */}
      {popupState.state && <CardPopup />}
    </MainComp>
  );
};
