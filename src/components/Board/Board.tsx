import React from 'react';
import { ColumnsContainer } from './styles';
import { BoardColumn } from "../Boardcolumn";

export const Board: React.FC = () => {
  return <ColumnsContainer>
    <BoardColumn name={"Column0"} />
    <BoardColumn name={"Column1"} />
    <BoardColumn name={"Column2"} />
    <BoardColumn name={"Column3"} />
  </ColumnsContainer>
}