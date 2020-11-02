import React, {useState} from "react";
import {CardContainer, CardPopup, CardPopupBack, ClosePopup, ColCard} from "./styles";
import {Card} from "../columnsContent";

interface Props {
  card: Card;
  index: number;
  saveCardState: any;
}

export const ColumnCard: React.FC<Props> = (props) => {

  const [popupState, setPopupState] = useState(false)

  return (
    <CardContainer>
      <ColCard onClick={event => {
        setPopupState(prevState => !prevState);
      }}>
        {props.card.name}
      </ColCard>
      <CardPopupBack style={{display: popupState ? "block" : "none"}}>
        <CardPopup style={{display: popupState ? "block" : "none"}}>
          <ClosePopup>
            x
          </ClosePopup>
        </CardPopup>
      </CardPopupBack>
    </CardContainer>
  )
};