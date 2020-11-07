import React, {useEffect, useState} from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard,
  NameInput,
  EditCardButton
} from "./styles";
import {Card, Comments} from "../columnsContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons/faComment";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {CardPopup} from "../cardpopup";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface Props {
  card: Card;
  index: number;
  saveCardState: (card: Card, index: number) => void;
  deleteCard: (i: number) => void;
}

export const ColumnCard: React.FC<Props> = (props) => {

  const [cardInfo, setCardInfo] = useState(props.card);
  const [popupState, setPopupState] = useState(false);
  const [changeNameState, setChangeNameState] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    props.saveCardState(cardInfo, props.index);
  });

  function changeCardName(event: React.ChangeEvent<HTMLInputElement>) {
    setCardInfo(pS => ({...pS, name: event.target.value}));
  }

  function changeCardComment(i: number, event: React.ChangeEvent<HTMLInputElement>) {
    setCardInfo(pS => {
      pS.comments.forEach((value, index) => {
        if (value.id === i) {
          pS.comments[index].content = event.target.value;
          return {...pS}
        }
      })
      return {...pS}
    });
  }

  function changeCardDecs(event: React.ChangeEvent<HTMLInputElement>) {
    setCardInfo(pS => ({...pS, desc: event.target.value}));
  }

  function addCardComment(comment: Comments) {
    setCardInfo(pS => ({...pS, comments: pS.comments.concat(comment)}));
  }

  function deleteCardComment(id: number) {
    setCardInfo(pS => {
      pS.comments = pS.comments.filter(value => value.id !== id);
      return {...pS};
    });
  }

  return (
    <CardContainer>
      <ColCard onContextMenu={event => {
        setHover(prevState => !prevState)
      }}>
        <CardContent style={{color: changeNameState ? "white" : "grey"}} onClick={() => {
          setPopupState(prevState => !prevState);
        }} empty={cardInfo.comments.length === 0}>
          {cardInfo.name}
        </CardContent>
        <EditCardButton onClick={() => {
          setChangeNameState(prevState => !prevState);
        }} empty={cardInfo.comments.length === 0}>
          <FontAwesomeIcon icon={faEdit}/>
        </EditCardButton>
        {changeNameState ? <NameInput value={cardInfo.name} onChange={changeCardName} onBlur={() => {
          setChangeNameState(prevState => !prevState);
        }} placeholder={"Enter new name"} style={{display: changeNameState ? "block" : "none"}}/> : null}
        {cardInfo.comments.length !== 0 ?
          <CardComments>
            <FontAwesomeIcon icon={faComment}/> : {cardInfo.comments.length}
          </CardComments> : null}
        {hover ? <CardComments onClick={() => props.deleteCard(props.index)}>
          <FontAwesomeIcon icon={faTimes}/>
        </CardComments> : null}
      </ColCard>
      <CardPopup popupState={popupState} setPopupState={setPopupState} cardInfo={cardInfo}
                 changeCardName={changeCardName} changeCardComment={changeCardComment} changeCardDecs={changeCardDecs}
                 deleteCardComment={deleteCardComment}
                 addCardComment={addCardComment}/>
    </CardContainer>
  )
}