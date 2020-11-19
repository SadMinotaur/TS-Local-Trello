import React from "react";
import { ColumnsContainer } from "./styles";
import { BoardColumn } from "../Boardcolumn";

export const Board: React.FC = () => {
  // const context = useStateValue();

  return (
    <ColumnsContainer>
      {/* {context.state.columns.map(({ id }) => (
        <BoardColumn key={id} id={id} />
      ))} */}
    </ColumnsContainer>
  );
};
