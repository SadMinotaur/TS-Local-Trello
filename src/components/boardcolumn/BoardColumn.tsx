import React, {useState} from "react";
import {ColumnsContainer, ColumnNameInput, ColumnBorder} from "./Styles";
import {ColumnsContent} from "../columnsContent";

interface Props {
  name: string;
}

export const BoardColumn: React.FC<Props> = (props) => {

  const [name, setName] = useState("");
  const columnFromStorage = localStorage.getItem(props.name);

  if (columnFromStorage == null)
    return null;

  let column: ColumnsContent = JSON.parse(columnFromStorage);

  function saveName(name: string) {
    column.name = name;
    setName(column.name);
    localStorage.setItem(props.name, JSON.stringify(column))
  }

  return (<ColumnsContainer>
      <ColumnBorder>
        <ColumnNameInput type="text" placeholder={name == "" ? column.name : name} onBlur={event => {
          event.target.value = '';
        }} onChange={event => {
          saveName(event.target.value);
        }}/>
        {/*{renderCards}*/}
        <button className="btn primary">
          Add card
        </button>
      </ColumnBorder>
    </ColumnsContainer>
  )
}