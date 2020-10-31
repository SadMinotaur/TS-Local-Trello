import React, {useEffect} from 'react';
import {BoardColumn} from "../boardcolumn";
import {ColumnsContainer} from "./Styles";

interface Content {
  name: string;
  columns: Columns[];
}

interface Columns {
  name: string;
  cards: object[];
}

interface Props {
  boardContent: object;
}

export const Board: React.FC<Props> = (props) => {

  useEffect(() => {
    console.log("here2")
  })

  if (Object.keys(props.boardContent).length === 0) {
    return null;
  }

  const content: Content = (props.boardContent as Content);
  const columns = Array(content.columns.length);
  (props.boardContent as Content).columns.forEach((value, i) => {
    let v = value as Columns;
    columns[i] = <BoardColumn key={i} name={v.name} cardsContent={v.cards}/>;
  });

  return (<ColumnsContainer>
    {columns}
  </ColumnsContainer>)
}