import React, {useState} from "react";
import {Background} from "./styles";

interface Props {
  initState?: boolean;
}

export const LoginPopup: React.FC<Props> = (props) => {

  const [display, changeDisplayProperty] = useState(props.initState ? props.initState : localStorage.getItem("user") === null);
  let inputValue: string;

  function changeDisplayState(): void {
    localStorage.setItem("user", inputValue);
    changeDisplayProperty(prevState => !prevState);
  }

  //Not sure about using useEffect
  function onEnterPress(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter') {
      changeDisplayState()
    }
  }

  return (
    <Background
      onKeyDown={onEnterPress}
      style={{display: (display ? 'block' : 'none')}}>
      {/*Ugly position*/}
      <div className="modal" style={{left: "48%", top: 400}}>
        <div className="modal-header">
          <h3>Hi!</h3>
          <p>Enter your name</p>
          <div className="modal-body">
            <input type="text" placeholder="Name" onChange={event => {
              inputValue = event.target.value
            }}/>
          </div>
          <div className="modal-footer">
            <button onClick={changeDisplayState} className="btn primary">
              Done
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
}