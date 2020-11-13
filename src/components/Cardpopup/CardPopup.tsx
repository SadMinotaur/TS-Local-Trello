import React, { useEffect, useState } from "react";
import {
  CardName, CommentsArray, CommentsBorder, PopupDescDiv,
  CommentsInput, CommentsInputButton, NameInput, PopupContent,
  PopupDesc, PopupText
} from "./styles";
import { Popup } from "../Popup";
import { useStateValue } from "../AppContext/GlobalContext";
import { Card } from "../../utils/global-context-types";
import { CardComment } from "../Comment";

export const CardPopup: React.FC = () => {

  const { state, reducer } = useStateValue();
  const [newCommentValue, setCommentValue] = useState<string>("");

  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [addCommentState, setAddCommentState] = useState<boolean>(false);
  const [descState, setDescState] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  const res = state.cards.find((crd) => crd.id === state.popup.idCard);
  if (!res) return null;
  const card: Card = res as Card;

  function setPopupState(setState: boolean): void {
    reducer({ type: "CHANGE_POPUP", payload: { state: setState, idCard: -1 } })
  }

  function handleEsc(event: { keyCode: number }): void {
    if (event.keyCode === 27) { setPopupState(false) };
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>): void {
    const { id, author, desc, idColumn } = card;
    const v: string = ev.target.value;
    if (v.trim() === "") return;
    reducer({
      type: "CHANGE_CARD", payload:
        { id: id, name: ev.target.value, author: author, columnId: idColumn, desc: desc }
    });
  }

  function changeDesc(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { id, name, author, idColumn } = card;
    const v: string = ev.target.value;
    if (v.trim() === "") return;
    reducer({
      type: "CHANGE_CARD", payload:
        { id: id, name: name, author: author, columnId: idColumn, desc: ev.target.value }
    });
  }

  function changeNameOnBlur(ev: React.ChangeEvent<HTMLInputElement>): void {
    setChangeNamePopup(ps => !ps);
  }

  function saveComment(): void {
    if (newCommentValue.trim() === "") return;
    setCommentValue("");
    reducer({
      type: "ADD_COMM", payload: {
        id: state.comments.length, author: state.user,
        content: newCommentValue, cardId: card.id,
      }
    });
  }

  return <Popup
    height={"fit-content"}
    width={"768px"}
    setPopupState={setPopupState}>
    <PopupContent>
      {!changeNamePopup && <CardName
        onClick={() => setChangeNamePopup(ps => !ps)}>
        {card.name}
      </CardName>}
      {changeNamePopup && <NameInput
        onMouseOver={e => e.currentTarget.focus()}
        value={card.name}
        onChange={changeName}
        onBlur={changeNameOnBlur}
      />}
      <PopupText>
        In column: {state.columns.find((col) => col.id === card.idColumn)?.name}
      </PopupText>
      <PopupText>
        Created by: {card.author}
      </PopupText>
      <PopupText>
        Description
      </PopupText>
      {!descState && <PopupDescDiv
        onClick={() => setDescState(ps => !ps)}>
        {card.desc}
      </PopupDescDiv>}
      {descState && <PopupDesc
        value={card.desc}
        onMouseOver={e => e.currentTarget.focus()}
        onBlur={() => setDescState(ps => !ps)}
        onChange={changeDesc} />}
      <PopupText>
        Comments
      </PopupText>
      <CommentsBorder>
        <CommentsInput
          onClick={() => setAddCommentState(true)}
          placeholder={"Write new comment"}
          value={newCommentValue}
          onChange={event => setCommentValue(event.target.value)} />
        {addCommentState && <CommentsInputButton
          onClick={saveComment}>
          Save
          </CommentsInputButton>}
      </CommentsBorder>
      <CommentsArray>
        {state.comments.map((comm) => comm.idCard === card.id &&
          <CardComment key={comm.id} id={comm.id} />)}
      </CommentsArray>
    </PopupContent>
  </Popup >
}