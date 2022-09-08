import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";
import "./main.css";

createApp(App).use(VCalendar).use(router).use(createPinia()).mount("#app");
