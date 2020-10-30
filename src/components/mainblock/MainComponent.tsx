import React from 'react';
import '../board/Board'
import {Board} from "../board";
import {MainComp} from "./Styles";

export const MainComponent: React.FC = () => {

  const localStBoardContent = localStorage.getItem("boardContent");
  let boardContent: string[] = localStBoardContent !== null ? JSON.parse(localStBoardContent) : [];

  return (
    <MainComp>
      <Board boardContent={boardContent}/>
    </MainComp>
  )
}