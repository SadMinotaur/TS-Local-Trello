import React from 'react';
import '../../css /board.css';
import '../board/Board'
import {Board} from "../board/Board";

export const MainComponent: React.FC = () => {

    const localStBoardContent = localStorage.getItem("boardContent");
    let boardContent: string[] = localStBoardContent !== null ? JSON.parse(localStBoardContent) : [];

    return (
        <div className="mainBlock">
            <Board boardContent={boardContent}/>
        </div>
    )
}