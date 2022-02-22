<template>
    <main class="w-full h-full bg-background flex laptop:gap-6 laptop:p-6 desktop:gap-6 desktop:p-6 desktop:pt-4 laptop:pt-2">
        <WindowControls class="absolute right-3 top-0 w-title-bar "/> 
        <div class="flex flex-col flex-grow pt-4 gap-6">
          <SearchBar class="self-end"/>
          <AddNewStudentPage/>
          <div v-if="!hide_counter" class="desktop:h-32 laptop:h-24 flex desktop:gap-x-6 laptop:gap-x-6">
            <BookCounter title="Number of Unreturned Books" :count="187" class="flex-grow"/>
            <div class="bg-secondary cursor-pointer desktop:w-32 laptop:w-24 h-full rounded-lgg"></div>
          </div>
        </div>
      <div class="flex flex-col gap-10 pt-20">
        <div class="rounded-lgg px-10 flex items-center gap-5 flex-col h-1/4">
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
        <div class="bg-secondary desktop:w-72 laptop:w-60 p-4 rounded-lgg flex-grow overflow-hidden">
          <h1 class="text-2xl text-center font-bold">Due Books</h1>
          <DueBooks />
        </div>
      </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'

import MainViewButton from './MainViewButton'
import SearchBar from './SearchBar'
import AddNewStudentPage from './AddNewStudentPage.vue'
import DueBooks from './DueBooks.vue'
import WindowControls from './WindowControls.vue'

import BookCounter from './BookCounter'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import CommentQuoteOutlineIcon from 'vue-material-design-icons/CommentQuoteOutline.vue'
import InformationIcon from 'vue-material-design-icons/Information.vue'


const hide_counter = ref(false)
const styled_button = ref("text-primary animate-pulse")
</script>
