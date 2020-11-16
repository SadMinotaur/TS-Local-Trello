import React, { useState } from "react";
import { useStateValue } from "../AppContext/GlobalContext";
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
    context.reducer({ type: "CHANGE_USER", payload: { name: inputState } })
  }

  return <Popup height={"180px"} width={"350px"}>
    <PopupContent onKeyDown={e => {
      if (e.key === 'Enter') changeDisplayState()
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
          onChange={e => changeInputState(e.target.value)} />
      </div>
      <div className="modal-footer">
        <button onClick={changeDisplayState} className="btn primary">
          Done
        </button>
      </div>
    </PopupContent>
  </Popup>
}