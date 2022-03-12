import { createRouter, createWebHashHistory } from "vue-router";
import AddNewStudentPage from "./pages/AddNewStudentPage.vue";
import IssueBooksPage from "./pages/IssueBooksPage.vue";
import AddNewBook from "./pages/AddNewBook.vue";
import RecieveBook from "./pages/RecieveBook.vue";
import HistoryPage from "./pages/HistoryPage.vue";
import DashBoard from "./pages/DashBoard.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import AboutPage from "./pages/AboutPage.vue";
import FeedbackPage from "./pages/FeedbackPage.vue";

const routes = [
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
    component: AddNewBook,
  },
  {
    path: "/add_student",
    name: "Add Student",
    component: AddNewStudentPage,
  },
  {
    path: "/history",
    name: "History",
    component: HistoryPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoard,
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
