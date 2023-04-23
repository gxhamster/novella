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
import NovellaSignupPage from "./pages/NovellaSignupPage.vue";
import NovellaLoginPage from "./pages/NovellaLoginPage.vue";
import DashboardPage from "./pages/DashboardPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/signup",
    name: "Signup",
    component: NovellaSignupPage,
  },
  {
    path: "/login",
    name: "Login",
    component: NovellaLoginPage,
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Home Page",
    component: DashboardPage,
    children: [
      {
        path: "",
        name: "Issue Books",
        component: IssueBooksPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "recieve_book",
        name: "Recieve Book",
        component: RecieveBook,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "add_book",
        name: "Add Book",
        component: AddNewBookPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "add_student",
        name: "Add Student",
        component: AddNewStudentPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "directory",
        name: "Directory",
        component: DirectoryPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "history",
        name: "History",
        component: HistoryPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: SettingsPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "about",
        name: "About us",
        component: AboutPage,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "feedback",
        name: "Feedback",
        component: FeedbackPage,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
export { router, routes };
