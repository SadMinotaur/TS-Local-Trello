import React from "react";
import { CardPopupBack } from "./styles";
import { CardPopup, ClosePopup } from "./styles";

interface Props {
  width: string;
  height: string;
  setPopupState?: (state: boolean) => void;
}

export const Popup: React.FC<Props> = ({
  width,
  height,
  setPopupState,
  children,
}) => {
  const buttonPos: number = Number(width.slice(0, width.length - 2)) - 10;

  return (
    <CardPopupBack>
      <CardPopup height={height} width={width}>
        {setPopupState !== undefined && (
          <ClosePopup width={buttonPos} onClick={() => setPopupState?.(false)}>
            x
          </ClosePopup>
        )}
        {children}
      </CardPopup>
    </CardPopupBack>
  );
};
