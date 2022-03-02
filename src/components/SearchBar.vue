<template>
  <div class="relative">
    <magnify-icon :class="isActive ? 'animate-pulse' : ''" class="text-primary absolute desktop:top-4 desktop:right-6 laptop:top-2 laptop:right-6" icon="fa-regular fa-magnifying-glass" />
    <input @input="filterResults" @focus="setActive" @blur="isFocused = false" class="bg-secondary shadow-lg text-gray-500 rounded-full appearance-none text-right outline-none laptop:px-20 desktop:px-28 desktop:pr-20 laptop:pr-16 desktop:py-4 laptop:py-2" placeholder="Search..." >
    <div id="search-dropdown" v-show="isActive || isFocused" @mouseenter="isActive = true" @mouseleave="isActive = false" class="z-50 shadow-lg laptop:h-96 desktop:h-96 w-full p-3 laptop:mt-2 desktop:mt-3 bg-white rounded-lgg absolute">
      <div class="p-2 thin-scrollbar flex flex-col gap-2 custom-scroll-container pr-4">
        <span v-if="!filteredResults.length" class="text-1.5xl text-gray-500">No search results</span>
        <div v-for="result in filteredResults.filter((v, i) => i < maxSearchItems)" :key="result">
          <SearchItem :dataType="result.type" :title="result.title" :optionalData="result.optional"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
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

store.$onAction(({name, after}) => {
  // When data has been fetched add those to searcable results
  if (name === "setDataFetched") {
    after(() => {
      results = [...results, ...store.users.map((v) => new SearchItemClass(v.name, 'user', {age: v.age, island: v.island}))]
      filteredResults.value = results
    })
  }
}, true)

bookstore.$onAction(({name, after}) => {
  if (name === "setDataFetched") {
    after(() => {
      results = [...results, ...bookstore.books.map((v) => new SearchItemClass(v.title, 'book', {
        author: v.author === '' ? 'N/A' : prettyCapitalize(v.author),
        subject: prettyCapitalize(v.subject),
        publisher: prettyCapitalize(v.publisher)
      }))]
      filteredResults.value = results
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
.custom-scroll-container {
  height: calc(100% - 10px);
}
</style>
