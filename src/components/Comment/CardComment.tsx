import React, { useState } from "react";
import {
  CommentInput,
  UserComment,
  CommentEdit,
  CommentBorders,
  UserCommentBar,
} from "./styles";
import { Comm } from "../../utils/global-context-types";

interface Props {
  id: number;
}

export const CardComment: React.FC<Props> = ({ id }) => {
  // const { state, reducer } = useStateValue();
  // const [nameState, setNameState] = useState<boolean>(false);

  // const commentState = state.comments.find((comment) => comment.id === id);
  // if (!commentState) return null;
  // const comment: Comm = commentState;

  // function onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
  //   const { id, author, idCard } = comment;
  //   const v = event.target.value;
  //   if (v === "") return;
  //   reducer({
  //     type: "CHANGE_COMM",
  //     payload: { id, author, content: v, cardId: idCard },
  //   });
  // }

  // function deleteComm(
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ): void {
  //   const { id, author, content, idCard } = comment;
  //   reducer({
  //     type: "DEL_COMM",
  //     payload: { id, author, content, cardId: idCard },
  //   });
  // }

  return null;
  // <div>
  //   {!nameState && (
  //     <CommentBorders>
  //       {comment.author}
  //       <UserComment>{comment.content}</UserComment>
  //       <UserCommentBar>
  //         <div onClick={deleteComm}>Delete</div>
  //         <div onClick={() => setNameState((ps) => !ps)}>Change</div>
  //       </UserCommentBar>
  //     </CommentBorders>
  //   )}
  //   {nameState && (
  //     <CommentEdit>
  //       <CommentInput
  //         value={comment.content}
  //         onChange={onChange}
  //         onBlur={() => setNameState((ps) => !ps)}
  //       />
  //     </CommentEdit>
  //   )}
  // </div>
};
