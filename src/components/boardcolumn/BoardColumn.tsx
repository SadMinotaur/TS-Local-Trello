import React from "react";
import {ColumnsContainer, ColumnNameInput, ColumnBorder} from "./Styles";
import {ColumnCard} from "../columncard";

interface Props {
  name: string;
  cardsContent?: string[];
}

export const BoardColumn: React.FC<Props> = (props) => {

  let renderCards;
  if (props.cardsContent !== undefined && props.cardsContent.length !== 0) {
    renderCards = Array(props.cardsContent.length);
    props.cardsContent.forEach((value, i) => {
      renderCards[i] = <ColumnCard name={value} key={i}/>
    })
  }

  return (<ColumnsContainer>
      <ColumnBorder>
        <ColumnNameInput type="text" placeholder={props.name}/>
        {renderCards}
        <button className="btn primary">
          Add card
        </button>
      </ColumnBorder>
    </ColumnsContainer>
  )
}