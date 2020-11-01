export interface ColumnsContent {
  name : string;
  cards: Cards[];
}

export interface Cards {
  name: string;
  author: string;
  desc: string;
  comments: Comments[]
}

export interface Comments {
  author: string;
  content: string;
}