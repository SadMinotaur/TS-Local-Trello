import React from "react";
import {CardPopupBack} from "./styles";
import {CardPopup, ClosePopup} from "./styles";

interface Props {
  popupState: boolean;
  //Something wrong
  setPopupState: (prevState: any) => void;
  popupContent: object;
  buttonX: boolean;
}

export const Popup: React.FC<Props> = (props) => {
  return (
    <CardPopupBack style={{display: props.popupState ? "block" : "none"}}>
      <CardPopup style={{display: props.popupState ? "block" : "none"}}>
        {props.buttonX ?
          <ClosePopup onClick={event => props.setPopupState((prevState: any) => !prevState)}>x</ClosePopup> : null}
        {props.popupContent}
      </CardPopup>
    </CardPopupBack>
  )
}