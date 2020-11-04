import React, {useEffect, useState} from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard, NameInput, EditCardButton,
  PopupTitle, PopupContent,
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

  //TODO: Use another hook
  useEffect(() => {
    props.saveCardState(cardInfo, props.index);
  });

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
        <NameInput value={cardInfo.name} onChange={event => {
          setCardInfo(prevState => (
            {...prevState, name: event.target.value}
          ));
        }}
                   onBlur={() => {
                     setChangeNameState(prevState => !prevState);
                   }}
                   placeholder={"Enter new name"}
                   style={{display: changeNameState ? "block" : "none"}}/>
        <CardComments style={{display: cardInfo.comments.length > 0 ? "block" : "none"}}>
          <FontAwesomeIcon icon={faComment}/> : {cardInfo.comments.length}
        </CardComments>
      </ColCard>
      <Popup height={300} width={850} popupState={popupState} setPopupState={setPopupState} popupContent={
        <PopupContent>
          <PopupTitle>
            {cardInfo.name}
          </PopupTitle>
        </PopupContent>
      }/>
    </CardContainer>
  )
}