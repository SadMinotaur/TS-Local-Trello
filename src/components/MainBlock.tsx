import React from 'react';
import './../css /board.css';
import './Board'
import {Board} from "./Board";

export const MainComponent : React.FC = () => ((
    <div className="mainBlock">
        <Board/>
    </div>
));