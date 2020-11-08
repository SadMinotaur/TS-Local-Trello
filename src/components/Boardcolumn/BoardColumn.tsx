import React, { useState } from "react";
import { ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv } from "./styles";
import { Card, ColumnsContent } from "../../utils/ColumnsContent";
import { ColumnCard } from "../Columncard";
import { ColumnsContainer } from "../../common/types";

interface Props {
  name: string;
}

export const BoardColumn: React.FC<Props> = (props) => {
  const columnName: string = props.name;

  const column: ColumnsContent = JSON.parse(localStorage.getItem(columnName) as string);

  const [colCards, setCards] = useState<Card[]>(column.cards);
  const [name, setName] = useState<string>(column.name);
  const [nameInputState, setNameInputState] = useState<boolean>(false);
  const [newCardState, setNewCardState] = useState<boolean>(false);
  const [cardInput, setCardInput] = useState<string>("");

  function store(): void {
    localStorage.setItem(columnName, JSON.stringify({ name: name, cards: colCards }));
  }

  function saveName(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
    store();
  }

  function saveNewCard(): void {
    if (cardInput.trim() === "") return;
    const card: Card = {
      id: colCards.length,
      name: cardInput,
      author: localStorage.getItem("user"),
      comments: [],
      desc: ""
    } as Card;
    setCards(colCards.concat(card));
    store();
    setCardInput("");
    setNewCardState(prevState => !prevState);
  }

  function saveCardChanges(card: Card, index: number): void {
    setCards(ps => {
      ps[ps.findIndex(v => v.id === index)] = card;
      return ps;
    });
    store();
  }

  function deleteCard(i: number): void {
    setCards(column.cards.filter(value => value.id !== i));
    store();
  }

  return <ColumnsContainer>
    <ColumnBorder>
      {nameInputState ? null :
        <ColumnNameDiv onClick={() => { setNameInputState(prevState => !prevState); }}>
          {name}
        </ColumnNameDiv>}
      {nameInputState ?
        <ColumnNameInput
          value={name}
          type="text"
          onMouseOver={event => {
            event.currentTarget.focus();
          }}
          onChange={saveName}
          onBlur={() => {
            setNameInputState(prevState => !prevState);
          }} />
        : null}
      {colCards.map((card) =>
        <ColumnCard
          card={card}
          key={card.id}
          deleteCard={deleteCard}
          saveCardState={saveCardChanges} />)}
      {newCardState ? null :
        <ColumnAddCardDiv onClick={() => { setNewCardState(prevState => !prevState); }}>
          Add new card
        </ColumnAddCardDiv>}
      {newCardState ?
        <ColumnNameInput onMouseOver={event => {
          event.currentTarget.focus();
        }}
          value={cardInput}
          onChange={event => {
            setCardInput(event.target.value);
          }} placeholder="Add new card" />
        : null}
      {newCardState ?
        <ButtonDiv>
          <button className="btn primary" onClick={saveNewCard}>
            Add card
          </button>
          <button className="btn" onClick={() => {
            setNewCardState(prevState => !prevState);
          }}>
            Cancel
          </button>
        </ButtonDiv>
        : null}
    </ColumnBorder>
  </ColumnsContainer>
}