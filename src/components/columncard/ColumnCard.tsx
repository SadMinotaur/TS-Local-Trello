import React from "react";
import {ColCard} from "./Styles";

interface Props {
  name: string;
  //Cant pass function
  onClick?: any;
}

export const ColumnCard: React.FC<Props> = (props) => ((
  <ColCard onClick={props.onClick}>
    {props.name}
  </ColCard>
));