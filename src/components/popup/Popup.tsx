import React from "react";
import {CardPopupBack} from "./styles";
import {CardPopup, ClosePopup} from "./styles";

interface Props {
  width: number;
  height: number;
  popupState: boolean;
  setPopupState?: (prevState: any) => void;
  popupContent: object;
}

export const Popup: React.FC<Props> = (props) => {
  return (
    <CardPopupBack display={props.popupState}>
      <CardPopup height={props.height} width={props.width} display={props.popupState}>
        {props.setPopupState !== undefined ?
          <ClosePopup width={props.width} display={props.popupState}
                      onClick={() => props.setPopupState?.((prevState: any) => !prevState)}>x</ClosePopup> : null}
        {props.popupContent}
      </CardPopup>
    </CardPopupBack>
  )
}