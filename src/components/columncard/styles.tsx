import styledComponentsTS from 'styled-components-ts'
import styled from "styled-components";
import React from "react";

export const CardContainer = styled.div`
    width: 100%;
    height: 100%;
`

export const ColCard = styled.div`
    border-radius: 5px;
    background: white;
    text-align: start;
    width: 100%;
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

export const CardComments = styled.div`
    margin: 0 0 0 2px;
    font-size: 7px;
`

interface CardContentProps {
  empty: boolean;
}

export const CardContent = styledComponentsTS<CardContentProps>(styled.div)`
    text-indent: 10px;
    padding: ${props => props.empty ? '7px 0 7px 0' : '7px 0 0 0'};
    font-size: 15px;
    line-height: 15px;
`

export const PopupTitle = styled.div`
    font-weight: bold;
    margin: 15px 0 0 0;
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 20px;
    color: #939393;
`

export const EditCardButton = styledComponentsTS<CardContentProps>(styled.div)`
    margin: ${props => props.empty ? '-28px  0 0 200px' : '-20px  0 0 200px'};
`

export const NameInput = styled.input`
    width: 190px;
    margin: -25px 0 5px 0;
    z-index: 200;    
`