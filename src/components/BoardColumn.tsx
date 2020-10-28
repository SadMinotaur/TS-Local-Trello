import React from "react";

interface Props {
    name: string;
    // cards: object
}

export const Column : React.FC<Props> = (props) => ((
    <div className="columnsContainer">
        <div>{props.name}</div>

    </div>
))