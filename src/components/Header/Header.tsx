import React from 'react';
import { Topbar, TopbarName } from "./styles";

export const Header: React.FC = () => {
  return (
    <Topbar className='topbar'>
      <TopbarName>
        <h6>
          Trello
        </h6>
      </TopbarName>
    </Topbar>
  );
}