import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsSlice, RootState } from "../../utils/state-reducers";
import { CommentSelector } from "../../utils/state-selectors";
import { StoreDispatchType } from "../../utils/store";
import {
  CommentInput,
  UserComment,
  CommentEdit,
  CommentBorders,
  UserCommentBar,
} from "./styles";

interface Props {
  keyProp: number;
}

export const CardComment: React.FC<Props> = ({ keyProp }) => {
  const { author, comment, currUser } = useSelector((store: RootState) =>
    CommentSelector(store, { key: keyProp })
  );
  const dispatch: StoreDispatchType = useDispatch();

  const [nameState, setNameState] = useState<boolean>(false);
  if (!comment) return null;

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const v: string = event.target.value;
    if (v === "" || author.key !== currUser) return;
    dispatch(
      commentsSlice.actions.commArrayChange({
        ...comment,
        content: v,
      })
    );
  }

  function deleteComm(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (author.key !== currUser) return;
    dispatch(commentsSlice.actions.commArrayRemove(keyProp));
  }

  return (
    <div>
      {!nameState && (
        <CommentBorders>
          {author.name}
          <UserComment>{comment.content}</UserComment>
          {author.key === currUser && (
            <UserCommentBar>
              <div onClick={deleteComm}>Delete</div>
              <div onClick={() => setNameState((ps) => !ps)}>Change</div>
            </UserCommentBar>
          )}
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
