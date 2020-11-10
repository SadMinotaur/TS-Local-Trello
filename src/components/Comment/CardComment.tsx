import React, { useState } from "react";
import { CommentInput, UserComment, UserCommentDelete, CommentEdit } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  index: number;
  author: string;
  content: string;
  deleteCardComment: (i: number) => void;
  changeCardComment: (i: number, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CardComment: React.FC<Props> = ({ index, author, content, deleteCardComment, changeCardComment }) => {

  const [nameState, setNameState] = useState<boolean>(false)

  return <div>
    {!nameState && <UserComment
      onClick={() => setNameState(ps => !ps)}
      key={index}>
      {author} : {content}
    </UserComment>}
    {nameState && <CommentEdit>
      <CommentInput
        value={content}
        onChange={event => changeCardComment(index, event)}
        onBlur={() => setNameState(ps => !ps)} />
      <UserCommentDelete onClick={() => deleteCardComment(index)}>
        <FontAwesomeIcon icon={faTimes} />
      </UserCommentDelete>
    </CommentEdit>}
  </div>
}