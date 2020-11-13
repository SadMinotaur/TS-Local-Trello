export interface AState {
  user: string;
  columns: Column[];
  cards: Card[];
  comments: Comm[];
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