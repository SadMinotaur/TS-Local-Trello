import React from "react";
import { ColumnsContainer } from "./styles";
import { BoardColumn } from "../Boardcolumn";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/state-reducers";

export const Board: React.FC = () => {
  const boardState = useSelector((store: RootState) => store.columnsArray);

  return (
    <ColumnsContainer>
      {boardState.map(({ id }) => (
        <BoardColumn key={id} id={id} />
      ))}
    </ColumnsContainer>
  );
};
