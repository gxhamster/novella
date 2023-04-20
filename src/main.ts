import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import { router } from "./router";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";
import "./main.css";

createApp(App)
  .use(VCalendar)
  .use(router)
  .use(createPinia())
  .use(plugin, defaultConfig)
  .mount("#app");
