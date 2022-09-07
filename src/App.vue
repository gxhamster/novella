<template>
  <div
    id="app"
    class="bg-transparent fixed flex h-screen min-h-screen w-screen"
  >
    <SideBar class="" />
    <MainView class="" />
  </div>
</template>

<script setup>
/* eslint-disable */
import { onMounted, onUnmounted } from "vue";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
} from "firebase/firestore";

import SideBar from "./components/SideBar.vue";
import MainView from "./components/MainView";
import { userStore, bookStore, receiveStore } from "@/stores/store";
import { firebaseSetupSync } from "@/utils/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnDTnTUrz7c9enxvoTFm3Jr6sH0y_6hWU",
  authDomain: "novella-fe845.firebaseapp.com",
  projectId: "novella-fe845",
  storageBucket: "novella-fe845.appspot.com",
  messagingSenderId: "1049015315005",
  appId: "1:1049015315005:web:0662ef503b5e8ea8dd5854",
  measurementId: "G-M59MWQ314M",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
connectFirestoreEmulator(db, "localhost", 8081);

// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code == "failed-precondition") {
//     console.error("Cannot enable offline mode");
//   } else if (err.code == "unimplemented") {
//     console.error("Browser does not support offline mode");
//   }
// });

const userstore = userStore();
const bookstore = bookStore();
const receivestore = receiveStore();

onMounted(async () => {
  firebaseSetupSync(db, "books", bookstore, "setBooks");
  firebaseSetupSync(db, "students", userstore, "setUsers");
  firebaseSetupSync(db, "received", receivestore, "setReceived");
});

onUnmounted(() => {
  // Firebase realtime callbacks cleanup
});
</script>

<style scoped>
#app {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
