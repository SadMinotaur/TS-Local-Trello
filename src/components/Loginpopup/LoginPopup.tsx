import React, { useState } from "react";
import { useStateValue } from "../../utils/global-context";
import { Popup } from "../Popup";
import { PopupContent } from "./styles";

interface Props {
  togglePopup: (val: boolean) => void;
}

export const LoginPopup: React.FC<Props> = ({ togglePopup }) => {

  const [inputState, changeInputState] = useState("");
  const context = useStateValue()

  function changeDisplayState(): void {
    if (inputState.trim() === "") return;
    togglePopup(false);
    context.userReducer({ type: "CHANGE_USER", payload: inputState })
  }

  return <Popup height={"180px"} width={"350px"}>
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
  </Popup>
}