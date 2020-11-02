import React from 'react';
import '../board/Board'
import {Board} from "../board";
import {MainComp} from "./styles";

export const MainComponent: React.FC = () => {
  return (
    <MainComp>
      <Board/>
    </MainComp>
  )
}