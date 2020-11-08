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
import { Card, Comments } from "../../utils/ColumnsContent";
import { CardComment } from "../Comment";

interface Props {
  cardInfo: Card;
  setPopupState: (prevState: boolean) => void;
  changeCardName: (v: string) => void;
  changeCardDecs: (v: string) => void;
  setCardsComments: (comms: Comments[]) => void;
}

export const CardPopup: React.FC<Props> = ({ cardInfo, setPopupState, changeCardName, changeCardDecs, setCardsComments }) => {

  const [name, setName] = useState<string>(cardInfo.name);
  const [decs, setDesc] = useState<string>(cardInfo.desc);
  const [commentsArray, setCommentsArray] = useState<Comments[]>(cardInfo.comments);
  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [newCommentValue, setCommentValue] = useState<string>("");

  function changeCardComment(i: number, event: React.ChangeEvent<HTMLInputElement>) {
    const content: string = event.target.value;
    const copy: Comments[] = [...commentsArray];
    const elIndex: number = copy.findIndex(v => v.id === i);
    copy[elIndex] = { id: i, author: copy[elIndex].author, content: content };
    setCommentsArray(copy);
    setCardsComments(copy);
  }

  function deleteCardComment(i: number) {
    const ar: Comments[] = commentsArray.filter(v => v.id !== i);
    setCommentsArray(ar);
    setCardsComments(ar);
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>) {
    const v: string = ev.target.value;
    if (v.trim() === "") return
    changeCardName(v);
    setName(v);
  }

  function saveComment() {
    if (newCommentValue.trim() === "") return;
    const c: Comments = {
      id: commentsArray.length,
      author: localStorage.getItem("user") as string,
      content: newCommentValue
    };
    const ar: Comments[] = commentsArray.concat(c);
    setCommentsArray(ar);
    setCardsComments(ar);
  }

  function handleEsc(event: { keyCode: number; }): void {
    if (event.keyCode === 27) setPopupState(false);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => { window.removeEventListener('keydown', handleEsc); };
  });

  return <Popup height={500} width={768} setPopupState={setPopupState}
    popupContent={
      <PopupContent>
        <CardContent
          onClick={() => setChangeNamePopup(ps => !ps)}
          empty={commentsArray.length <= 0}
          curr={changeNamePopup}>
          {name}
        </CardContent>
        {changeNamePopup ? <NameInput
          value={name}
          onChange={changeName}
          onBlur={() => setChangeNamePopup(ps => !ps)}
        /> : null}
        <PopupTitle>
          Description
        </PopupTitle>
        <PopupDesc
          value={decs}
          onChange={ev => {
            const v: string = ev.target.value;
            setDesc(v)
            changeCardDecs(v);
          }}
        />
        <PopupTitle>Comments</PopupTitle>
        <CommentsInputContainer>
          <CommentsInput
            value={newCommentValue}
            onChange={event => setCommentValue(event.target.value)}
          />
          <button onClick={saveComment} className={"btn primary"}>
            Send
          </button>
        </CommentsInputContainer>
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