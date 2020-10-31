import React, {useEffect, useState} from "react";
import {ColumnsContainer, ColumnNameInput, ColumnBorder} from "./Styles";
import {ColumnCard} from "../columncard";

interface Card {
  name: string;
  comments: object[]
}

interface Props {
  name: string;
  cardsContent: object[];
}

export const BoardColumn: React.FC<Props> = (props) => {

  const [name, setName] = useState(props.name);

  useEffect(() => {
    console.log("here1")
  })

  let renderCards = Array(props.cardsContent.length);
  props.cardsContent.forEach((value, i) => {
    renderCards[i] = <ColumnCard name={(value as Card).name} key={i}/>
  })

  return (<ColumnsContainer>
      <ColumnBorder>
        <ColumnNameInput type="text" placeholder={name} onBlur={event => {
          event.target.value = '';
        }} onChange={event => {
          setName(event.target.value);
        }}/>
        {renderCards}
        <button className="btn primary">
          Add card
        </button>
      </ColumnBorder>
    </ColumnsContainer>
  )
}