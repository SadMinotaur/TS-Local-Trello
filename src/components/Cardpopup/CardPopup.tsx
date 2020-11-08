import React, { useEffect, useState } from "react";
import {
  CardContent,
  CommentsArray,
  CommentsInput, CommentsInputContainer,
  NameInput,
  PopupContent,
  PopupDesc,
  PopupTitle
} from "./styles";
import { Popup } from "../Popup";
import { Card, Comments } from "../columnsContent";
import { CardComment } from "../Comment";

interface Props {
  cardInfo: Card;
  popupState: boolean;
  setPopupState: (prevState: boolean) => void;
  changeCardName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCardDecs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCardsComments: (comms: Comments[]) => void;
}

export const CardPopup: React.FC<Props> = ({ cardInfo, popupState, setPopupState, changeCardName, changeCardDecs, setCardsComments }) => {

  const [name, setName] = useState<string>(cardInfo.name);
  const [commentsArray, setCommentsArray] = useState<Comments[]>(cardInfo.comments);
  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [newCommentValue, setCommentValue] = useState<string>("");

  function handleEsc(event: { keyCode: number; }): void {
    if (event.keyCode === 27) setPopupState(false);
  }

  function changeCardComment(i: number, event: React.ChangeEvent<HTMLInputElement>) {
    const content: string = event.target.value;
    const copy = [...commentsArray];
    const elIndex = copy.findIndex(v => v.id === i);
    copy[elIndex] = { id: i, author: copy[elIndex].author, content: content };
    setCommentsArray(copy);
    setCardsComments(copy);
  }

  function deleteCardComment(i: number) {
    const ar = commentsArray.filter(v => v.id !== i);
    setCommentsArray(ar);
    setCardsComments(ar);
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>) {
    const v = ev.target.value;
    if (v.trim() === "") return
    changeCardName(ev);
    setName(v);
  }

  function saveComment() {
    if (newCommentValue.trim() === "") return;
    const c: Comments = {
      id: commentsArray.length,
      author: localStorage.getItem("user") as string,
      content: newCommentValue
    };
    const ar = commentsArray.concat(c);
    setCommentsArray(ar);
    setCardsComments(ar);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => { window.removeEventListener('keydown', handleEsc); };
  });

  return (
    <Popup height={500} width={768} popupState={popupState} setPopupState={setPopupState}
      popupContent={
        <PopupContent>
          <CardContent
            onClick={() => {
              setChangeNamePopup(ps => !ps);
            }}
            empty={cardInfo.comments.length <= 0}
            curr={changeNamePopup}>
            {name}
          </CardContent>
          {changeNamePopup ?
            <NameInput
              value={name}
              onChange={changeName}
              onBlur={() => setChangeNamePopup(ps => !ps)} />
            : null}
          <PopupTitle>
            Description
        </PopupTitle>
          <PopupDesc
            value={cardInfo.desc}
            onChange={changeCardDecs} />
          <PopupTitle>
            Comments
        </PopupTitle>
          <CommentsInputContainer>
            <CommentsInput value={newCommentValue}
              onChange={event => setCommentValue(event.target.value)} />
            <button
              onClick={saveComment}
              className={"btn primary"}>
              Send
            </button>
          </CommentsInputContainer>
          <CommentsArray>
            {commentsArray.map(({ id, author, content }) =>
              <CardComment
                index={id}
                key={id}
                author={author}
                content={content}
                changeCardComment={changeCardComment}
                deleteCardComment={deleteCardComment} />)}
          </CommentsArray>
        </PopupContent>
      } />
  )
}