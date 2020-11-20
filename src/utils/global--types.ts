export interface Column {
  id: number;
  name: string;
}

export interface Card {
  id: number;
  name: string;
  desc: string;
  authorId: number;
  columnId: number;
}

export interface Comm {
  id: number;
  authorId: number;
  content: string;
  cardId: number;
}

export interface User {
  id: number;
  name: string;
}
