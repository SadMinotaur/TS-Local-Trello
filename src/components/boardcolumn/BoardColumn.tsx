import React, {useState} from "react";
import {ColumnsContainer, ColumnNameInput, ColumnBorder, ColumnNameDiv, ColumnAddCardDiv, ButtonDiv} from "./styles";
import {Card, ColumnsContent} from "../columnsContent";
import {ColumnCard} from "../columncard";

interface Props {
  name: string;
}

export const BoardColumn: React.FC<Props> = (props) => {

  const column: ColumnsContent = JSON.parse(localStorage.getItem(props.name) as string);

  const cards = Array(column.cards.length);
  column.cards.forEach((value, i) => {
    cards[i] = <ColumnCard key={i} index={i} saveCardState={saveCardChanges} card={value}/>
  });

  const [colCards, setCards] = useState(cards);
  const [name, setName] = useState(column.name);
  const [nameInputState, setNameInputState] = useState(false);
  const [newCardState, setNewCardState] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [cardInput, setCardInput] = useState("");

  function saveName(name: string): void {
    column.name = name;
    setName(column.name);
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  function saveNewCard(): void {
    const card = {name: cardInput, author: localStorage.getItem("user"), comments: [], desc: ""} as Card;
    column.cards.push(card);
    setCards(prevState => {
      return prevState.concat(<ColumnCard index={colCards.length} saveCardState={saveCardChanges} card={card}
                                          key={colCards.length}/>);
    });
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  function saveCardChanges(card: Card, index: number): void {
    column.cards[index] = card;
    setCards(prevState => {
      prevState[index] = <ColumnCard index={index} saveCardState={saveCardChanges} card={card} key={index}/>
      return prevState;
    });
    localStorage.setItem(props.name, JSON.stringify(column));
  }

  return (<ColumnsContainer>
      <ColumnBorder>
        <ColumnNameDiv style={{display: nameInputState ? 'none' : 'block'}}
                       onClick={event => {
                         setNameInputState(prevState => !prevState);
                       }}>{name}</ColumnNameDiv>
        <ColumnNameInput style={{display: nameInputState ? 'block' : 'none'}} value={nameInput} type="text"
                         onMouseOver={event => {
                           event.currentTarget.focus();
                         }}
                         onChange={event => {
                           setNameInput(event.target.value);
                           saveName(event.target.value);
                         }}
                         onBlur={event => {
                           setNameInputState(prevState => !prevState);
                           setNameInput("");
                         }}
        />
        {colCards}
        <ColumnAddCardDiv style={{display: newCardState ? 'none' : 'block'}}
                          onClick={event => {
                            setNewCardState(prevState => !prevState);
                          }}>
          Add new card
        </ColumnAddCardDiv>
        <ColumnNameInput onMouseOver={event => {
          event.currentTarget.focus();
        }} style={{display: newCardState ? 'block' : 'none'}} value={cardInput} onChange={event => {
          setCardInput(event.target.value);
        }} placeholder="Add new card"/>
        <ButtonDiv>
          <button style={{display: newCardState ? 'block' : 'none'}} className="btn primary" onClick={event => {
            if (cardInput === "") return;
            saveNewCard();
            setCardInput("");
            setNewCardState(prevState => !prevState);
          }}>
            Add card
          </button>
          <button style={{display: newCardState ? 'block' : 'none'}} className="btn" onClick={event => {
            setNewCardState(prevState => !prevState);
          }}>
            Cancel
          </button>
        </ButtonDiv>
      </ColumnBorder>
    </ColumnsContainer>
  )
}