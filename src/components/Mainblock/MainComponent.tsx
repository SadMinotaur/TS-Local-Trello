import React from "react";
import "../Board/Board";
import { Board } from "../Board";
import { MainComp } from "./styles";
import { useSelector } from "react-redux";
import { LoginPopup } from "../Loginpopup/LoginPopup";
import { CardPopup } from "../Cardpopup/CardPopup";
import { MainComponentSelector } from "../../utils/state-selectors";

export const MainComponent: React.FC = () => {
  const { popup, user } = useSelector(MainComponentSelector);

  return (
    <MainComp>
      <Board />
      {user === -1 && <LoginPopup />}
      {popup !== -1 && <CardPopup />}
    </MainComp>
  );
};
