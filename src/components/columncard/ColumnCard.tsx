import React, {useEffect, useState} from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  CardPopup,
  CardPopupBack,
  ClosePopup,
  ColCard, NameInput, EditCardButton,
  PopupTitle,
} from "./styles";
import {Card} from "../columnsContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons/faComment";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";

interface Props {
  card: Card;
  index: number;
  saveCardState: any;
}

export const ColumnCard: React.FC<Props> = (props) => {

  const [cardInfo, setCardInfo] = useState(props.card);
  const [popupState, setPopupState] = useState(false);
  const [changeNameState, setChangeNameState] = useState(false);

  //TODO: Use another hook
  useEffect(() => {
    props.saveCardState(cardInfo);
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
          //TODO: Figure out which is better

          // setCardInfo({
          //   ...cardInfo,
          //   name: event.target.value
          // })

          setCardInfo(prevState => {
            return {...prevState, name: event.target.value};
          });
        }}
                   onBlur={event => {
                     setChangeNameState(prevState => !prevState);
                   }}
                   placeholder={"Enter new name"}
                   style={{display: changeNameState ? "block" : "none"}}/>
        <CardComments style={{display: cardInfo.comments.length > 0 ? "block" : "none"}}>
          <FontAwesomeIcon icon={faComment}/> : {cardInfo.comments.length}
        </CardComments>
      </ColCard>
      <CardPopupBack style={{display: popupState ? "block" : "none"}}>
        <CardPopup style={{display: popupState ? "block" : "none"}}>
          <ClosePopup onClick={event => setPopupState(
            prevState => !prevState
          )}>
            x
          </ClosePopup>
          <PopupTitle>
            {cardInfo.name}
          </PopupTitle>
        </CardPopup>
      </CardPopupBack>
    </CardContainer>
  )
};