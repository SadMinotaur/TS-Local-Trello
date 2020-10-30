import React, {useState} from "react";
import {Background} from "./Styles";

interface Props {
  initState?: boolean;
}

export const LoginPopup: React.FC<Props> = (props) => {

  const [display, changeDisplayProperty] = useState(props.initState ? props.initState : localStorage.getItem("user") === null);
  let inputValue: string;

  return (
    <Background style={{display: (display ? 'block' : 'none')}}>
      {/*Ugly position*/}
      <div className="modal" style={{top: 500}}>
        <div className="modal-header">
          <h3>Hi!</h3>
          <p>Enter your name</p>
          <div className="modal-body">
            <input type="text" placeholder="Name" onChange={event => {
              inputValue = event.target.value
            }}/>
          </div>
          <div className="modal-footer">
            <button onClick={() => {
              localStorage.setItem("user", inputValue);
              changeDisplayProperty(prevState => !prevState);
            }} className="btn primary">
              Done
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
}