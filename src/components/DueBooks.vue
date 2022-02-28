<template>
  <div class="rounded-lg mt-3 custom-scroll-container custom-scroll-container-desktop scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 overflow-y-scroll overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
    <LoadingIcon :failed="failed" v-if="loading" />
    <div class="pr-5" v-if="!loading"> 
      <div v-for="day in dates" :key="day">
        <DueBookGroup :title="calculateDate(day)" :initialShow="day == 0 ? true : false" :children="due_groups[day]"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DueBookGroup from './DueBookGroup.vue'
import LoadingIcon from './LoadingIcon.vue'
import { useStore } from '@/stores/store.js'


const store = useStore()
const loading = ref(true)
const failed = ref(false)

const fetchDueBooks = async () => {
  const URL = 'http://localhost:3000/due_books'
  let response = {}
  let data = {}
  try {
    response = await fetch(URL)
    data = await response.json()
  } catch {
    console.log("[X] Cannot fetch data")
    data = localStorage.getItem("dues")
    if (data === 'null') {
      console.log('[X] Cannot get local data')
      failed.value = true
    } else {
      data = JSON.parse(data)
    }
  }   
  return data
}


const setFetchData = async () => {
    store.setDues(await fetchDueBooks())
    if (store.dues !== 'null') {
      localStorage.setItem("dues", JSON.stringify(store.dues))
      loading.value = false
      clearInterval(fetchInterval)
      store.setDataFetched(true)
    } else {
      failed.value = true
      store.setDataFetched(false)
    }
}

// If cannot retrieve data
const fetchInterval = setInterval(setFetchData, 10000)

onMounted(async () => {
  setFetchData()
})

function calculateDate(day) {
  if (day == 0) {
    return 'Today'
  } else if (day == 1) {
    return 'Yesterday'
  } else {
    const currentDate = new Date().getTime()
    const newDate = currentDate - (day * 24 * 60 * 60 * 1000)
    const dateObj = new Date(newDate)
    const d = dateObj.getUTCDate()
    const m = dateObj.getUTCMonth() + 1 // getUTCMonth() is zero based
    const y = dateObj.getUTCFullYear()
    return `${d}/${m}/${y}`

  }
} 

const dates = computed(() => {
  const result = []
  const d = []
  for (const due of store.dues) {
    if (!result[due.days]) {
      result[due.days] = []
      d.push(due.days)
    }
  }
  d.sort((a, b) =>  a - b)
  
  return d
})

const due_groups = computed(() => {
  const result = []

  for (const due of store.dues) {
    if (!result[due.days]) {
      result[due.days] = []
    }
    result[due.days].push(due)
  }

  return result
})
</script>
