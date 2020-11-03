import React, {useState} from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  CardPopup,
  CardPopupBack,
  ClosePopup,
  ColCard,
} from "./styles";
import {Card} from "../columnsContent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons/faComment";

interface Props {
  card: Card;
  index: number;
  saveCardState: any;
}

export const ColumnCard: React.FC<Props> = (props) => {

  const [popupState, setPopupState] = useState(false);
  const [showComments, setCommentCount] = useState(props.card.comments.length);

  return (
    <CardContainer>
      <ColCard onClick={event => {
        setPopupState(prevState => !prevState);
      }}>
        <CardContent empty={showComments <= 0}>
          {props.card.name}
        </CardContent>
        <CardComments style={{display: showComments > 0 ? "block" : "none"}}>
          <FontAwesomeIcon icon={faComment}/> : {showComments}
        </CardComments>
      </ColCard>
      <CardPopupBack style={{display: popupState ? "block" : "none"}}>
        <CardPopup style={{display: popupState ? "block" : "none"}}>
          <ClosePopup onClick={event => setPopupState(
            prevState => !prevState
          )}>
            x
          </ClosePopup>
        </CardPopup>
      </CardPopupBack>
    </CardContainer>
  )
};