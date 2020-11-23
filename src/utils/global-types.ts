export interface Column {
  key: number;
  name: string;
}

export interface Card {
  key: number;
  name: string;
  desc: string;
  authorId: number;
  columnId: number;
}

export interface Comm {
  key: number;
  authorId: number;
  content: string;
  cardId: number;
}

export interface User {
  key: number;
  name: string;
}
