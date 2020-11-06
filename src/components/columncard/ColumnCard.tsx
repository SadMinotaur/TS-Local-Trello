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

interface Props {
  card: Card;
  index: number;
  saveCardState: (card: Card, index: number) => void;
}

export const ColumnCard: React.FC<Props> = (props) => {

  const [cardInfo, setCardInfo] = useState(props.card);
  const [popupState, setPopupState] = useState(false);
  const [changeNameState, setChangeNameState] = useState(false);

  //TODO: Use another hook
  useEffect(() => {
    console.log("here");
    props.saveCardState(cardInfo, props.index);
  });

  function changeCardName(event: React.ChangeEvent<HTMLInputElement>) {
    setCardInfo(pS => ({...pS, name: event.target.value}));
  }

  function changeCardDecs(event: React.ChangeEvent<HTMLInputElement>) {
    setCardInfo(pS => ({...pS, desc: event.target.value}));
  }

  function addCardComment(comment: Comments) {
    setCardInfo(pS => ({...pS, comments: pS.comments.concat(comment)}));
  }

  return (
    <CardContainer>
      <ColCard>
        <CardContent style={{color: changeNameState ? "white" : "grey"}} onClick={() => {
          setPopupState(prevState => !prevState);
        }} empty={cardInfo.comments.length <= 0}>
          {cardInfo.name}
        </CardContent>
        <EditCardButton onClick={() => {
          setChangeNameState(prevState => !prevState);
        }} empty={cardInfo.comments.length <= 0}>
          <FontAwesomeIcon icon={faEdit}/>
        </EditCardButton>
        {changeNameState ? <NameInput value={cardInfo.name} onChange={changeCardName} onBlur={() => {
          setChangeNameState(prevState => !prevState);
        }} placeholder={"Enter new name"} style={{display: changeNameState ? "block" : "none"}}/> : null}
        <CardComments style={{display: cardInfo.comments.length > 0 ? "block" : "none"}}>
          <FontAwesomeIcon icon={faComment}/> : {cardInfo.comments.length}
        </CardComments>
      </ColCard>
      <CardPopup popupState={popupState} setPopupState={setPopupState} cardInfo={cardInfo}
                 changeCardName={changeCardName} changeCardDecs={changeCardDecs} addCardComment={addCardComment}/>
    </CardContainer>
  )
}