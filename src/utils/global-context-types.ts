export interface GState {
  user: string;
  columns: Column[];
}

export interface Column {
  id: number;
  name: string;
}

export interface Card {
  id: number;
  name: string;
  idColumn: string;
}

export interface Comm {
  id: number;
  author: string;
  content: string;
  idCard: number;
}