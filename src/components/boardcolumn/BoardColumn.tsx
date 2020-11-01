import React, {useState} from "react";
import {ColumnsContainer, ColumnNameInput, ColumnBorder} from "./Styles";
import {Cards, ColumnsContent} from "../columnsContent";
import {ColumnCard} from "../columncard";

interface Props {
  name: string;
}

export const BoardColumn: React.FC<Props> = (props) => {

  //This is bad
  const column: ColumnsContent = JSON.parse(localStorage.getItem(props.name) as string);

  const cards = Array(column.cards.length);
  column.cards.forEach((value, i) => {
    cards[i] = <ColumnCard key={i} name={value.name}/>
  });

  let newCardContent = "";

  const [colCards, setCards] = useState(cards);
  const [name, setName] = useState(column.name);

  function saveName(name: string): void {
    column.name = name;
    setName(column.name);
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  function saveNewCard(): void {
    column.cards.push({name: newCardContent, author: localStorage.getItem("user"), comments: [], desc: ""} as Cards);
    setCards(prevState => {
      return prevState.concat(<ColumnCard name={newCardContent} key={colCards.length}/>);
    });
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  return (<ColumnsContainer>
      <ColumnBorder>
        <ColumnNameInput type="text" placeholder={name} onBlur={event => {
          event.target.value = '';
        }} onChange={event => {
          saveName(event.target.value);
        }}/>
        {colCards}
        <ColumnNameInput onBlur={event => {
          event.target.value = '';
        }} onChange={event => newCardContent = event.target.value} placeholder="Add new card"/>
        <button className="btn primary" onClick={event => {
          saveNewCard()
        }}>
          Add card
        </button>
      </ColumnBorder>
    </ColumnsContainer>
  )
}