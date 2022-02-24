import { createRouter, createWebHistory } from "vue-router"
import AddNewStudentPage from "./pages/AddNewStudentPage.vue"
import IssueBooksPage from "./pages/IssueBooksPage.vue"
import AddNewBook from "./pages/AddNewBook.vue"
import RecieveBook from "./pages/RecieveBook.vue"
import HistoryPage from "./pages/HistoryPage.vue"
import DashBoard from "./pages/DashBoard.vue"
const routes = [
  {
    path: "/",
    name: "Issue Books",
    component: IssueBooksPage,
  },
  {
    path: "/issue_book",
    name: "Issue Books",
    component: IssueBooksPage,
  },
  {
    path: "/add_student",
    name: "Add Student",
    component: AddNewStudentPage,
  },
  {
    path: "/add_book",
    name: "Add Book",
    component: AddNewBook
  },
  {
    path: "/recieve_book",
    name: "Recieve Book",
    component: RecieveBook
  },
  {
    path: "/history",
    name: "History",
    component: HistoryPage
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoard
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
