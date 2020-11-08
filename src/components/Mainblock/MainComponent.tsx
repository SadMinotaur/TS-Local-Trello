import React from 'react';
import '../Board/Board'
import { Board } from "../Board";
import { MainComp } from "./styles";
import { LoginPopup } from '../Loginpopup';
import { useState } from 'react';

export const MainComponent: React.FC = () => {

  const [popupState, setPopupState] = useState<boolean>(localStorage.getItem("user") === null ? true : false);

  return (
    <MainComp>
      <Board />
      {popupState && <LoginPopup togglePopup={setPopupState} />}
    </MainComp>
  )
}