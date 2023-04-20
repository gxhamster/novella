<template>
  <div
    v-if="loggedIn"
    id="app"
    class="bg-transparent fixed flex h-screen min-h-screen w-screen"
  >
    <SideBar class="" />
    <MainView class="" />
  </div>
  <div v-else>
    <NovellaLoginPage />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SideBar from "./components/SideBar.vue";
import MainView from "./components/MainView.vue";
import NovellaLoginPage from "./pages/NovellaLoginPage.vue";
import { user } from "@/composables/auth";

const loggedIn = computed(() => user.value !== null);
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
