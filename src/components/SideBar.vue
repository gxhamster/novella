<template>
  <div @mouseleave="setFocus(false)" @mouseover="setFocus(true)" @click="setFocus" class="bg-primary desktop:w-128 laptop:w-100 h-screen  justify-start flex flex-col items-center py-7">
    <SchoolLogo class="w-full desktop:px-8 laptop:px-8"/>
    <div class="flex flex-col my-2 items-center w-full justify-center gap-5 desktop:mt-12 laptop:mt-10 px-2" >
      <div class="w-full" v-for="(name, index) in button_names" :key="index">
        <SidebarButtons :title="name" @clicked="btnClicked(index)" :isActive="current_active_btn_index == index ? true : false">
          <component :size="10" :is="icon_names[index]" :key="name.id" />
        </SidebarButtons>
      </div>
    </div>
    <div class="flex-grow flex-col flex justify-end">
      <NovellaLogo />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import SchoolLogo from './SchoolLogo.vue'
import SidebarButtons from './SidebarButtons'
import NovellaLogo from './NovellaLogo'
import AddNewBookIcon from './icons/AddNewBookIcon'
import AddNewStudentIcon from './icons/AddNewStudentIcon'
import DashboardIcon from './icons/DashboardIcon'
import HistoryIcon from './icons/HistoryIcon'
import IssueBookIcon from './icons/IssueBookIcon'
import ReturnBookIcon from './icons/ReturnBookIcon'

import { routes } from '../router'

const router = useRouter()
const sidebar_focused = ref(false)
const current_active_btn_index = ref(0)
const icon_names = [IssueBookIcon, ReturnBookIcon, AddNewBookIcon, AddNewStudentIcon, HistoryIcon, DashboardIcon]
const button_names = ref(["Issue Book", "Receive Book", "Add New Book", "Add New Student", "History", "Dashboard"])
const route_names =  ref(routes.filter((item) => item.path !== '/').map((item) => item.path))

window.onkeyup = (event) => {
  event.preventDefault()
  if (event.key === "ArrowUp") {
    navigateSidebar(false)
  } else if (event.key === "ArrowDown") {
    navigateSidebar()
  } else if (event.key === "Enter") {
    changeRoute()
  }
}

function wrap(value, lower, upper) {
  if (value > upper) {
    value = lower
  } else if (value < lower) {
    value = upper
  }

  return value
}

function setFocus(focus = true) {
  sidebar_focused.value = focus
}

function btnClicked(index) {
  current_active_btn_index.value = index
  changeRoute()
}

function changeRoute() {
  if (router.currentRoute.value.path !== route_names.value[current_active_btn_index.value]) {
    router.replace(route_names.value[current_active_btn_index.value])
  }
}

function navigateSidebar(down = true) {
  if (sidebar_focused.value) {
    if (down)
      current_active_btn_index.value = wrap(current_active_btn_index.value + 1, 0, button_names.value.length - 1)
    else {
      current_active_btn_index.value = wrap(current_active_btn_index.value - 1, 0, button_names.value.length - 1)
    }
  }
}
</script>

<style>
.sidebar {
  width: 1000px
}
</style>
