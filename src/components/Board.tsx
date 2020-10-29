import React from 'react';
import './../css /board.css';
import {Column} from "./BoardColumn";

export const Board : React.FC = () => ((
    <div className="columnsContainer">
        <Column name="TODO" cardsContent={["test", "test"]}/>
        <Column name="In Progress" cardsContent={["test", "test"]}/>
        <Column name="Testing" cardsContent={["test", "test"]}/>
        <Column name="Done" cardsContent={["test", "test"]}/>
    </div>
));