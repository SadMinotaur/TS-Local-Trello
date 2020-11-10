import React from "react";
import { Comments } from "./columns-content";

interface PopupContext {
  name: string;
  desc: string;
  comments: Comments[];
  author: string;
}

export const PopupCardContext = React.createContext<PopupContext>({} as PopupContext);