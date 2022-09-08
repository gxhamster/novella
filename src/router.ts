import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AddNewStudentPage from "./pages/AddNewStudentPage.vue";
import IssueBooksPage from "./pages/IssueBooksPage.vue";
import AddNewBookPage from "./pages/AddNewBookPage.vue";
import RecieveBook from "./pages/RecieveBook.vue";
import DirectoryPage from "./pages/DirectoryPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import FeedbackPage from "./pages/FeedbackPage.vue";
import HistoryPage from "./pages/HistoryPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home Page",
    component: IssueBooksPage,
  },
  {
    path: "/issue_book",
    name: "Issue Books",
    component: IssueBooksPage,
  },
  {
    path: "/recieve_book",
    name: "Recieve Book",
    component: RecieveBook,
  },
  {
    path: "/add_book",
    name: "Add Book",
    component: AddNewBookPage,
  },
  {
    path: "/add_student",
    name: "Add Student",
    component: AddNewStudentPage,
  },
  {
    path: "/directory",
    name: "Directory",
    component: DirectoryPage,
  },
  {
    path: "/history",
    name: "History",
    component: HistoryPage,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsPage,
  },
  {
    path: "/about",
    name: "About us",
    component: AboutPage,
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: FeedbackPage,
  },
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
export { router, routes };
