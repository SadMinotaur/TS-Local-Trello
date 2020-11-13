import React, { useEffect, useState } from "react";
import {
  CardName, CommentsArray, CommentsBorder, PopupDescDiv,
  CommentsInput, CommentsInputButton, NameInput, PopupContent,
  PopupDesc, PopupText
} from "./styles";
import { Popup } from "../Popup";
import { useStateValue } from "../AppContext/GlobalContext";
import { Card } from "../../utils/global-context-types";

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
  const [nameValue, setNameValue] = useState<string>(res ? res.name : "");
  const [descValue, setDescValue] = useState<string>(res ? res.desc : "");
  if (!res) return null;
  const card: Card = res as Card;

  function setPopupState(setState: boolean) {
    reducer({ type: "CHANGE_POPUP", payload: { state: setState, idCard: -1 } })
  }

  function handleEsc(event: { keyCode: number }): void {
    if (event.keyCode === 27) { setPopupState(false) };
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = ev.target.value;
    if (v.trim() === "") return;
    setNameValue(v);
  }

  function changeNameOnBlur(ev: React.ChangeEvent<HTMLInputElement>): void {
    const { id, author, idColumn } = card;
    setChangeNamePopup(ps => !ps);
    reducer({
      type: "CHANGE_CARD", payload:
        { id: id, name: nameValue, author: author, columnId: idColumn, desc: descValue }
    });
  }

  function changeDesc(ev: React.ChangeEvent<HTMLTextAreaElement>): void {

  }

  function saveComment() {

  }

  return <Popup
    height={"fit-content"}
    width={"768px"}
    setPopupState={setPopupState}>
    <PopupContent>
      {!changeNamePopup && <CardName
        onClick={() => setChangeNamePopup(ps => !ps)}>
        {nameValue}
      </CardName>}
      {changeNamePopup && <NameInput
        onMouseOver={e => e.currentTarget.focus()}
        value={nameValue}
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
        {descValue}
      </PopupDescDiv>}
      {descState && <PopupDesc
        value={descValue}
        onMouseOver={e => e.currentTarget.focus()}
        onBlur={() => setDescState(ps => !ps)}
        onChange={e => setDescValue(e.target.value)} />}
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
          onClick={() => saveComment()}>
          Save
          </CommentsInputButton>}
      </CommentsBorder>
      <CommentsArray>
      </CommentsArray>
    </PopupContent>
  </Popup >
}