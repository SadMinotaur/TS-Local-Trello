import React, {useState} from "react";
import {CommentInput, UserComment, UserCommentDelete} from "./styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Comments} from "../columnsContent";

interface Props {
  comment: Comments;
  deleteCardComment: (key: number) => void;
  setCommentsArray: (prevState: any) => void;
  changeCardComment: (i: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardComment: React.FC<Props> = (props) => {

  const [nameState, setNameState] = useState(false);
  const [nameValue, setNameValue] = useState(props.comment.content);

  return (<div>
    {nameState ? null : <UserComment onClick={event => setNameState(prevState => !prevState)}
                                     key={props.comment.id}> {props.comment.author} : {nameValue}</UserComment>}
    {nameState ?
      <CommentInput value={nameValue} onChange={event => setNameValue(event.target.value)} onBlur={event => {
        props.changeCardComment(props.comment.id, event);
        setNameState(prevState => !prevState)
      }}/> : null}
    {nameState ? null : <UserCommentDelete onClick={() => {
      props.setCommentsArray((prevState: any[]) => {
        prevState.forEach((value, i) => {
          if (value.key === props.comment.id.toString()) {
            props.deleteCardComment(i);
            prevState.splice(i, 1);
            return [...prevState];
          }
        });
        return prevState;
      });
    }}>
      <FontAwesomeIcon icon={faTimes}/>
    </UserCommentDelete>}
  </div>);
}