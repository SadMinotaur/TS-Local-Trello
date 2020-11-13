import React, { useCallback, useState } from "react";
import { ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv } from "./styles";
import { ColumnCard } from "../Columncard";
import { useStateValue } from "../AppContext/GlobalContext";

interface Props {
  id: number;
  initName: string;
}

export const BoardColumn: React.FC<Props> = ({ id, initName }) => {

  const { state, reducer } = useStateValue()

  const [name, setName] = useState<string>(initName);
  const [cardInput, setCardInput] = useState<string>("");

  const [nameInputState, setNameInputState] = useState<boolean>(false);
  const [newCardState, setNewCardState] = useState<boolean>(false);

  const saveNewCard = useCallback(() => {
    if (cardInput.trim() === "") return;
    setCardInput("");
    reducer({
      type: "ADD_CARD",
      payload: {
        id: state.cards.length,
        name: cardInput,
        author: state.user,
        desc: "",
        columnId: id
      }
    });
    setNewCardState(prevState => !prevState);
  },
    [cardInput, id, reducer, state.cards.length, state.user]
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
        reducer({ type: "CHANGE_COL_NAME", payload: { id: id, name: name } });
        setNameInputState(prevState => !prevState)
      }}
    />}
    {
      state.cards.map((card) => card.idColumn === id && <ColumnCard
        key={card.id}
        id={card.id}
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