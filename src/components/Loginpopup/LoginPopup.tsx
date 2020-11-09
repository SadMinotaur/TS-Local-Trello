import React, { useState } from "react";
import { Popup } from "../Popup";
import { PopupContent } from "./styles";

interface Props {
  togglePopup: (val: boolean) => void;
}

export const LoginPopup: React.FC<Props> = ({ togglePopup }) => {

  const [inputState, changeInputState] = useState("");

  function changeDisplayState(): void {
    if (inputState.trim() === "") return;
    togglePopup(false);
    localStorage.setItem("user", inputState);
  }

  return <Popup height={"180px"} width={"350px"} popupContent={
    <PopupContent onKeyDown={event => {
      if (event.key === 'Enter') changeDisplayState()
    }}>
      <div>
        <h3>Hi!</h3>
        <p>Enter your name</p>
      </div>
      <div className="modal-body">
        <input
          type="text"
          placeholder="Name"
          value={inputState}
          onChange={event => changeInputState(event.target.value)} />
      </div>
      <div className="modal-footer">
        <button onClick={changeDisplayState} className="btn primary">
          Done
        </button>
      </div>
    </PopupContent>
  }>
  </Popup>
}