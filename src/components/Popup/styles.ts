import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

export const CardPopupBack = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
`;

interface PopupProps {
  width: string;
  height: string;
}

export const CardPopup = styledComponentsTS<PopupProps>(styled.div)`
  position: absolute;
  margin: 0 auto 100px auto; 
  left: 0; 
  right: 0;
  top: 35px;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: white;
  border-radius: 3px;
  @media (max-width: ${(props) => props.width}) {
    width : 90%
  }
`;

interface ButtonProps {
  width: number;
}

export const ClosePopup = styledComponentsTS<ButtonProps>(styled.button)`
  position: absolute;
  margin: -10px 0 0 ${(props) => props.width}px;
  border-radius: 50%;
  background: #ffffff;
  border: #767676 1px solid;
  height: 20px;
  width: 20px;
  color: #999999;
  @media (max-width: ${(props) => props.width + 20}px) {
    position: fixed;
    top: 20px;
    right 5px;
  }
`;
