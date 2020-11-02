import styled from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    height: 100%;
`

export const ColCard = styled.div`
    border-radius: 5px;
    background: white;
    text-align: start;
    width: 100%;
    height: 25px;
    margin: 5px 0 5px 0;
    text-indent: 10px;
    line-height: 25px;
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