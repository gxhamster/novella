<template>
  <div class="relative desktop:w-96 laptop:w-80">
    <magnify-icon :class="isActive ? 'animate-pulse' : ''" class="text-primary absolute desktop:top-3 desktop:right-6 laptop:top-1 laptop:right-6" icon="fa-regular fa-magnifying-glass" />
    <input @input="filterResults" @focus="setActive" @blur="isFocused = false" class="bg-secondary custom-shadow text-gray-500 rounded-full appearance-none text-right outline-none w-full pr-16 desktop:py-3 laptop:py-2" placeholder="Search..." >
    <div id="search-dropdown" v-show="isActive || isFocused" @mouseenter="isActive = true" @mouseleave="isActive = false" class="z-50 shadow-lg laptop:h-96 desktop:h-96 w-full p-3 pt-4 laptop:mt-2 desktop:mt-3 bg-white rounded-lgg absolute">
      <div class="p-2 thin-scrollbar flex flex-col gap-2 dropdown-scroll-container pr-4">
        <span v-if="!filteredResults.length" class="text-1.5xl text-gray-500">No search results</span>
        <div v-for="result in filteredResults.filter((v, i) => i < maxSearchItems)" :key="result">
          <SearchItem :dataType="result.type" :title="result.title" :optionalData="result.optional"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch, reactive } from 'vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import { userStore, bookStore } from '@/stores/store'
import SearchItem from './SearchItem.vue'
import { prettyCapitalize } from '@/helper'


class SearchItemClass {
  constructor(title, type, optional = {}) {
    this.title = title
    this.type = type
    this.optional = optional
  }
}

const store = userStore()
const bookstore = bookStore()
const searchText = ref('')
const filteredResults = ref([])
const inputDelay = 700
const maxSearchItems = 30
let results = []
let timeout = null
const result_obj = reactive({
  user_data: null,
  book_data: null
})

function setResult() {
  results = [...result_obj.book_data, ...result_obj.user_data]
  filteredResults.value = results
}

watch(result_obj, (new_result_obj) => {
  // Wait for both stores to get fetch data
  if (Object.values(new_result_obj).filter(v => v === null).length === 0) {
    setResult()
  }
})

store.$onAction(({name, after}) => {
  // When data has been fetched add those to searcable results
  if (name === "setDataFetched") {
    after(() => {
      result_obj.user_data = [...store.users.map((v) => new SearchItemClass(prettyCapitalize(v.name), 'user', {
        grade: v.age,
        index: v.index
      }))]
    })
  }
}, true)

bookstore.$onAction(({name, after}) => {
  if (name === "setDataFetched") {
    after(() => {
      // Remove duplicate titles
      const book_results = [...bookstore.books.map((v) => new SearchItemClass(prettyCapitalize(v.title), 'book', {
        author: v.author === '' ? 'N/A' : prettyCapitalize(v.author),
        subject: prettyCapitalize(v.subject),
        publisher: prettyCapitalize(v.publisher)
      }))]

      // Group objects by title
      const grouped_result = {}
      for (const obj of book_results) {
        const title = obj.title.toLowerCase()
        if (!grouped_result[title]) {
          grouped_result[title] = []
        }
        grouped_result[title].push(obj)
      }

      const final_result = []
      for (const arr of Object.values(grouped_result)) {
        if (arr.length > 1)
          arr[0].optional.stock = arr.length
        final_result.push(arr[0])
      }
      result_obj.book_data = [...final_result]
    })
  }
}, true)

const isActive = ref(false)
const isFocused = ref(false)

const setActive = () => {
  isFocused.value = true
  isActive.value = true
}

function filterPromise() {
  return new Promise((resolve, reject) => {
    const re = new RegExp(`${searchText.value.toLowerCase()}`, 'g')
    const result = results.filter((v) => {
      const infoStr = `${v.title} ${Object.values(v.optional).join(' ')}`.toLowerCase()
      if (infoStr.search(re) > -1) {
        return true
      }
      return false
    })
    if (result === 'null' || result === 'undefined')
      reject(null)
    resolve(result)
  })
}

function setFilterResults(result) {
  filteredResults.value = result
}

const filterResults = (event) => {
  searchText.value = event.target.value
  timeout = setTimeout(() => {

    if (searchText.value === '') {
      filteredResults.value = results
    }
    filterPromise().then(setFilterResults).catch(setFilterResults)
  }, inputDelay)
}

onUnmounted(() => {
  clearTimeout(timeout)
})

</script>

<style scoped>
.dropdown-scroll-container {
  height: calc(100% - 10px);
}
</style>
