import React, { useState } from "react";
import { Popup } from "../Popup";
import { PopupContent } from "./styles";

interface Props {
  initState?: boolean;
}

export const LoginPopup: React.FC<Props> = (props) => {

  const [display, changeDisplayProperty] = useState(props.initState ? props.initState : localStorage.getItem("user") === null);
  const [inputState, changeInputState] = useState("");

  function changeDisplayState(): void {
    if (inputState === "") return;
    localStorage.setItem("user", inputState);
    changeDisplayProperty(prevState => !prevState);
  }

  return (
    <Popup height={300} width={350} popupState={display} popupContent={
      <PopupContent onKeyDown={event => {
        if (event.key === 'Enter') changeDisplayState()
      }}>
        <div>
          <h3>Hi!</h3>
          <p>Enter your name</p>
        </div>
        <div className="modal-body">
          <input type="text" placeholder="Name" value={inputState} onChange={event => {
            changeInputState(event.target.value);
          }} />
        </div>
        <div className="modal-footer">
          <button onClick={changeDisplayState} className="btn primary">
            Done
          </button>
        </div>
      </PopupContent>
    }>
    </Popup>
  );
}