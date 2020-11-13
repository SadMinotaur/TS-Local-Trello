import React, { useState } from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard,
  NameInput,
  EditCardButton
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../AppContext/GlobalContext";
import { Card } from "../../utils/global-context-types";
interface Props {
  id: number;
}

export const ColumnCard: React.FC<Props> = ({ id }) => {

  const { state, reducer } = useStateValue();

  console.log(state);

  const stateCard = state.cards.find((card) => id === card.id);
  const [cardName, setCardName] = useState<string>(stateCard ? stateCard.name : "");

  const [changeNameState, setChangeNameState] = useState<boolean>(false);
  const [rightClickState, setRightClickState] = useState<boolean>(false);

  if (!stateCard) return null;

  const card = stateCard as Card;
  const comments = state.comments.map(({ idCard }) => idCard === id);

  function onRightClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    setRightClickState(prevState => !prevState);
  }

  function onEditBlur(event: React.ChangeEvent<HTMLInputElement>) {
    setChangeNameState(prevState => !prevState);
    reducer({
      type: "CHANGE_CARD", payload: {
        id: id,
        name: cardName,
        desc: card.desc,
        author: card.author,
        columnId: card.idColumn
      }
    })
  }

  function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    reducer({
      type: "DEL_CARD", payload: {
        id: id,
        name: card.name,
        desc: card.desc,
        author: card.author,
        columnId: card.idColumn
      }
    });
  }

  function nameInput(event: React.ChangeEvent<HTMLInputElement>) {
    const v: string = event.target.value;
    if (v.trim() === "") return;
    setCardName(v);
  }

  function togglePopup(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    reducer({ type: "CHANGE_POPUP", payload: { idCard: id, state: true } })
  }

  return <CardContainer>
    <ColCard onContextMenu={onRightClick}>
      {!changeNameState && <CardContent
        onClick={togglePopup}
        empty={comments.length === 0}>
        {cardName}
      </CardContent>}
      {changeNameState && <NameInput
        type="text"
        value={cardName}
        onChange={nameInput}
        onBlur={onEditBlur} />}
      <EditCardButton
        onClick={() => setChangeNameState(prevState => !prevState)}
        empty={comments.length === 0}>
        <FontAwesomeIcon icon={faEdit} />
      </EditCardButton>
      {comments.length !== 0 && <CardComments>
        <FontAwesomeIcon icon={faComment} /> : {comments.length}
      </CardComments>}
      {rightClickState && <CardComments
        onClick={onClick}>
        <FontAwesomeIcon icon={faTimes} />
      </CardComments>}
    </ColCard>
  </CardContainer >
}