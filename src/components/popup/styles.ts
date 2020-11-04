import styled from "styled-components";

export const PopupTitle = styled.div`
    font-weight: bold;
    margin: 15px 0 0 0;
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 20px;
    color: #939393;
`

export const CardPopupBack = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
`
export const CardPopup = styled.div`
    position: fixed;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    top: 65px;
    height: 300px;
    width: 850px;
    background: white;
    border-radius: 3px;
`

export const ClosePopup = styled.button`
    position: fixed;
    margin: -10px 0 0 840px;
    border-radius: 50%;
    background: #ffffff;
    border: #767676 1px solid;
    height: 20px;
    width: 20px;
    color: #999999;
`
