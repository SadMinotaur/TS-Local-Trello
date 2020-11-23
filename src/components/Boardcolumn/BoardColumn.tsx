import React, { useState } from "react";
import {
  ColumnNameInput,
  ColumnBorder,
  ColumnNameDiv,
  ColumnAddCardDiv,
  ButtonDiv,
} from "./styles";
import { ColumnCard } from "../Columncard";
import {
  cardsArraySlice,
  columnSlice,
  RootState,
} from "../../utils/state-reducers";
import { StoreDispatchType } from "../../utils/store";
import { useDispatch, useSelector } from "react-redux";
import { ColumnSelector } from "../../utils/state-selectors";

interface Props {
  objectKey: number;
}

export const BoardColumn: React.FC<Props> = ({ objectKey }) => {
  const { column, cards, userId } = useSelector((state: RootState) =>
    ColumnSelector(state, { key: objectKey })
  );

  const [cardInput, setCardInput] = useState<string>("");

  const [nameInputState, setNameInputState] = useState<boolean>(false);
  const [newCardState, setNewCardState] = useState<boolean>(false);

  const dispatch: StoreDispatchType = useDispatch();

  function saveNewCard(): void {
    if (cardInput.trim() === "") return;
    dispatch(
      cardsArraySlice.actions.cardsArrayAdd({
        key: -1,
        name: cardInput,
        authorId: userId,
        desc: "",
        columnId: objectKey,
      })
    );
    setCardInput("");
    setNewCardState((pS) => !pS);
  }

  function nameInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = e.target.value;
    if (v.trim() === "") return;
    dispatch(columnSlice.actions.changeColumn({ key: column.key, name: v }));
  }

  function onChangeInput(): void {
    setNameInputState((pS) => !pS);
  }

  function onButtonClick(): void {
    setNewCardState((pS) => !pS);
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
        <ColumnCard key={card.key} keyProp={card.key} />
      ))}
      {!newCardState && (
        <ColumnAddCardDiv onClick={onButtonClick}>
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
          <button className="btn" onClick={onButtonClick}>
            Cancel
          </button>
        </ButtonDiv>
      )}
    </ColumnBorder>
  );
};
