import React, { useEffect, useState } from "react";
import {
  CardName, CommentsArray, CommentsBorder, PopupDescDiv,
  CommentsInput, CommentsInputButton, NameInput, PopupContent,
  PopupDesc, PopupText
} from "./styles";
import { Popup } from "../Popup";
import { Comments } from "../../utils/columns-content";
import { CardComment } from "../Comment";
import { PopupCardContext } from "../Columncard/ColumnCard";

interface Props {
  column: string;
  author: string;
  setPopupState: (prevState: boolean) => void;
  changeCardName: (v: string) => void;
  changeCardDesc: (v: string) => void;
  setCardsComments: (comms: Comments[]) => void;
}

export const CardPopup: React.FC<Props> = ({ column, author, setPopupState, changeCardName, changeCardDesc, setCardsComments }) => {

  const [newCommentValue, setCommentValue] = useState<string>("");

  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [addCommentState, setAddCommentState] = useState<boolean>(false);
  const [descState, setDescState] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => { window.removeEventListener('keydown', handleEsc); };
  });

  function handleEsc(event: { keyCode: number }): void {
    if (event.keyCode === 27) setPopupState(false);
  }

  function changeCardComment(i: number, comments: Comments[], event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const content: string = event.target.value;
    const ar: Comments[] = comments.map((comment) =>
      comment.id === i ? { ...comment, content: content } : comment
    );
    setCardsComments(ar);
  }

  function deleteCardComment(i: number, comments: Comments[]): void {
    setCardsComments(comments.filter(v => v.id !== i));
  }

  function changeName(ev: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = ev.target.value;
    if (v.trim() === "") return
    changeCardName(v);
  }

  function changeDesc(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
    changeCardDesc(ev.target.value);
  }

  function saveComment(comments: Comments[]): void {
    setAddCommentState(false);
    if (newCommentValue.trim() === "") return;
    const c: Comments = {
      id: comments.length,
      author: author,
      content: newCommentValue
    };
    setCardsComments(comments.concat(c));
  }

  return <Popup
    height={"fit-content"}
    width={"768px"}
    setPopupState={setPopupState}>
    <PopupCardContext.Consumer>
      {consumer => <PopupContent>
        {!changeNamePopup && <CardName
          onClick={() => setChangeNamePopup(ps => !ps)}>
          {consumer.name}
        </CardName>}
        {changeNamePopup && <NameInput
          onMouseOver={e => e.currentTarget.focus()}
          value={consumer.name}
          onChange={changeName}
          onBlur={() => setChangeNamePopup(ps => !ps)}
        />}
        <PopupText>
          In column: {column}
        </PopupText>
        <PopupText>
          Created by: {author}
        </PopupText>
        <PopupText>
          Description
          </PopupText>
        {!descState && <PopupDescDiv onClick={() => setDescState(ps => !ps)}>
          {consumer.desc}
        </PopupDescDiv>}
        {descState && <PopupDesc
          value={consumer.desc}
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
          {addCommentState && <CommentsInputButton
            onClick={() => saveComment(consumer.comments)}>
            Save
          </CommentsInputButton>}
        </CommentsBorder>
        <CommentsArray>
          {consumer.comments.map(({ id, author, content }) => <CardComment
            index={id}
            author={author}
            content={content}
            key={id}
            changeCardComment={changeCardComment}
            deleteCardComment={deleteCardComment}
          />)}
        </CommentsArray>
      </PopupContent>}
    </PopupCardContext.Consumer>
  </Popup >
}