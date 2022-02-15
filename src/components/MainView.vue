<template>
    <main class="w-full h-full bg-background flex gap-12 p-12 pt-4">
        <div class="flex flex-col flex-grow pt-4 gap-4">
          <SearchBar class="self-end"/>
          <IssueBooksPage/>
          <div class="h-32 mt-6 flex gap-x-10">
            <BookCounter class="flex-grow"/>
            <div class="bg-secondary w-32 h-full rounded-lgg"></div>
          </div>
        </div>
      <div class="flex flex-col gap-10 pt-20">
        <div class="rounded-lgg px-10 flex items-center gap-4 flex-col h-1/4">
          <MainViewButton class="text-1xl" title="Settings">
            <cog-icon class="text-primary"/>
          </MainViewButton>
          <MainViewButton class="text-1xl" title="Feedback">
            <comment-quote-outline-icon class="text-primary"/>
          </MainViewButton>
          <MainViewButton class="text-1xl" title="About us">
            <information-icon class="text-primary"/>
          </MainViewButton>
        </div>
        <div class=" text-center text-2xl bg-secondary w-96 rounded-lgg p-10 flex-grow">
          Due Books
        </div>
      </div>
    </main>
</template>

<script>
import IssueBooksPage from './IssueBooksPage'
import MainViewButton from './MainViewButton'
import SearchBar from './SearchBar'
import BookCounter from './BookCounter'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import CommentQuoteOutlineIcon from 'vue-material-design-icons/CommentQuoteOutline.vue'
import InformationIcon from 'vue-material-design-icons/Information.vue'

export default {
  components: {
    IssueBooksPage,
    MainViewButton,
    SearchBar,
    BookCounter,
    CogIcon,
    CommentQuoteOutlineIcon,
    InformationIcon
  }
}
</script>
