import React from "react";
import {UserComment, UserCommentDelete} from "./styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Comments} from "../columnsContent";

interface Props {
  comment: Comments;
  deleteCardComment: (key: number) => void;
  setCommentsArray: (prevState: any) => void;
}

export const CardComment: React.FC<Props> = (props) => {
  return (<div>
    <UserComment
      key={props.comment.id}> {props.comment.author} : {props.comment.content}
    </UserComment>
    <UserCommentDelete onClick={() => {
      props.setCommentsArray((prevState: any[]) => {
        prevState.forEach((value, i) => {
          if (value.key == props.comment.id) {
            props.deleteCardComment(i);
            prevState.splice(i, 1);
            return [...prevState];
          }
        });
        return prevState;
      });
    }}>
      <FontAwesomeIcon icon={faTimes}/>
    </UserCommentDelete>
  </div>);
}