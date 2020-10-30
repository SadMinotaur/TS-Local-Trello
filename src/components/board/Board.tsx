import React from 'react';
import {BoardColumn} from "../boardcolumn";
import {ColumnsContainer} from "./Styles";

interface Props {
  boardContent?: object;
}

export const Board: React.FC<Props> = () => ((
  <ColumnsContainer>
    <BoardColumn name="TODO" cardsContent={["test", "test"]}/>
    <BoardColumn name="In Progress" cardsContent={["test", "test"]}/>
    <BoardColumn name="Testing" cardsContent={["test", "test"]}/>
    <BoardColumn name="Done" cardsContent={["test", "test"]}/>
  </ColumnsContainer>
));