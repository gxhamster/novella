<template>
    <main class="w-full h-full bg-background flex laptop:gap-6 laptop:p-6 desktop:gap-6 desktop:p-6 desktop:pt-4 laptop:pt-2">
        <WindowControls class="absolute right-3 top-0 w-title-bar "/>
        <div class="flex flex-col flex-grow pt-4 gap-6 relative">
          <SearchBar class="self-end"/>
          <router-view class="custom-shadow"/>
          <Transition name="slide">
            <div v-show="!hide_counter" class="desktop:h-32 laptop:h-24 flex desktop:gap-x-6 laptop:gap-x-6">
              <BookCounter :icon="BookIcon" :active="bookCounter[0]" title="Number of Due Books" @clicked="bookHandler" :count="duestore.dues.length"/>
              <BookCounter :icon="AccountGroupIcon" :active="bookCounter[1]" title="Number of Students" @clicked="bookHandler" :count="userstore.users.length"/>
            </div>
          </Transition>
        </div>
      <div class="flex flex-col gap-10 pt-20">
        <div class="rounded-lgg px-10 flex items-center gap-5 flex-col h-1/5">
          <div v-for="btn in main_view_buttons" :key="btn.name">
            <MainViewButton class="text-1xl" :title="btn.name">
              <template v-slot="{isActive}">
                <component :is="btn.icon" class="cursor-pointer rounded-full p-1 transition duration-150" :class="isActive ? styled_button : 'text-primary'"/>
              </template>
            </MainViewButton>
          </div>
        </div>
        <div class="bg-secondary desktop:w-80 laptop:w-60 p-4 rounded-lgg h-full custom-shadow overflow-hidden">
          <h1 class="text-2xl text-center font-bold">Due Books</h1>
          <DueBooks />
        </div>
      </div>
    </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import MainViewButton from './MainViewButton'
import SearchBar from './SearchBar'
import DueBooks from './DueBooks'
import WindowControls from './WindowControls'
import BookCounter from './BookCounter'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import CommentQuoteOutlineIcon from 'vue-material-design-icons/CommentQuoteOutline.vue'
import InformationIcon from 'vue-material-design-icons/Information.vue'
import BookIcon from 'vue-material-design-icons/Book.vue'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import { dueStore } from '@/stores/store'
import { userStore } from '@/stores/store'

const router = useRouter()
const duestore = dueStore()
const userstore = userStore()
const main_view_buttons = [
  {name: 'Settings', icon: CogIcon},
  {name: 'Feedback', icon: InformationIcon},
  {name: 'About us', icon: CommentQuoteOutlineIcon}
]
const hide_counter_routes = [
  {route: '/issue_book', on_max: false},
  {route: '/', on_max: false},
  {route: '/add_book', on_max: true}
]
const bookCounter = ref([true, false])
const maximized = ref(false)
const current_route = ref('')
const hide_counter = ref(false)

const bookHandler = () => {
  bookCounter.value[0] = !bookCounter.value[0]
  bookCounter.value[1] = !bookCounter.value[1]
}

window.api.handleMax((event, arg) => {
    maximized.value = arg
})


const should_route_max = (path) => hide_counter_routes.filter((v) => path === v.route).length !== 0

const should_hide_when_maximized = () => hide_counter_routes.filter((v) => v.route === current_route.value ).filter(v => v.on_max).length

// When route changed
router.afterEach((to) => {
  const to_path = to.path
  current_route.value = to_path
})

watch(current_route, (new_route) => {
  const r = should_route_max(new_route)
  if (r) {
      if (maximized.value && should_hide_when_maximized()) {
        hide_counter.value = true
      } else if (maximized.value && !should_hide_when_maximized()) {
        hide_counter.value = false
      } else {
        hide_counter.value = true
      }
  } else {
    hide_counter.value = false
  }
})

watch(maximized, (n) => {
  // Check if the route should have counter on maximize
  const hide_max = should_hide_when_maximized()
  const hide_normal = should_route_max(current_route.value)
  if (n) {
    if (!hide_max) {
      hide_counter.value = false
    } else {
      hide_counter.value = true
    }
  } else {
    if (!hide_normal) {
      hide_counter.value = false
    } else {
      hide_counter.value = true
    }
  }

})

const styled_button = ref("text-primary animate-pulse")
</script>

<style scoped>
.slide-enter-active {
  transition: opacity 0.3s ease;
}
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  bottom: 0;
  width: 100%;
  transform: translateY(-10px);
}
.slide-leave-to {
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  transform: translateY(80px);
}
</style>
