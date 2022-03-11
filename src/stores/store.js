import { defineStore } from "pinia";

export const dueStore = defineStore("duebooks", {
  state: () => {
    return {
      dues: new Array(),
      data_fetched: false,
    };
  },
  actions: {
    setDues(newDues) {
      this.dues = newDues;
    },
    setDataFetched(v) {
      this.data_fetched = v;
    },
  },
});

export const userStore = defineStore("users", {
  state: () => {
    return {
      users: new Array(),
      data_fetched: false,
    };
  },
  actions: {
    setUsers(newUsers) {
      this.users = newUsers;
    },
    setDataFetched(v) {
      this.data_fetched = v;
    },
  },
});

export const bookStore = defineStore("books", {
  state: () => {
    return {
      books: new Array(),
      data_fetched: false,
    };
  },
  actions: {
    setBooks(newBooks) {
      this.books = newBooks;
    },
    setDataFetched(v) {
      this.data_fetched = v;
    },
  },
});
