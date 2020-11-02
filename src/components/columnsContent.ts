export interface ColumnsContent {
  name : string;
  cards: Card[];
}

export interface Card {
  name: string;
  author: string;
  desc: string;
  comments: Comments[]
}

export interface Comments {
  author: string;
  content: string;
}