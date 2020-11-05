import React, {useEffect, useState} from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard, NameInput, EditCardButton,
  PopupTitle, PopupContent, PopupDesc, Comments, CommentsInput, UserComment,
} from "./styles";
import {Card} from "../columnsContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons/faComment";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {Popup} from "../popup";

interface Props {
  card: Card;
  index: number;
  saveCardState: (card: Card, index: number) => void;
}

export const ColumnCard: React.FC<Props> = (props) => {

  const [cardInfo, setCardInfo] = useState(props.card);
  const [popupState, setPopupState] = useState(false);
  const [changeNameState, setChangeNameState] = useState(false);
  const [changeNamePopup, setChangeNamePopup] = useState(false);
  const [newCommentValue, setCommentValue] = useState("");

  const cardComments: object[] = Array(cardInfo.comments.length);

  cardInfo.comments.forEach((value, i) => {
    //TODO: Make prettier
    cardComments[i] = <UserComment>{value.author} : {value.content}</UserComment>;
  });

  //TODO: Use another hook
  useEffect(() => {
    props.saveCardState(cardInfo, props.index);
  });

  function changeCardName(event: React.ChangeEvent<HTMLInputElement>) {
    setCardInfo(prevState => (
      {...prevState, name: event.target.value}
    ));
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
      {/* TODO: Move to another component*/}
      <Popup height={300} width={350} popupState={popupState} setPopupState={setPopupState} popupContent={
        <PopupContent>
          <CardContent onClick={() => {
            setChangeNamePopup(prevState => !prevState);
          }} empty={cardInfo.comments.length <= 0} style={{color: changeNamePopup ? "white" : "grey"}}>
            {cardInfo.name}
          </CardContent>
          {changeNamePopup ? <NameInput value={cardInfo.name} onChange={changeCardName} onBlur={() => {
            setChangeNamePopup(prevState => !prevState);
          }} placeholder={"Enter new name"} style={{display: changeNamePopup ? "block" : "none"}}/> : null}
          <PopupTitle>
            Description
          </PopupTitle>
          <PopupDesc value={cardInfo.desc} onChange={event => {
            setCardInfo(pS => ({...pS, desc: event.target.value}));
          }}/>
          <PopupTitle>
            Comments
          </PopupTitle>
          <CommentsInput value={newCommentValue} onChange={event => setCommentValue(event.target.value)}/>
          <Comments>
            {cardComments}
          </Comments>
        </PopupContent>
      }/>
    </CardContainer>
  )
}