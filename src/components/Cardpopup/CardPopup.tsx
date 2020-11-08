import React, { useEffect, useState } from "react";
import {
  CardName, CommentsArray, CommentsBorder, PopupDescDiv, CommentsInput, CommentsInputButton,
  NameInput, PopupContent, PopupDesc, PopupText
} from "./styles";
import { Popup } from "../Popup";
import { Card, Comments } from "../../utils/ColumnsContent";
import { CardComment } from "../Comment";

interface Props {
  cardInfo: Card;
  column: string;
  setPopupState: (prevState: boolean) => void;
  changeCardName: (v: string) => void;
  changeCardDesc: (v: string) => void;
  setParentCardsComments: (comms: Comments[]) => void;
}

export const CardPopup: React.FC<Props> = ({ cardInfo, column, setPopupState, changeCardName, changeCardDesc: changeCardDecs, setParentCardsComments }) => {

  const [name, setName] = useState<string>(cardInfo.name);
  const [desc, setDesc] = useState<string>(cardInfo.desc);
  const [commentsArray, setCommentsArray] = useState<Comments[]>(cardInfo.comments);

  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [addCommentState, setAddCommentState] = useState<boolean>(false);
  const [descState, setDescState] = useState<boolean>(false);
  const [newCommentValue, setCommentValue] = useState<string>("");

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => { window.removeEventListener('keydown', handleEsc); };
  });

  function handleEsc(event: { keyCode: number }): void {
    if (event.keyCode === 27) setPopupState(false);
  }

  function changeCardComment(i: number, event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const content: string = event.target.value;
    const copy: Comments[] = [...commentsArray];
    const elIndex: number = copy.findIndex(v => v.id === i);
    copy[elIndex] = { id: i, author: copy[elIndex].author, content: content };
    setCommentsArray(copy);
    setParentCardsComments(copy);
  }

  function deleteCardComment(i: number): void {
    const ar: Comments[] = commentsArray.filter(v => v.id !== i);
    setCommentsArray(ar);
    setParentCardsComments(ar);
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = ev.target.value;
    if (v.trim() === "") return
    setName(v);
    changeCardName(v);
  }

  function changeDesc(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
    const v: string = ev.target.value;
    setDesc(v);
    changeCardDecs(v);
  }

  function saveComment(): void {
    setAddCommentState(false);
    if (newCommentValue.trim() === "") return;
    const c: Comments = {
      id: commentsArray.length,
      author: localStorage.getItem("user") as string,
      content: newCommentValue
    };
    const ar: Comments[] = commentsArray.concat(c);
    setCommentsArray(ar);
    setParentCardsComments(ar);
  }

  return <Popup
    height={"fit-content"}
    width={"768px"}
    setPopupState={setPopupState}
    popupContent={
      <PopupContent>
        {!changeNamePopup && <CardName onClick={() => setChangeNamePopup(ps => !ps)}>
          {name}
        </CardName>}
        {changeNamePopup && <NameInput
          value={name}
          onChange={changeName}
          onBlur={() => setChangeNamePopup(ps => !ps)}
        />}
        <PopupText>
          In column: {column}
        </PopupText>
        <PopupText>
          Author: {cardInfo.author}
        </PopupText>
        <PopupText>
          Description
        </PopupText>
        {!descState && <PopupDescDiv onClick={() => setDescState(ps => !ps)}>
          {desc}
        </PopupDescDiv>}
        {descState && <PopupDesc
          value={desc}
          onMouseOver={e => e.currentTarget.focus()}
          onBlur={() => { setDescState(ps => !ps) }}
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
          {addCommentState && <CommentsInputButton onClick={saveComment}>
            Save
          </CommentsInputButton>}
        </CommentsBorder>
        <CommentsArray>
          {commentsArray.map(({ id, author, content }) => <CardComment
            index={id}
            key={id}
            author={author}
            content={content}
            changeCardComment={changeCardComment}
            deleteCardComment={deleteCardComment} />)}
        </CommentsArray>
      </PopupContent>
    } />
}