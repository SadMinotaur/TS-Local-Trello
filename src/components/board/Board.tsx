import React from 'react';
import {BoardColumn} from "../boardcolumn";
import {ColumnsContainer} from "./Styles";

export const Board: React.FC = () => {

  return (<ColumnsContainer>
    <BoardColumn name={"Column0"}/>
    <BoardColumn name={"Column1"}/>
    <BoardColumn name={"Column2"}/>
    <BoardColumn name={"Column3"}/>
  </ColumnsContainer>)
}