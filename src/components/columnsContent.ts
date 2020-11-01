export interface ColumnsContent {
  name : string;
  content: Cards[];
}

interface Cards {
  name: string;
  author: string;
  comments: Comments[]
}

interface Comments {
  author: string;
  content: string;
}