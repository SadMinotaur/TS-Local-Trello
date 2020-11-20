import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comm, User } from "../../utils/global-types";
import { commentsSlice, RootState } from "../../utils/state-reducers";
import { StoreDispatchType } from "../../utils/store";
import {
  CommentInput,
  UserComment,
  CommentEdit,
  CommentBorders,
  UserCommentBar,
} from "./styles";

interface Props {
  id: number;
}

export const CardComment: React.FC<Props> = ({ id }) => {
  const comment: Comm = useSelector(
    (store: RootState) =>
      store.commentsArray.find((v: Comm) => v.id === id) as Comm
  );
  const author = useSelector(
    (store: RootState) =>
      store.usersArray.find((v: User) => v.id === id) as User
  );
  const dispatch: StoreDispatchType = useDispatch();

  const [nameState, setNameState] = useState<boolean>(false);
  if (!comment) return null;

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { id, authorId, cardId } = comment;
    const v = event.target.value;
    if (v === "") return;
    dispatch(
      commentsSlice.actions.commArrayChange({
        id,
        content: v,
        authorId,
        cardId,
      })
    );
  }

  function deleteComm(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    dispatch(commentsSlice.actions.commArrayRemove(id));
  }

  return (
    <div>
      {!nameState && (
        <CommentBorders>
          {author.name}
          <UserComment>{comment.content}</UserComment>
          <UserCommentBar>
            <div onClick={deleteComm}>Delete</div>
            <div onClick={() => setNameState((ps) => !ps)}>Change</div>
          </UserCommentBar>
        </CommentBorders>
      )}
      {nameState && (
        <CommentEdit>
          <CommentInput
            value={comment.content}
            onChange={onChange}
            onBlur={() => setNameState((ps) => !ps)}
          />
        </CommentEdit>
      )}
    </div>
  );
};
