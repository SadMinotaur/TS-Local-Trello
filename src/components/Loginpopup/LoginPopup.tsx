import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../utils/global-types";
import {
  RootState,
  userArraySlice,
  userIdSlice,
} from "../../utils/state-reducers";
import { StoreDispatchType } from "../../utils/store";
import { Popup } from "../Popup";
import { PopupContent } from "./styles";

export const LoginPopup: React.FC = () => {
  const [inputState, changeInputState] = useState("");
  const users: User[] = useSelector((store: RootState) => store.usersArray);

  const dispatch: StoreDispatchType = useDispatch();

  function changeDisplayState(): void {
    if (inputState.trim() === "") return;
    dispatch(userIdSlice.actions.changeUserId(users.length));
    dispatch(
      userArraySlice.actions.userArrayAdd({
        id: users.length,
        name: inputState,
      })
    );
  }

  return (
    <Popup height={"180px"} width={"350px"}>
      <PopupContent
        onKeyDown={(e) => {
          if (e.key === "Enter") changeDisplayState();
        }}
      >
        <div>
          <h3>Hi!</h3>
          <p>Enter your name</p>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Name"
            value={inputState}
            onChange={(e) => changeInputState(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button onClick={changeDisplayState} className="btn primary">
            Done
          </button>
        </div>
      </PopupContent>
    </Popup>
  );
};
