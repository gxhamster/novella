import { defineStore } from "pinia";
import {
  DueBook,
  DueBookState,
  ReceiveBook,
  ReceiveBookState,
  Book,
  BooksState,
  Student,
  StudentsState,
} from "./types";

export const dueStore = defineStore("duebooks", {
  state: () => {
    return {
      dues: new Array(),
      data_fetched: false,
    } as DueBookState;
  },
  actions: {
    setDues(newDues: DueBook[]) {
      this.dues = newDues;
    },
    setDataFetched(value: boolean) {
      this.data_fetched = value;
    },
  },
});

export const receiveStore = defineStore("received", {
  state: () => {
    return {
      received: new Array(),
      data_fetched: false,
    } as ReceiveBookState;
  },
  actions: {
    setReceived(newBooks: ReceiveBook[]) {
      this.received = newBooks;
    },
    setDataFetched(value: boolean) {
      this.data_fetched = value;
    },
  },
});

export const userStore = defineStore("users", {
  state: () => {
    return {
      users: new Array(),
      data_fetched: false,
    } as StudentsState;
  },
  actions: {
    setUsers(newUsers: Student[]) {
      this.users = newUsers;
    },
    setDataFetched(value: boolean) {
      this.data_fetched = value;
    },
  },
});

export const bookStore = defineStore("books", {
  state: () => {
    return {
      books: new Array(),
      data_fetched: false,
    } as BooksState;
  },
  actions: {
    setBooks(newBooks: Book[]) {
      this.books = newBooks;
    },
    setDataFetched(value: boolean) {
      this.data_fetched = value;
    },
  },
});
