import React, { useState } from "react";
import {
  CardComments,
  CardContainer,
  CardContent,
  ColCard,
  NameInput,
  EditCardButton,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Card, Comm } from "../../utils/global-context-types";
interface Props {
  id: number;
}

export const ColumnCard: React.FC<Props> = ({ id }) => {
  // const { state, reducer } = useStateValue();

  // const [changeNameState, setChangeNameState] = useState<boolean>(false);
  // const [rightClickState, setRightClickState] = useState<boolean>(false);

  // const stateCard = state.cards.find((card) => id === card.id);
  // if (!stateCard) return null;
  // const card: Card = stateCard as Card;
  // const comments: Comm[] = state.comments.filter(
  //   (comment) => id === comment.idCard
  // );

  // function onRightClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  //   e.preventDefault();
  //   setRightClickState((prevState) => !prevState);
  // }

  // function onEditBlur(e: React.ChangeEvent<HTMLInputElement>): void {
  //   setChangeNameState((prevState) => !prevState);
  // }

  // function onDeleteClick(
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ): void {
  //   reducer({
  //     type: "DEL_CARD",
  //     payload: {
  //       id: id,
  //       name: card.name,
  //       desc: card.desc,
  //       author: card.author,
  //       columnId: card.idColumn,
  //     },
  //   });
  // }

  // function nameInput(e: React.ChangeEvent<HTMLInputElement>): void {
  //   const v: string = e.target.value;
  //   if (v.trim() === "") return;
  //   reducer({
  //     type: "CHANGE_CARD",
  //     payload: {
  //       id: id,
  //       name: v,
  //       desc: card.desc,
  //       author: card.author,
  //       columnId: card.idColumn,
  //     },
  //   });
  // }

  // function togglePopup(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  //   reducer({ type: "CHANGE_POPUP", payload: { idCard: id, state: true } });
  // }

  return null;
  // <CardContainer>
  //   <ColCard onContextMenu={onRightClick}>
  //     {!changeNameState && (
  //       <CardContent onClick={togglePopup} empty={comments.length === 0}>
  //         {card.name}
  //       </CardContent>
  //     )}
  //     {changeNameState && (
  //       <NameInput
  //         type="text"
  //         value={card.name}
  //         onChange={nameInput}
  //         onBlur={onEditBlur}
  //       />
  //     )}
  //     <EditCardButton
  //       onClick={() => setChangeNameState((prevState) => !prevState)}
  //       empty={comments.length === 0}
  //     >
  //       <FontAwesomeIcon icon={faEdit} />
  //     </EditCardButton>
  //     {comments.length !== 0 && (
  //       <CardComments>
  //         <FontAwesomeIcon icon={faComment} /> : {comments.length}
  //       </CardComments>
  //     )}
  //     {rightClickState && (
  //       <CardComments onClick={onDeleteClick}>
  //         <FontAwesomeIcon icon={faTimes} />
  //       </CardComments>
  //     )}
  //   </ColCard>
  // </CardContainer>
};
