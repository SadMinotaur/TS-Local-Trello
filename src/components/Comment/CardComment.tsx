import React, { useState } from "react";
import { CommentInput, UserComment, UserCommentDelete } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  content: string;
  author: string;
  index: number;
  setCommentsArray: (ps: any) => void;
  deleteCardComment: (key: number) => void;
  changeCardComment: (i: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardComment: React.FC<Props> = ({ content, author, index, deleteCardComment, changeCardComment, setCommentsArray }) => {

  const [nameState, setNameState] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>(content);

  return <div>
    {nameState ? null :
      <UserComment onClick={() => setNameState(prevState => !prevState)} key={index}>
        {author} : {nameValue}
      </UserComment>}
    {nameState ?
      <CommentInput value={nameValue} onChange={event => setNameValue(event.target.value)} onBlur={event => {
        changeCardComment(index, event);
        setNameState(prevState => !prevState)
      }} /> : null}
    {nameState ? null : <UserCommentDelete onClick={() => {
      setCommentsArray((ps: any[]) => ps.filter(v => v.id !== index))
      deleteCardComment(index);
    }}>
      <FontAwesomeIcon icon={faTimes} />
    </UserCommentDelete>
    }
  </div >
}