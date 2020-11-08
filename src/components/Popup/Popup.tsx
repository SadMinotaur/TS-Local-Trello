import React from "react";
import { CardPopupBack } from "./styles";
import { CardPopup, ClosePopup } from "./styles";

interface Props {
  width: string;
  height: string;
  setPopupState?: (state: boolean) => void;
  popupContent: object;
}

export const Popup: React.FC<Props> = (props) => {

  const buttonPos: number = Number(props.width.slice(0, props.width.length - 2)) - 10;

  return (
    <CardPopupBack>
      <CardPopup
        height={props.height}
        width={props.width}>
        {props.setPopupState !== undefined ? <ClosePopup
          width={buttonPos}
          onClick={() => props.setPopupState?.(false)}>
          x
        </ClosePopup> : null}
        {props.popupContent}
      </CardPopup>
    </CardPopupBack>
  )
}