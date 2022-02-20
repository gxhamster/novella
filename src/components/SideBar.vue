<template>
  <div class="bg-primary desktop:w-128 laptop:w-100 h-screen flex flex-col justify-around items-center py-7">
    <SchoolLogo class="laptop:px-6"/>
    <div class="flex flex-col my-2 items-center w-full justify-center gap-8" >
      <div class="w-48" v-for="(name, index) in button_names" :key="name.id">
        <SidebarButtons :title="name">
          <template v-slot="{ isActive }">
            <component :is="icon_names[index]" :key="name.id" class="text-white cursor-pointer rounded-full p-1 transition duration-200" :class="isActive ? 'bg-white text-primary' : ''"/>
          </template>
        </SidebarButtons>
      </div>
    </div>
    <NovellaLogo/>
  </div>
</template>

<script>
import SchoolLogo from './SchoolLogo.vue'
import SidebarButtons from './SidebarButtons'
import NovellaLogo from './NovellaLogo'

import BookArrowRightOutlineIcon from 'vue-material-design-icons/BookArrowRightOutline.vue'
import BookArrowLeftOutlineIcon from 'vue-material-design-icons/BookArrowLeftOutline.vue'
import BookPlusOutlineIcon from 'vue-material-design-icons/BookPlusOutline.vue'
import AccountMultiplePlusOutlineIcon from 'vue-material-design-icons/AccountMultiplePlusOutline.vue'
import HistoryIcon from 'vue-material-design-icons/History.vue'
import ViewDashboardOutlineIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'

export default {
  name: "SideBar",
  data() {
    return {
      icon_names: ["book-arrow-right-outline-icon", "book-arrow-left-outline-icon", "book-plus-outline-icon", "account-multiple-plus-outline-icon", "history-icon", "view-dashboard-outline-icon"],
      button_names: ["Issue Book", "Recieve Book", "Add New Book", "Add New Student", "History", "Dashboard"]
    }
  },
  components: {
    SchoolLogo,
    SidebarButtons,
    NovellaLogo,
    BookArrowRightOutlineIcon,
    BookArrowLeftOutlineIcon,
    BookPlusOutlineIcon,
    AccountMultiplePlusOutlineIcon,
    HistoryIcon,
    ViewDashboardOutlineIcon
  }
}
</script>

<style>
.sidebar {
  width: 1000px
}
</style>
