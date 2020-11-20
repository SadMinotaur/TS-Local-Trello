import React from "react";
import "../Board/Board";
import { Board } from "../Board";
import { MainComp } from "./styles";
import { useSelector } from "react-redux";
import { LoginPopup } from "../Loginpopup/LoginPopup";
import { CardPopup } from "../Cardpopup/CardPopup";
import { RootState } from "../../utils/state-reducers";

export const MainComponent: React.FC = () => {
  const popupState: number = useSelector((store: RootState) => store.popup);
  const userId: number = useSelector((store: RootState) => store.user);

  return (
    <MainComp>
      <Board />
      {userId === -1 && <LoginPopup />}
      {popupState !== -1 && <CardPopup />}
    </MainComp>
  );
};
