import React, { useCallback, useEffect, useRef, useState } from "react";
import { ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv } from "./styles";
import { Card, ColumnsContent } from "../../utils/columns-content";
import { ColumnCard } from "../Columncard";
import { useStateValue } from "../AppContext/GlobalContext";

interface Props {
  id: number;
  initName: string;
}

export const BoardColumn: React.FC<Props> = ({ id, initName }) => {

  // const column: ColumnsContent = JSON.parse(localStorage.getItem(initName) as string);

  const context = useStateValue()

  const [name, setName] = useState<string>(initName);
  const [colCards, setCardsArray] = useState<Card[]>([]);
  const [cardInput, setCardInput] = useState<string>("");

  const [nameInputState, setNameInputState] = useState<boolean>(false);
  const [newCardState, setNewCardState] = useState<boolean>(false);

  // const isFirstRun = useRef<boolean>(true);

  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //   } else {
  //     localStorage.setItem(initName, JSON.stringify({ name: name, cards: colCards }));
  //   }
  // }, [colCards, initName, name]);

  const saveNewCard = useCallback(() => {
    if (cardInput.trim() === "") return;
    setCardInput("");
    setCardsArray(colCards.concat({
      id: colCards.length,
      name: cardInput,
      author: localStorage.getItem("user") as string,
      comments: [],
      desc: ""
    }));
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
      onBlur={() => {
        context.reducer({ type: "CHANGE_COL_NAME", payload: { id: id, name: name } })
        setNameInputState(prevState => !prevState)
      }}
    />}
    {colCards.map((card) => <ColumnCard
      column={name}
      card={card}
      key={card.id}
      deleteCard={deleteCard}
      saveCardState={saveCardChanges}
    />)}
    {!newCardState && <ColumnAddCardDiv
      onClick={() => setNewCardState(prevState => !prevState)}>
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