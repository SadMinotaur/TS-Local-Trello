import React, { useEffect, useState } from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard,
  NameInput,
  EditCardButton
} from "./styles";
import { Card, Comments } from "../columnsContent";
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

  function changeCardName(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardName(event.target.value);
  }

  function changeCardComment(i: number, event: React.ChangeEvent<HTMLInputElement>): void {
    setComments(ps => {
      ps.forEach((value, index) => {
        if (value.id === i) {
          ps[index].content = event.target.value;
          return { ...ps }
        }
      });
      return { ...ps }
    });
  }

  function changeCardDecs(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardDesc(event.target.value);
  }

  function addCardComment(comment: Comments): void {
    setComments(ps => ps.concat(comment));
  }

  function deleteCardComment(id: number): void {
    setComments(ps => ps.filter(v => v.id !== id));
    console.log(cardComments);
  }

  return (
    <CardContainer>
      <ColCard onContextMenu={() => {
        setHover(prevState => !prevState)
      }}>
        <CardContent style={{ color: changeNameState ? "white" : "grey", display: changeNameState ? "none" : "block" }}
          onClick={() => {
            setPopupState(prevState => !prevState);
          }} empty={cardComments.length === 0}>
          {cardName}
        </CardContent>
        {changeNameState ? <NameInput value={cardName} onChange={changeCardName} onBlur={() => {
          setChangeNameState(prevState => !prevState);
        }} placeholder={"Enter new name"} /> : null}
        <EditCardButton onClick={() => {
          setChangeNameState(prevState => !prevState);
        }} empty={cardComments.length === 0}>
          <FontAwesomeIcon icon={faEdit} />
        </EditCardButton>
        {cardComments.length !== 0 ?
          <CardComments>
            <FontAwesomeIcon icon={faComment} /> : {cardComments.length}
          </CardComments> : null}
        {hover ? <CardComments onClick={() => deleteCard(id)}>
          <FontAwesomeIcon icon={faTimes} />
        </CardComments> : null}
      </ColCard>
      <CardPopup popupState={popupState} setPopupState={setPopupState} cardInfo={
        { id: id, name: cardName, author: author, desc: cardDesc, comments: cardComments }
      }
        changeCardName={changeCardName} changeCardComment={changeCardComment} changeCardDecs={changeCardDecs}
        deleteCardComment={deleteCardComment}
        addCardComment={addCardComment} />
    </CardContainer>
  )
}