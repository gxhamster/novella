<template>
    <main class="w-full h-full bg-background flex laptop:gap-6 laptop:p-6 desktop:gap-6 desktop:p-6 desktop:pt-4 laptop:pt-2">
        <WindowControls class="absolute right-3 top-0 w-title-bar "/>
        <div class="flex flex-col flex-grow pt-4 gap-6">
          <SearchBar class="self-end"/>
          <router-view class="custom-shadow"/>
          <div v-show="!hide_counter" class=" desktop:h-32 laptop:h-24 flex desktop:gap-x-6 laptop:gap-x-6">
            <BookCounter title="Number of Due Books" :count="counter_value" class="custom-shadow flex-grow"/>
            <div class="custom-shadow bg-secondary cursor-pointer desktop:w-32 laptop:w-24 h-full rounded-lgg"></div>
          </div>
        </div>
      <div class="flex flex-col gap-10 pt-20">
        <div class="rounded-lgg px-10 flex items-center gap-5 flex-col h-1/5">
          <MainViewButton class="text-1xl" title="Settings">
            <template v-slot="{isActive}">
              <cog-icon :key="1" class="cursor-pointer rounded-full p-1 transition duration-150" :class="isActive ? styled_button : 'text-primary'"/>
            </template>
          </MainViewButton>
          <MainViewButton class="text-1xl" title="Feedback">
            <template v-slot="{isActive}">
              <comment-quote-outline-icon class="cursor-pointer rounded-full p-1 transition duration-150" :class="isActive ? styled_button : 'text-primary'"/>
            </template>
          </MainViewButton>
          <MainViewButton class="text-1xl" title="About us">
            <template v-slot="{isActive}">
              <information-icon class="cursor-pointer rounded-full p-1 transition duration-150" :class="isActive ?  styled_button : 'text-primary'"/>
            </template>
          </MainViewButton>
        </div>
        <div class="bg-secondary desktop:w-80 laptop:w-60 p-4 rounded-lgg flex-grow custom-shadow overflow-hidden">
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
import DueBooks from './DueBooks.vue'
import WindowControls from './WindowControls.vue'

import BookCounter from './BookCounter'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import CommentQuoteOutlineIcon from 'vue-material-design-icons/CommentQuoteOutline.vue'
import InformationIcon from 'vue-material-design-icons/Information.vue'
import { dueStore } from '@/stores/store'

const router = useRouter()
const duestore = dueStore()
const maximized = ref(false)
const counter_value = ref(0)
const current_route = ref('')
const hide_counter = ref(false)
const hide_counter_routes = [
  {route: '/issue_book', on_max: false},
  {route: '/', on_max: false},
  {route: '/add_book', on_max: true}
]

window.api.handleMax((event, arg) => {
    maximized.value = arg
})


const should_route_max = (path) => {
  return hide_counter_routes.filter((v) => path === v.route).length !== 0
}
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
  const hide = should_hide_when_maximized()
  if (n && !hide)
    hide_counter.value = false
  else
    hide_counter.value = true
})

// Get counter value
duestore.$onAction(({name, after}) => {
  // When data has been fetched add those to searcable results
    after(() => {
      if (name === "setDataFetched") {
        if (duestore.data_fetched)
          counter_value.value = duestore.dues.length
      }
    })
}, true)

const styled_button = ref("text-primary animate-pulse")
</script>
