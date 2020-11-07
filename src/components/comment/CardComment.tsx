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
    {nameState ? null : <UserComment onClick={() => setNameState(prevState => !prevState)}
                                     key={props.comment.id}> {props.comment.author} : {nameValue}</UserComment>}
    {nameState ?
      <CommentInput value={nameValue} onChange={event => setNameValue(event.target.value)} onBlur={event => {
        props.changeCardComment(props.comment.id, event);
        setNameState(prevState => !prevState)
      }}/> : null}
    {nameState ? null : <UserCommentDelete onClick={() => {
      props.setCommentsArray((prevState: any[]) => {
        props.deleteCardComment(props.comment.id);
        return prevState.filter(value => value.key !== props.comment.id.toString());
      });
    }}>
      <FontAwesomeIcon icon={faTimes}/>
    </UserCommentDelete>}
  </div>);
}