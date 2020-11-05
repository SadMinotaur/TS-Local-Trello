import React, {useState} from "react";
import {
  CardContent,
  Comments,
  CommentsInput,
  NameInput,
  PopupContent,
  PopupDesc,
  PopupTitle, UserComment
} from "./styles";
import {Popup} from "../popup";
import {Card} from "../columnsContent";

interface Props {
  cardInfo: Card;
  popupState: boolean;
  // TODO : Figure out types
  setPopupState: (prevState: any) => void;
  changeCardName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCardInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardPopup: React.FC<Props> = (props) => {

  const [changeNamePopup, setChangeNamePopup] = useState(false);
  const [newCommentValue, setCommentValue] = useState("");

  const cardComments: object[] = Array(props.cardInfo.comments.length);

  props.cardInfo.comments.forEach((value, i) => {
    //TODO: Make prettier
    cardComments[i] = <UserComment>{value.author} : {value.content}</UserComment>;
  });

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
        <PopupDesc value={props.cardInfo.desc} onChange={props.setCardInfo}/>
        <PopupTitle>
          Comments
        </PopupTitle>
        <CommentsInput value={newCommentValue} onChange={event => setCommentValue(event.target.value)}/>
        <Comments>
          {cardComments}
        </Comments>
      </PopupContent>
    }/>
  )
}