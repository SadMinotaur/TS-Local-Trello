import React, { useEffect, useState } from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard,
  NameInput,
  EditCardButton
} from "./styles";
import { Card, Comments } from "../../utils/ColumnsContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { CardPopup } from "../Cardpopup";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  card: Card;
  saveCardState: (card: Card, index: number) => void;
  deleteCard: (i: number) => void;
}

export const ColumnCard: React.FC<Props> = ({ card, saveCardState, deleteCard }) => {
  const { id, name, author, desc, comments } = card;

  const [cardName, setCardName] = useState<string>(name);
  const [cardDesc, setCardDesc] = useState<string>(desc);
  const [cardComments, setComments] = useState<Comments[]>(comments);
  const [popupState, setPopupState] = useState<boolean>(false);
  const [changeNameState, setChangeNameState] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    saveCardState({ id: id, name: cardName, author: author, desc: cardDesc, comments: cardComments }, id);
  });

  return <CardContainer>
    <ColCard onContextMenu={() => setHover(prevState => !prevState)}>
      {changeNameState ? null : <CardContent
        onClick={() => { setPopupState(prevState => !prevState); }}
        empty={cardComments.length === 0}>
        {cardName}
      </CardContent>}
      {changeNameState ? <NameInput
        value={cardName}
        onChange={ev => {
          const v: string = ev.target.value;
          if (v.trim() === "") return;
          setCardName(v);
        }}
        onBlur={() => setChangeNameState(prevState => !prevState)} /> : null}
      <EditCardButton
        onClick={() => setChangeNameState(prevState => !prevState)}
        empty={cardComments.length === 0}>
        <FontAwesomeIcon icon={faEdit} />
      </EditCardButton>
      {cardComments.length !== 0 ? <CardComments>
        <FontAwesomeIcon icon={faComment} /> : {cardComments.length}
      </CardComments> : null}
      {hover ? <CardComments onClick={() => deleteCard(id)}>
        <FontAwesomeIcon icon={faTimes} />
      </CardComments> : null}
    </ColCard>
    {popupState ? <CardPopup
      setPopupState={setPopupState}
      cardInfo={{ id: id, name: cardName, author: author, desc: cardDesc, comments: cardComments }}
      changeCardName={setCardName}
      changeCardDecs={setCardDesc}
      setCardsComments={setComments} /> : null}
  </CardContainer>
}