import React, { useState } from "react";
import { ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv } from "./styles";
import { Card, ColumnsContent } from "../../utils/ColumnsContent";
import { ColumnCard } from "../Columncard";

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

  function store(name: string, colCards: Card[]): void {
    localStorage.setItem(columnName, JSON.stringify({ name: name, cards: colCards }));
  }

  function saveName(event: React.ChangeEvent<HTMLInputElement>): void {
    const v = event.target.value;
    setName(v);
    store(v, colCards);
  }

  function saveNewCard(): void {
    if (cardInput.trim() === "") return;
    const card: Card = {
      id: colCards.length,
      name: cardInput,
      author: localStorage.getItem("user") as string,
      comments: [],
      desc: ""
    };
    setCardInput("");
    const cards: Card[] = colCards.concat(card);
    setCards(cards);
    setNewCardState(prevState => !prevState);
    store(name, cards);
  }

  function saveCardChanges(card: Card, index: number): void {
    setCards(ps => {
      ps[ps.findIndex(v => v.id === index)] = card;
      store(name, ps);
      return ps;
    });
  }

  function deleteCard(i: number): void {
    const cards: Card[] = colCards.filter(value => value.id !== i);
    setCards(cards);
    store(name, cards);
  }

  return <ColumnBorder>
    {nameInputState ? null : <ColumnNameDiv
      onClick={() => setNameInputState(prevState => !prevState)}>
      {name}
    </ColumnNameDiv>}
    {nameInputState ? <ColumnNameInput
      value={name}
      type="text"
      onMouseOver={event => {
        event.currentTarget.focus();
      }}
      onChange={saveName}
      onBlur={() => {
        setNameInputState(prevState => !prevState);
      }}
    /> : null}
    {colCards.map((card) => <ColumnCard
      card={card}
      key={card.id}
      deleteCard={deleteCard}
      saveCardState={saveCardChanges}
    />)}
    {newCardState ? null : <ColumnAddCardDiv onClick={() => setNewCardState(prevState => !prevState)}>
      Add new card
    </ColumnAddCardDiv>}
    {newCardState ? <ColumnNameInput
      onMouseOver={(event) => event.currentTarget.focus()}
      value={cardInput}
      onChange={event => {
        setCardInput(event.target.value);
      }} placeholder="Add new card" /> : null}
    {newCardState ? <ButtonDiv>
      <button className="btn primary" onClick={saveNewCard}>
        Add card
      </button>
      <button className="btn" onClick={() => {
        setNewCardState(prevState => !prevState);
      }}>
        Cancel
      </button>
    </ButtonDiv> : null}
  </ColumnBorder>
}