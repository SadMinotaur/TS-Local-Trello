import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { userIdSlice } from "../../utils/state-reducers";
import { StoreDispatchType } from "../../utils/store";
import { HeaderBackground, LogoutButton } from "./styles";

export const Header: React.FC = () => {
  const dispatch: StoreDispatchType = useDispatch();

  function onLogoutClick(): void {
    dispatch(userIdSlice.actions.changeUserId(-1));
  }

  return (
    <HeaderBackground>
      <h6>Trello</h6>
      <LogoutButton onClick={onLogoutClick}>
        Logout <FontAwesomeIcon icon={faTimes} />
      </LogoutButton>
    </HeaderBackground>
  );
};
