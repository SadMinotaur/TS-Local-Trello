import React from 'react';
import './../css /board.css';
import {Column} from "./BoardColumn";

export const Board : React.FC = () => ((
    <div className="columnsContainer">
        <Column name="TODO"/>
        <Column name="In Progress"/>
        <Column name="Testing"/>
        <Column name="Done"/>
    </div>
));