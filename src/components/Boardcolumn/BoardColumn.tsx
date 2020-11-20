import React, { useState } from "react";
import {
  ColumnNameInput,
  ColumnBorder,
  ColumnNameDiv,
  ColumnAddCardDiv,
  ButtonDiv,
} from "./styles";
import { ColumnCard } from "../Columncard";
import { Card, Column } from "../../utils/global-context-types";
import { columnSlice, RootState } from "../../utils/state-reducers";
import { storeDispatchType } from "../../utils/store";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  id: number;
}

export const BoardColumn: React.FC<Props> = ({ id }) => {
  const column: Column = useSelector(
    (store: RootState) =>
      store.columnsArray.find((v: Column) => v.id === id) as Column
  );
  const cards: Card[] = useSelector((store: RootState) =>
    store.cardsArray.filter((v: Card) => v.idColumn === id)
  );

  const [cardInput, setCardInput] = useState<string>("");

  const [nameInputState, setNameInputState] = useState<boolean>(false);
  const [newCardState, setNewCardState] = useState<boolean>(false);

  const dispatch: storeDispatchType = useDispatch();

  function saveNewCard() {
    if (cardInput.trim() === "") return;
    setCardInput("");
    // reducer({
    //   type: "ADD_CARD",
    //   payload: {
    //     id: state.cards.length,
    //     name: cardInput,
    //     author: state.user,
    //     desc: "",
    //     columnId: id,
    //   },
    // });
    setNewCardState((pS) => !pS);
  }

  function nameInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = e.target.value;
    if (v.trim() === "") return;
    dispatch(columnSlice.actions.changeColumn({ id: id, name: v }));
  }

  function onChangeInput() {
    setNameInputState((pS) => !pS);
  }

  return (
    <ColumnBorder>
      {!nameInputState && (
        <ColumnNameDiv onClick={onChangeInput}>{column.name}</ColumnNameDiv>
      )}
      {nameInputState && (
        <ColumnNameInput
          value={column.name}
          type="text"
          onMouseOver={(e) => e.currentTarget.focus()}
          onChange={nameInputChange}
          onBlur={onChangeInput}
        />
      )}
      {cards.map((card) => (
        <ColumnCard key={card.id} id={card.id} />
      ))}
      {!newCardState && (
        <ColumnAddCardDiv onClick={() => setNewCardState((pS) => !pS)}>
          Add new card
        </ColumnAddCardDiv>
      )}
      {newCardState && (
        <ColumnNameInput
          onMouseOver={(e) => e.currentTarget.focus()}
          value={cardInput}
          onChange={(e) => setCardInput(e.target.value)}
          placeholder="Add new card"
        />
      )}
      {newCardState && (
        <ButtonDiv>
          <button className="btn primary" onClick={saveNewCard}>
            Add card
          </button>
          <button className="btn" onClick={() => setNewCardState((pS) => !pS)}>
            Cancel
          </button>
        </ButtonDiv>
      )}
    </ColumnBorder>
  );
};
