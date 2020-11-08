import React from "react";
import { CardPopupBack } from "./styles";
import { CardPopup, ClosePopup } from "./styles";

interface Props {
  width: number;
  height: number;
  setPopupState?: (state: boolean) => void;
  popupContent: object;
}

export const Popup: React.FC<Props> = (props) => {
  return (
    <CardPopupBack>
      <CardPopup
        height={props.height}
        width={props.width}>
        {props.setPopupState !== undefined ? <ClosePopup
          width={props.width}
          onClick={() => props.setPopupState?.(false)}>
          x
        </ClosePopup> : null}
        {props.popupContent}
      </CardPopup>
    </CardPopupBack>
  )
}