<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { app } from "./utils/firebase";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
} from "@firebase/firestore";
import { router } from "./router";

const firestoreDB = getFirestore(app);
router.beforeEach((to) => {
  console.log(
    "----- Router Navigation Guard ------",
    to,
    "User: ",
    getAuth().currentUser
  );
  if (getAuth().currentUser === null && to.meta.requireAuth) {
    return { name: "Login" };
  }
});
connectFirestoreEmulator(firestoreDB, "localhost", 8081);
connectAuthEmulator(getAuth(), "http://localhost:9099");

enableIndexedDbPersistence(firestoreDB).catch((err) => {
  if (err.code == "failed-precondition") {
    console.error("Cannot enable offline mode");
  } else if (err.code == "unimplemented") {
    console.error("Browser does not support offline mode");
  }
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
