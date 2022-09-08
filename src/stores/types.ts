export interface DueBook {
  name: string;
  index: number;
  grade: string;
  book_name: string;
  book_id: string;
  author: string;
  days: number;
  issue_date: { nanoseconds: number; seconds: number };
  due_date: { nanoseconds: number; seconds: number };
}

export interface DueBookState {
  dues: DueBook[];
  data_fetched: boolean;
}

export interface ReceiveBook {
  name: string;
  index: number;
  grade: string;
  book_name: string;
  book_id: string;
  author: string;
  days: number;
  issue_date: { nanoseconds: number; seconds: number };
  issue_date_formatted: string;
  due_date: { nanoseconds: number; seconds: number };
  receive_date: Date;
}

export interface ReceiveBookState {
  received: ReceiveBook[];
  data_fetched: boolean;
}

export interface Student {
  index: string | number;
  name: string;
  grade: string;
  address: string;
  island: string;
  number: number | string;
}

export interface StudentsState {
  users: Student[];
  data_fetched: boolean;
}

export interface Book {
  title: string;
  bnumber: string;
  ddc: string;
  author: string;
  isbn: number | string;
  publisher: string;
  subject: string;
  pages: number | string;
  year: number | string;
}

export interface BooksState {
  books: Book[];
  data_fetched: boolean;
}
