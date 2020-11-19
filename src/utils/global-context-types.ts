export interface AState {
  userId: number;
  userArray: User[];
  columns: Column[];
  cards: Card[];
  comments: Comm[];
  popup: Popup;
}

export interface Column {
  id: number;
  name: string;
}

export interface Card {
  id: number;
  name: string;
  author: string;
  desc: string;
  idColumn: number;
}

export interface Comm {
  id: number;
  author: string;
  content: string;
  idCard: number;
}

export interface Popup {
  idCard: number;
  state: boolean;
}

export interface User {
  id: number;
  name: string;
}
