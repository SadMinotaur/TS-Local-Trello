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
  changeCardComment: (i: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  addCardComment: (comment: Comments) => void;
  deleteCardComment: (id: number) => void;
}

export const CardPopup: React.FC<Props> = ({ cardInfo, popupState, setPopupState, changeCardName, changeCardDecs, changeCardComment, addCardComment, deleteCardComment }) => {

  const [name, setName] = useState<string>(cardInfo.name);
  const [commentsArray, setCommentsArray] = useState<Comments[]>(cardInfo.comments);
  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [newCommentValue, setCommentValue] = useState<string>("");

  function handleEsc(event: { keyCode: number; }): void {
    if (event.keyCode === 27) setPopupState(false);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  return (
    <Popup height={500} width={768} popupState={popupState} setPopupState={setPopupState} popupContent={
      <PopupContent>
        <CardContent onClick={() => {
          setChangeNamePopup(prevState => !prevState);
        }} empty={cardInfo.comments.length <= 0} curr={changeNamePopup}>
          {name}
        </CardContent>
        {changeNamePopup ? <NameInput value={name} onChange={ev => {
          changeCardName(ev);
          setName(ev.target.value);
        }} onBlur={() =>
          setChangeNamePopup(prevState => !prevState)
        } placeholder={"Enter new name"} /> : null}
        <PopupTitle>
          Description
        </PopupTitle>
        <PopupDesc value={cardInfo.desc} onChange={changeCardDecs} />
        <PopupTitle>
          Comments
        </PopupTitle>
        <CommentsInputContainer>
          <CommentsInput value={newCommentValue} onChange={event => setCommentValue(event.target.value)} />
          <button onClick={() => {
            if (newCommentValue === "") return;
            const c: Comments = {
              id: commentsArray.length,
              author: localStorage.getItem("user") as string,
              content: newCommentValue
            } as Comments;
            addCardComment(c);
            setCommentsArray(prevState => {
              return prevState.concat(c);
            });
          }} className={"btn primary"}>Send
          </button>
        </CommentsInputContainer>
        <CommentsArray>
          {commentsArray.map(({ id, author, content }) =>
            <CardComment index={id} key={id} author={author} content={content}
              changeCardComment={changeCardComment} setCommentsArray={setCommentsArray} deleteCardComment={deleteCardComment} />)}
        </CommentsArray>
      </PopupContent>
    } />
  )
}