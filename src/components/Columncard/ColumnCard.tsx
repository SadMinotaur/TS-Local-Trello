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
interface Props {
  id: number;
}

export const ColumnCard: React.FC<Props> = ({ id }) => {

  const { state, reducer } = useStateValue()

  const stateCard = state.cards.find((card) => id === card.id)

  const [cardName, setCardName] = useState<string>(stateCard ? stateCard.name : "");

  const [changeNameState, setChangeNameState] = useState<boolean>(false);
  const [rightClickState, setRightClickState] = useState<boolean>(false);

  if (!stateCard) return null;

  const comments = state.comments.map(({ idCard }) => idCard === id);

  return <CardContainer>
    <ColCard onContextMenu={e => {
      e.preventDefault();
      setRightClickState(prevState => !prevState);
    }}>
      {!changeNameState && <CardContent
        onClick={() => { }}
        empty={comments.length === 0}>
        {cardName}
      </CardContent>}
      {changeNameState && <NameInput
        type="text"
        value={cardName}
        onChange={ev => {
          const v: string = ev.target.value;
          if (v.trim() === "") return;
          setCardName(v);
        }}
        onBlur={() => setChangeNameState(prevState => !prevState)} />}
      <EditCardButton
        onClick={() => setChangeNameState(prevState => !prevState)}
        empty={comments.length === 0}>
        <FontAwesomeIcon icon={faEdit} />
      </EditCardButton>
      {comments.length !== 0 && <CardComments>
        <FontAwesomeIcon icon={faComment} /> : {comments.length}
      </CardComments>}
      {rightClickState && <CardComments>
        <FontAwesomeIcon icon={faTimes} />
      </CardComments>}
    </ColCard>
  </CardContainer >
}