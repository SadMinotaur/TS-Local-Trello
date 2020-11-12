import React from 'react';
import '../Board/Board'
import { Board } from "../Board";
import { MainComp } from "./styles";

export const MainComponent: React.FC = () => {

  return (
    <MainComp>
      <Board />
    </MainComp>
  )
}