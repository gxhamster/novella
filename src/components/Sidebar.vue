<template>
  <div class="bg-primary w-128 h-screen flex flex-col justify-around items-center py-7">
    <Logo/>
    <div class="flex flex-col my-2 items-center w-full justify-center gap-8" >
      <div class="w-48" v-for="(name, index) in button_names" :key="name.id">
        <SidebarButtons :title="name">
          <component :is="icon_names[index]" :key="name.id" class="text-white rounded-full p-1 hover:bg-white hover:text-primary transition duration-150"/>
        </SidebarButtons>
      </div>
    </div>
    <NovellaLogo/>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarButtons from './SidebarButtons'
import NovellaLogo from './NovellaLogo'
import BookArrowRightOutlineIcon from 'vue-material-design-icons/BookArrowRightOutline.vue'
import BookArrowLeftOutlineIcon from 'vue-material-design-icons/BookArrowLeftOutline.vue'
import BookPlusOutlineIcon from 'vue-material-design-icons/BookPlusOutline.vue'
import AccountMultiplePlusOutlineIcon from 'vue-material-design-icons/AccountMultiplePlusOutline.vue'
import HistoryIcon from 'vue-material-design-icons/History.vue'
import ViewDashboardOutlineIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'

export default {
  name: "Sidebar",
  data() {
    return {
      icon_names: ["book-arrow-right-outline-icon", "book-arrow-left-outline-icon", "book-plus-outline-icon", "account-multiple-plus-outline-icon", "history-icon", "view-dashboard-outline-icon"],
      button_names: ["Issue Book", "Recieve Book", "Add New Book", "Add New Student", "History", "Dashboard"]
    }
  },
  components: {
    Logo,
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
