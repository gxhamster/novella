<template>
  <div class="relative">
    <magnify-icon :class="isActive ? 'animate-pulse' : ''" class="text-primary absolute desktop:top-4 desktop:right-6 laptop:top-2 laptop:right-6" icon="fa-regular fa-magnifying-glass" />
    <input v-model="searchText" @focus="setActive" @blur="isFocused = false" class="bg-secondary text-gray-500 rounded-full appearance-none text-right outline-none desktop:px-4 desktop:pr-20 laptop:pr-16 desktop:py-4 laptop:py-2" placeholder="Search..." >
    <div id="search-dropdown" v-show="isActive || isFocused" @mouseenter="isActive = true" @mouseleave="isActive = false" class="border-2 border-black laptop:h-60 desktop:h-96 w-full p-3 laptop:mt-2 desktop:mt-3 bg-white rounded-lgg absolute">
      <div class="p-2 thin-scrollbar flex flex-col gap-2 custom-scroll-container pr-4">
        <span v-if="!store.data_fetched" class="text-1.5xl text-gray-500">No search results</span>
        <div v-for="result in filteredResults" :key="result.name">
          <SearchItem :title="result.title"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import SearchItem from './SearchItem.vue'
import { useStore } from '@/stores/store'

class SearchItemClass {
  constructor(title) {
    this.title = title
  }
}

const store = useStore()
const searchText = ref('')
const results = ref([])

store.$onAction(({name, after}) => {
  // When data has been fetched add those to searcable results
  if (name === "setDataFetched") {
    after(() => {
      const result_arr = [
        ...store.dues.map((v) => new SearchItemClass(v.name)), 
        ...store.dues.map((v) => new SearchItemClass(v.title))
      ]
      const unique_arr = [...new Set(result_arr.map(v => v.title))]
      results.value = [...unique_arr.map((v) => new SearchItemClass(v))]
    })
  }
}, true)


console.log(results.value)
const isActive = ref(false)
const isFocused = ref(false)

const setActive = () => {
  isFocused.value = true
  isActive.value = true
}

const filteredResults = computed(() => {
  const re = new RegExp(`${searchText.value.toLowerCase()}`, 'g')
  if (searchText.value === '') {
    return results.value
  }
  return results.value.filter((v) => {
    if (v.title.toLowerCase().search(re) > -1)
      return true
    else
      return false
  })
})

</script>

<style scoped>
.custom-scroll-container {
  height: calc(100% - 10px);
}
</style>