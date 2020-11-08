import React, { useState } from "react";
import { CommentInput, UserComment, UserCommentDelete, CommentEdit } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  content: string;
  author: string;
  index: number;
  deleteCardComment: (key: number) => void;
  changeCardComment: (i: number, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CardComment: React.FC<Props> = ({ content, author, index, deleteCardComment, changeCardComment }) => {

  const [nameState, setNameState] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>(content);

  return <div>
    {!nameState && <UserComment
      onClick={() => setNameState(ps => !ps)}
      key={index}>
      {author} : {nameValue}
    </UserComment>}
    {nameState && <CommentEdit>
      <CommentInput
        value={nameValue}
        onChange={event => setNameValue(event.target.value)}
        onBlur={event => {
          changeCardComment(index, event);
          setNameState(ps => !ps);
        }} />
      <UserCommentDelete onClick={() => deleteCardComment(index)}>
        <FontAwesomeIcon icon={faTimes} />
      </UserCommentDelete>
    </CommentEdit>}
  </div>
}