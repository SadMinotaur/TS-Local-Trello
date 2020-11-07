import React, {useState} from "react";
import {ColumnsContainer, ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv} from "./styles";
import {Card, ColumnsContent} from "../columnsContent";
import {ColumnCard} from "../columncard";

interface Props {
  name: string;
}

export const BoardColumn: React.FC<Props> = (props) => {

  const column: ColumnsContent = JSON.parse(localStorage.getItem(props.name) as string);
  const cards = Array(column.cards.length);

  const [colCards, setCards] = useState(cards);
  const [name, setName] = useState(column.name);
  const [nameInputState, setNameInputState] = useState(false);
  const [newCardState, setNewCardState] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [cardInput, setCardInput] = useState("");

  column.cards.forEach((value, i) => {
    cards[i] = <ColumnCard deleteCard={deleteCard} key={i} index={i} saveCardState={saveCardChanges} card={value}/>
  });

  function saveName(name: string): void {
    column.name = name;
    setName(column.name);
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  function saveNewCard(): void {
    const card: Card = {
      id: column.cards.length,
      name: cardInput,
      author: localStorage.getItem("user"),
      comments: [],
      desc: ""
    } as Card;
    column.cards.push(card);
    setCards(prevState => {
      return prevState.concat(<ColumnCard deleteCard={deleteCard} index={colCards.length}
                                          saveCardState={saveCardChanges} card={card}
                                          key={colCards.length}/>);
    });
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  function saveCardChanges(card: Card, index: number): void {
    column.cards[index] = card;
    setCards(prevState => {
      prevState[index] =
        <ColumnCard deleteCard={deleteCard} index={index} saveCardState={saveCardChanges} card={card} key={index}/>
      return prevState;
    });
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  function deleteCard(i: number): void {
    setCards(prevState => {
      return prevState.filter(value => value.key !== i.toString());
    })
    column.cards = column.cards.filter(value => value.id !== i);
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  return (<ColumnsContainer>
      <ColumnBorder>
        {nameInputState ? null : <ColumnNameDiv
          onClick={() => {
            setNameInputState(prevState => !prevState);
          }}>{name}</ColumnNameDiv>}
        {nameInputState ? <ColumnNameInput value={nameInput} type="text" onMouseOver={event => {
          event.currentTarget.focus();
        }} onChange={event => {
          setNameInput(event.target.value);
          saveName(event.target.value);
        }} onBlur={() => {
          setNameInputState(prevState => !prevState);
          setNameInput("");
        }}/> : null}
        {colCards}
        {newCardState ? null : <ColumnAddCardDiv
          onClick={() => {
            setNewCardState(prevState => !prevState);
          }}>
          Add new card </ColumnAddCardDiv>}
        {newCardState ? <ColumnNameInput onMouseOver={event => {
          event.currentTarget.focus();
        }} value={cardInput} onChange={event => {
          setCardInput(event.target.value);
        }} placeholder="Add new card"/> : null}
        {newCardState ? <ButtonDiv>
          <button className="btn primary" onClick={() => {
            if (cardInput === "") return;
            saveNewCard();
            setCardInput("");
            setNewCardState(prevState => !prevState);
          }}>
            Add card
          </button>
          <button className="btn" onClick={() => {
            setNewCardState(prevState => !prevState);
          }}>
            Cancel
          </button>
        </ButtonDiv> : null}
      </ColumnBorder>
    </ColumnsContainer>
  )
}