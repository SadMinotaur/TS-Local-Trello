import React, {useEffect} from 'react';
import '../board/Board'
import {Board} from "../board";
import {MainComp} from "./Styles";

export const MainComponent: React.FC = () => {

  const localStBoardContent = localStorage.getItem("boardContent");
  const boardContent: object = localStBoardContent !== null ? JSON.parse(localStBoardContent) : {};

  useEffect(() => {
    localStorage.setItem("boardContent", JSON.stringify(boardContent))
    console.log("here1")
  })

  return (
    <MainComp>
      <Board boardContent={boardContent}/>
    </MainComp>
  )
}