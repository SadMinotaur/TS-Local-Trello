import React, { useState } from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard,
  NameInput,
  EditCardButton,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Card, Comm } from "../../utils/global-types";
import { useDispatch, useSelector } from "react-redux";
import {
  cardsArraySlice,
  commentsSlice,
  popupSlice,
  RootState,
} from "../../utils/state-reducers";
import { StoreDispatchType } from "../../utils/store";
interface Props {
  id: number;
}

export const ColumnCard: React.FC<Props> = ({ id }) => {
  const card: Card = useSelector(
    (store: RootState) =>
      store.cardsArray.find((v: Card) => v.id === id) as Card
  );
  const comments: Comm[] = useSelector((store: RootState) =>
    store.commentsArray.filter((v: Comm) => v.cardId === card.id)
  );

  const [changeNameState, setChangeNameState] = useState<boolean>(false);
  const [rightClickState, setRightClickState] = useState<boolean>(false);

  const dispatch: StoreDispatchType = useDispatch();

  if (!card) return null;

  function onRightClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    e.preventDefault();
    setRightClickState((pS) => !pS);
  }

  function onEditBlur(e: React.ChangeEvent<HTMLInputElement>): void {
    setChangeNameState((pS) => !pS);
  }

  function onDeleteClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    dispatch(cardsArraySlice.actions.cardsArrayRemove(card.id));
    dispatch(commentsSlice.actions.commArrayCardIdRemove(id));
  }

  function nameInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, desc, authorId, columnId } = card;
    const v: string = e.target.value;
    if (v.trim() === "") return;
    dispatch(
      cardsArraySlice.actions.cardsArrayChange({
        id: id,
        name: v,
        desc: desc,
        authorId: authorId,
        columnId: columnId,
      })
    );
  }

  function togglePopup(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    dispatch(popupSlice.actions.changePopup(card.id));
  }

  return (
    <CardContainer>
      <ColCard onContextMenu={onRightClick}>
        {!changeNameState && (
          <CardContent onClick={togglePopup} empty={comments.length === 0}>
            {card.name}
          </CardContent>
        )}
        {changeNameState && (
          <NameInput
            type="text"
            value={card.name}
            onChange={nameInput}
            onBlur={onEditBlur}
          />
        )}
        <EditCardButton
          onClick={() => setChangeNameState((prevState) => !prevState)}
          empty={comments.length === 0}
        >
          <FontAwesomeIcon icon={faEdit} />
        </EditCardButton>
        {comments.length !== 0 && (
          <CardComments>
            <FontAwesomeIcon icon={faComment} /> : {comments.length}
          </CardComments>
        )}
        {rightClickState && (
          <CardComments onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTimes} />
          </CardComments>
        )}
      </ColCard>
    </CardContainer>
  );
};
