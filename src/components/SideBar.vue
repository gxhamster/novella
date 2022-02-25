<template>
  <div class="bg-primary desktop:w-128 laptop:w-100 h-screen flex flex-col justify-around items-center py-7">
    <SchoolLogo class="laptop:px-4"/>
    <div class="flex flex-col my-2 items-center w-full justify-center gap-8" >
      <div class="w-48" v-for="(name, index) in button_names" :key="name.id">
        <router-link :to="route_names[index]">
        <SidebarButtons :title="name" @clicked="btnClicked(index)" :isActive="current_active_btn_index == index ? true : false">
          <template v-slot="{ isHovered, isActive }">
            <component :is="icon_names[index]" :key="name.id" class="text-white cursor-pointer rounded-full p-1 transition duration-200" :class="isHovered || isActive ? 'bg-white text-primary' : ''"/>
          </template>
        </SidebarButtons>
      </router-link>
      </div>
    </div>
    <NovellaLogo />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import SchoolLogo from './SchoolLogo.vue'
import SidebarButtons from './SidebarButtons'
import NovellaLogo from './NovellaLogo'

import BookArrowRightOutlineIcon from 'vue-material-design-icons/BookArrowRightOutline.vue'
import BookArrowLeftOutlineIcon from 'vue-material-design-icons/BookArrowLeftOutline.vue'
import BookPlusOutlineIcon from 'vue-material-design-icons/BookPlusOutline.vue'
import AccountMultiplePlusOutlineIcon from 'vue-material-design-icons/AccountMultiplePlusOutline.vue'
import HistoryIcon from 'vue-material-design-icons/History.vue'
import ViewDashboardOutlineIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'

import { routes } from '../router'

const current_active_btn_index = ref(null)
const btnClicked = (index) => {
    current_active_btn_index.value = index
}
const icon_names = [BookArrowRightOutlineIcon, BookArrowLeftOutlineIcon, BookPlusOutlineIcon, AccountMultiplePlusOutlineIcon, HistoryIcon, ViewDashboardOutlineIcon]
const button_names = ref(["Issue Book", "Recieve Book", "Add New Book", "Add New Student", "History", "Dashboard"])
const route_names =  ref(routes.filter((item) => item.path !== '/').map((item) => item.path))
</script>

<style>
.sidebar {
  width: 1000px
}
</style>
