import React, { useCallback, useEffect, useState } from "react";
import {
  CardName, CommentsArray, CommentsBorder, PopupDescDiv,
  CommentsInput, CommentsInputButton, NameInput, PopupContent,
  PopupDesc, PopupText
} from "./styles";
import { Popup } from "../Popup";
import { Comments } from "../../utils/columns-content";
import { CardComment } from "../Comment";
import { useContext } from "react";
import { PopupCardContext } from "../../utils/popup-context";

interface Props {
  column: string;
  setPopupState: (prevState: boolean) => void;
  changeCardName: (v: string) => void;
  changeCardDesc: (v: string) => void;
  setCardsComments: (comms: Comments[]) => void;
}

export const CardPopup: React.FC<Props> = ({ column, setPopupState, changeCardName, changeCardDesc, setCardsComments }) => {

  const [newCommentValue, setCommentValue] = useState<string>("");
  const context = useContext(PopupCardContext);
  const { name, desc, comments, author } = context;

  const [changeNamePopup, setChangeNamePopup] = useState<boolean>(false);
  const [addCommentState, setAddCommentState] = useState<boolean>(false);
  const [descState, setDescState] = useState<boolean>(false);

  function handleEsc(event: { keyCode: number }): void {
    if (event.keyCode === 27) setPopupState(false);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  const changeCardComment = useCallback((i: number, event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setCardsComments(comments.map((comment) =>
      comment.id === i ? { ...comment, content: event.target.value } : comment
    )),
    [comments, setCardsComments]
  );

  const deleteCardComment = useCallback((i: number) =>
    setCardsComments(comments.filter(v => v.id !== i)),
    [comments, setCardsComments]
  );

  function changeName(ev: React.ChangeEvent<HTMLInputElement>): void {
    const v: string = ev.target.value;
    if (v.trim() === "") return
    changeCardName(v);
  }

  function changeDesc(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
    changeCardDesc(ev.target.value);
  }

  const saveComment = useCallback(() => {
    setAddCommentState(false);
    if (newCommentValue.trim() === "") return;
    setCommentValue("");
    setCardsComments(comments.concat({
      id: comments.length,
      author: author,
      content: newCommentValue
    }));
  }, [author, comments, newCommentValue, setCardsComments]
  );

  return <Popup
    height={"fit-content"}
    width={"768px"}
    setPopupState={setPopupState}>
    <PopupContent>
      {!changeNamePopup && <CardName
        onClick={() => setChangeNamePopup(ps => !ps)}>
        {name}
      </CardName>}
      {changeNamePopup && <NameInput
        onMouseOver={e => e.currentTarget.focus()}
        value={name}
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
      {!descState && <PopupDescDiv
        onClick={() => setDescState(ps => !ps)}>
        {desc}
      </PopupDescDiv>}
      {descState && <PopupDesc
        value={desc}
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
          onClick={() => saveComment()}>
          Save
          </CommentsInputButton>}
      </CommentsBorder>
      <CommentsArray>
        {comments.map(({ id, author, content }) => <CardComment
          index={id}
          author={author}
          content={content}
          key={id}
          changeCardComment={changeCardComment}
          deleteCardComment={deleteCardComment}
        />)}
      </CommentsArray>
    </PopupContent>
  </Popup >
}