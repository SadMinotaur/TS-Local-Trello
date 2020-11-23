import React, { useEffect, useState } from "react";
import {
  CardName,
  CommentsArray,
  CommentsBorder,
  PopupDescDiv,
  CommentsInput,
  CommentsInputButton,
  NameInput,
  PopupContent,
  PopupDesc,
  PopupText,
} from "./styles";
import { Popup } from "../Popup";
import { CardComment } from "../Comment";
import { StoreDispatchType } from "../../utils/store";
import { useDispatch, useSelector } from "react-redux";
import {
  cardsArraySlice,
  commentsSlice,
  popupSlice,
  RootState,
} from "../../utils/state-reducers";
import { CardPopupSelector } from "../../utils/state-selectors";

export const CardPopup: React.FC = () => {
  const {
    card,
    column,
    comments,
    cardAuthor,
    currUser,
  } = useSelector((store: RootState) => CardPopupSelector(store));

  const [newCommentValue, setCommentValue] = useState<string>("");

  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [addCommentState, setAddCommentState] = useState<boolean>(false);
  const [descState, setDescState] = useState<boolean>(false);

  const dispatch: StoreDispatchType = useDispatch();

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  });

  function handleEsc(event: { keyCode: number }): void {
    if (event.keyCode === 27) setPopupState();
  }

  function setPopupState(): void {
    dispatch(popupSlice.actions.changePopup(-1));
  }

  function changeNameState(): void {
    setChangeNamePopup((ps) => !ps);
  }

  function onMouseOver(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    e.currentTarget.focus();
  }

  function toggleDescription(): void {
    setDescState((ps) => !ps);
  }

  function cardChangeDispatch(name: string, desc: string): void {
    dispatch(
      cardsArraySlice.actions.cardsArrayChange({
        ...card,
        name: name,
        desc: desc,
      })
    );
  }

  function changeName(e: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = e.target.value;
    if (v.trim() === "") return;
    cardChangeDispatch(v, card.desc);
  }

  function changeDesc(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    cardChangeDispatch(card.name, e.target.value);
  }

  function saveComment(): void {
    if (newCommentValue.trim() === "") return;
    dispatch(
      commentsSlice.actions.commArrayAdd({
        key: -1,
        content: newCommentValue,
        authorId: currUser,
        cardId: card.key,
      })
    );
    setCommentValue("");
  }

  return (
    <Popup height={"fit-content"} width={"768px"} setPopupState={setPopupState}>
      <PopupContent>
        {!changeNamePopup && (
          <CardName onClick={changeNameState}>{card.name}</CardName>
        )}
        {changeNamePopup && (
          <NameInput
            type="text"
            onMouseOver={onMouseOver}
            value={card.name}
            onChange={changeName}
            onBlur={changeNameState}
          />
        )}
        <PopupText>In column: {column.name}</PopupText>
        <PopupText>Created by: {cardAuthor.name}</PopupText>
        <PopupText>Description</PopupText>
        {!descState && (
          <PopupDescDiv onClick={toggleDescription}>{card.desc}</PopupDescDiv>
        )}
        {descState && (
          <PopupDesc
            value={card.desc}
            onMouseOver={onMouseOver}
            onBlur={toggleDescription}
            onChange={changeDesc}
          />
        )}
        <PopupText>Actions</PopupText>
        <CommentsBorder>
          <CommentsInput
            onClick={() => setAddCommentState(true)}
            placeholder={"Write new comment"}
            value={newCommentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          {addCommentState && (
            <CommentsInputButton onClick={saveComment}>
              Save
            </CommentsInputButton>
          )}
        </CommentsBorder>
        <CommentsArray>
          {comments.map((comm) => (
            <CardComment key={comm.key} keyProp={comm.key} />
          ))}
        </CommentsArray>
      </PopupContent>
    </Popup>
  );
};
