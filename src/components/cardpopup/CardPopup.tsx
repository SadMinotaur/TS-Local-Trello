import React, {useState} from "react";
import {
  CardContent,
  CommentsArray,
  CommentsInput, CommentsInputContainer,
  NameInput,
  PopupContent,
  PopupDesc,
  PopupTitle, UserComment
} from "./styles";
import {Popup} from "../popup";
import {Card, Comments} from "../columnsContent";

interface Props {
  cardInfo: Card;
  popupState: boolean;
  // TODO : Figure out types
  setPopupState: (prevState: any) => void;
  changeCardName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCardDecs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addCardComment: (comment: Comments) => void;
}

export const CardPopup: React.FC<Props> = (props) => {

  const cardComments: object[] = Array(props.cardInfo.comments.length);
  props.cardInfo.comments.forEach((value, i) => {
    //TODO: Make prettier
    cardComments[i] = <UserComment>{value.author} : {value.content}</UserComment>;
  });

  const [commentsArray, setCommentsArray] = useState(cardComments);
  const [changeNamePopup, setChangeNamePopup] = useState(false);
  const [newCommentValue, setCommentValue] = useState("");

  return (
    <Popup height={300} width={350} popupState={props.popupState} setPopupState={props.setPopupState} popupContent={
      <PopupContent>
        <CardContent onClick={() => {
          setChangeNamePopup(prevState => !prevState);
        }} empty={props.cardInfo.comments.length <= 0} style={{color: changeNamePopup ? "white" : "grey"}}>
          {props.cardInfo.name}
        </CardContent>
        {changeNamePopup ? <NameInput value={props.cardInfo.name} onChange={props.changeCardName} onBlur={() => {
          setChangeNamePopup(prevState => !prevState);
        }} placeholder={"Enter new name"} style={{display: changeNamePopup ? "block" : "none"}}/> : null}
        <PopupTitle>
          Description
        </PopupTitle>
        <PopupDesc value={props.cardInfo.desc} onChange={props.changeCardDecs}/>
        <PopupTitle>
          Comments
        </PopupTitle>
        <CommentsInputContainer>
          <CommentsInput value={newCommentValue} onChange={event => setCommentValue(event.target.value)}/>
          <button onClick={() => {
            props.addCardComment({author: localStorage.getItem("user") as string, content: newCommentValue});
            setCommentsArray(prevState => {
              return prevState.concat(<UserComment
                key={prevState.length}>{localStorage.getItem("user")} : {newCommentValue}</UserComment>)
            });
          }} className={"btn primary"}>Send
          </button>
        </CommentsInputContainer>
        <CommentsArray>
          {commentsArray}
        </CommentsArray>
      </PopupContent>
    }/>
  )
}