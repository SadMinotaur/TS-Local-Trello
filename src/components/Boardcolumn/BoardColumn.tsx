import React, { useCallback, useEffect, useRef, useState } from "react";
import { ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv } from "./styles";
import { Card, ColumnsContent } from "../../utils/columns-content";
import { ColumnCard } from "../Columncard";

interface Props {
  name: string;
}

export const BoardColumn: React.FC<Props> = (props) => {
  const columnName: string = props.name;

  const column: ColumnsContent = JSON.parse(localStorage.getItem(columnName) as string);

  const [name, setName] = useState<string>(column.name);
  const [colCards, setCardsArray] = useState<Card[]>(column.cards);
  const [cardInput, setCardInput] = useState<string>("");

  const [nameInputState, setNameInputState] = useState<boolean>(false);
  const [newCardState, setNewCardState] = useState<boolean>(false);

  const isFirstRun = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      localStorage.setItem(columnName, JSON.stringify({ name: name, cards: colCards }));
    }
  }, [colCards, columnName, name]);

  const saveNewCard = useCallback(() => {
    if (cardInput.trim() === "") return;
    const card: Card = {
      id: colCards.length,
      name: cardInput,
      author: localStorage.getItem("user") as string,
      comments: [],
      desc: ""
    };
    setCardInput("");
    setCardsArray(colCards.concat(card));
    setNewCardState(prevState => !prevState);
  },
    [cardInput, colCards]
  );

  const saveCardChanges = useCallback((card: Card, index: number) =>
    setCardsArray(colCards.map((cardArray): Card => cardArray.id !== index ? cardArray : card)),
    [colCards]
  );

  const deleteCard = useCallback((index: number) =>
    setCardsArray(colCards.filter(value => value.id !== index)),
    [colCards]
  );

  return <ColumnBorder>
    {!nameInputState && <ColumnNameDiv
      onClick={() => setNameInputState(prevState => !prevState)}>
      {name}
    </ColumnNameDiv>}
    {nameInputState && <ColumnNameInput
      value={name}
      type="text"
      onMouseOver={event => event.currentTarget.focus()}
      onChange={event => {
        const v: string = event.target.value;
        if (v.trim() === "") return;
        setName(v)
      }}
      onBlur={() => setNameInputState(prevState => !prevState)}
    />}
    {colCards.map((card) => <ColumnCard
      column={name}
      card={card}
      key={card.id}
      deleteCard={deleteCard}
      saveCardState={saveCardChanges}
    />)}
    {!newCardState && <ColumnAddCardDiv onClick={() => setNewCardState(prevState => !prevState)}>
      Add new card
    </ColumnAddCardDiv>}
    {newCardState && <ColumnNameInput
      onMouseOver={event => event.currentTarget.focus()}
      value={cardInput}
      onChange={event => setCardInput(event.target.value)}
      placeholder="Add new card"
    />}
    {newCardState && <ButtonDiv>
      <button className="btn primary" onClick={saveNewCard}>
        Add card
      </button>
      <button className="btn" onClick={() => setNewCardState(prevState => !prevState)}>
        Cancel
      </button>
    </ButtonDiv>}
  </ColumnBorder>
}