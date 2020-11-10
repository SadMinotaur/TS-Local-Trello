import React, { useCallback, useEffect, useState } from "react";
import {
  CardName, CommentsArray, CommentsBorder, PopupDescDiv,
  CommentsInput, CommentsInputButton, NameInput, PopupContent,
  PopupDesc, PopupText
} from "./styles";
import { Popup } from "../Popup";
import { Comments } from "../../utils/columns-content";
import { CardComment } from "../Comment";
import { PopupCardContext } from "../Columncard/ColumnCard";
import { useContext } from "react";

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
  const context = useContext(PopupCardContext);

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

  const changeCardComment = useCallback((i: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content: string = event.target.value;
    const ar: Comments[] = context.comments.map((comment) =>
      comment.id === i ? { ...comment, content: content } : comment
    );
    setCardsComments(ar);
  }, [context.comments, setCardsComments]
  );

  const deleteCardComment = useCallback((i: number) =>
    setCardsComments(context.comments.filter(v => v.id !== i)),
    [context.comments, setCardsComments]
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
    const c: Comments = {
      id: context.comments.length,
      author: author,
      content: newCommentValue
    };
    setCommentValue("");
    setCardsComments(context.comments.concat(c));
  }, [author, context.comments, newCommentValue, setCardsComments]
  );

  return <Popup
    height={"fit-content"}
    width={"768px"}
    setPopupState={setPopupState}>
    <PopupContent>
      {!changeNamePopup && <CardName
        onClick={() => setChangeNamePopup(ps => !ps)}>
        {context.name}
      </CardName>}
      {changeNamePopup && <NameInput
        onMouseOver={e => e.currentTarget.focus()}
        value={context.name}
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
        {context.desc}
      </PopupDescDiv>}
      {descState && <PopupDesc
        value={context.desc}
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
          onClick={() => saveComment()}>
          Save
          </CommentsInputButton>}
      </CommentsBorder>
      <CommentsArray>
        {context.comments.map(({ id, author, content }) => <CardComment
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