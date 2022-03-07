<template>
  <div class="bg-primary desktop:w-128 laptop:w-100 h-screen  justify-start flex flex-col items-center py-7">
    <SchoolLogo class="w-full desktop:px-8 laptop:px-8"/>
    <div class="flex flex-col my-2 items-center w-full justify-center gap-5 desktop:mt-12 laptop:mt-10 px-2" >
      <div class="w-full" v-for="(name, index) in button_names" :key="name.id">
        <router-link :to="route_names[index]">
        <SidebarButtons :title="name" @clicked="btnClicked(index)" :isActive="current_active_btn_index == index ? true : false">
          <component :size="10" :is="icon_names[index]" :key="name.id" />
        </SidebarButtons>
      </router-link>
      </div>
    </div>
    <div class="flex-grow flex-col flex justify-end">
      <NovellaLogo />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import SchoolLogo from './SchoolLogo.vue'
import SidebarButtons from './SidebarButtons'
import NovellaLogo from './NovellaLogo'
import  AddNewBookIcon from './icons/AddNewBookIcon'
import  AddNewStudentIcon from './icons/AddNewStudentIcon'
import  DashboardIcon from './icons/DashboardIcon'
import  HistoryIcon from './icons/HistoryIcon'
import  IssueBookIcon from './icons/IssueBookIcon'
import  ReturnBookIcon from './icons/ReturnBookIcon'

import { routes } from '../router'

const current_active_btn_index = ref(0)
const btnClicked = (index) => {
    current_active_btn_index.value = index
}
const icon_names = [IssueBookIcon, ReturnBookIcon, AddNewBookIcon, AddNewStudentIcon, HistoryIcon, DashboardIcon]
const button_names = ref(["Issue Book", "Receive Book", "Add New Book", "Add New Student", "History", "Dashboard"])
const route_names =  ref(routes.filter((item) => item.path !== '/').map((item) => item.path))
</script>

<style>
.sidebar {
  width: 1000px
}
</style>
