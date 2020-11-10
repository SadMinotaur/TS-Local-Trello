import React from "react";
import { Comments } from "./columns-content";

interface PopupContext {
  name: string;
  desc: string;
  comments: Comments[];
  author: string;
  changeCardName: (v: string) => void;
  changeCardDesc: (v: string) => void;
  setCardsComments: (comms: Comments[]) => void;
}

export const PopupCardContext = React.createContext<PopupContext>({} as PopupContext);