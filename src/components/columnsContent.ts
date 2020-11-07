export interface ColumnsContent {
  name: string;
  cards: Card[];
}

export interface Card {
  id: number;
  name: string;
  author: string;
  desc: string;
  comments: Comments[]
}

export interface Comments {
  id: number;
  author: string;
  content: string;
}