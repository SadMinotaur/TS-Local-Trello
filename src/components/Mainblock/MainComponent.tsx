import React from "react";
import "../Board/Board";
import { Board } from "../Board";
import { MainComp } from "./styles";
import { LoginPopup } from "../Loginpopup/LoginPopup";
import { CardPopup } from "../Cardpopup/CardPopup";
import { persistor, store } from "../../utils/store";

export const MainComponent: React.FC = () => {
  // console.log(store);
  console.log(persistor);

  return (
    <MainComp>
      <Board />
      {/* {popupState && <LoginPopup togglePopup={setPopupState} />} */}
      {/* {state.popup.state && <CardPopup />} */}
    </MainComp>
  );
};
