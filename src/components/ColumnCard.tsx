import React from "react";


interface Props {
  name: string;
  //Cant pass function
  onClick?: any;
}

export const ColumnCard: React.FC<Props> = (props) => ((
  <div className="boardCard" onClick={props.onClick}>
    {props.name}
  </div>
));