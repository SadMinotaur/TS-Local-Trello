import React from "react";
import { ColumnsContainer } from "./styles";
import { BoardColumn } from "../Boardcolumn";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/state-reducers";
import { Column } from "../../utils/global-types";

export const Board: React.FC = () => {
  const boardState: Column[] = useSelector(
    (store: RootState) => store.columnsArray
  );

  return (
    <ColumnsContainer>
      {boardState.map(({ key }) => (
        <BoardColumn key={key} objectKey={key} />
      ))}
    </ColumnsContainer>
  );
};
