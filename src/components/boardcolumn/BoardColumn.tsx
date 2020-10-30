import React from "react";
import {ColumnCard} from "../columncard/ColumnCard";

interface Props {
  name: string;
  cardsContent?: string[];
}

export const Column: React.FC<Props> = (props) => {

  let renderCards;
  if (props.cardsContent !== undefined && props.cardsContent.length !== 0) {
    renderCards = Array(props.cardsContent.length);
    props.cardsContent.forEach((value, i) => {
      renderCards[i] = <ColumnCard name={value} key={i}/>
    })
  }

  return (<div className="columnBorder">
    <input className="columnNameInput" placeholder={props.name}/>
    <div className="cardsContainer">
      {renderCards}
      <button className="btn primary">
        Add card
      </button>
    </div>
  </div>);
}