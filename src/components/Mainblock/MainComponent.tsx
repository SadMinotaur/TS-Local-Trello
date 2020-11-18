import React, { useState } from "react";
import "../Board/Board";
import { Board } from "../Board";
import { MainComp } from "./styles";
import { LoginPopup } from "../Loginpopup/LoginPopup";
import { useStateValue } from "../AppContext/GlobalContext";
import { CardPopup } from "../Cardpopup/CardPopup";

export const MainComponent: React.FC = () => {
  // const { state } = useStateValue();
  // const [popupState, setPopupState] = useState<boolean>(
  //   state.user === "" ? true : false
  // );

  return (
    <MainComp>
      <Board />
      {/* {popupState && <LoginPopup togglePopup={setPopupState} />} */}
      {/* {state.popup.state && <CardPopup />} */}
    </MainComp>
  );
};
