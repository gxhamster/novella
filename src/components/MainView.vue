<template>
    <main class="w-full h-full bg-background flex laptop:gap-10 laptop:p-10 desktop:gap-12 desktop:p-12 desktop:pt-4 laptop:pt-2">
        <div class="flex flex-col flex-grow pt-4 gap-4">
          <SearchBar class="self-end"/>
          <AddNewStudentPage/>
          <div v-if="!hide_counter" class="desktop:h-32 laptop:h-24 mt-6 flex desktop:gap-x-10 laptop:gap-x-8">
            <BookCounter title="Number of Unreturned Books" count="187" class="flex-grow"/>
            <div class="bg-secondary cursor-pointer desktop:w-32 laptop:w-24 h-full rounded-lgg"></div>
          </div>
        </div>
      <div class="flex flex-col gap-10 pt-20">
        <div class="rounded-lgg px-10 flex items-center gap-4 flex-col h-1/4">
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
        <div class="text-center text-2xl bg-secondary desktop:w-72 laptop:w-60 rounded-lgg p-10 flex-grow">
          Due Books
        </div>
      </div>
    </main>
</template>

<script setup>
import MainViewButton from './MainViewButton'
import SearchBar from './SearchBar'
import AddNewStudentPage from './AddNewStudentPage.vue'

import BookCounter from './BookCounter'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import CommentQuoteOutlineIcon from 'vue-material-design-icons/CommentQuoteOutline.vue'
import InformationIcon from 'vue-material-design-icons/Information.vue'


export default {
  data() {
    return {
      hide_counter: false,
      styled_button: "text-primary animate-pulse",
    }
  },
  components: {
    MainViewButton,
    SearchBar,
    AddNewStudentPage,
    BookCounter,
    CogIcon,
    CommentQuoteOutlineIcon,
    InformationIcon
  }
}
</script>
