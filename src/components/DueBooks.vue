<template>
  <div class="rounded-lg mt-3 custom-scroll-container custom-scroll-container-desktop scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
    <div class="pr-5"> 
      <div v-for="day in dates" :key="day">
        <DueBookGroup :title="calculateDate(day)" :initialShow="day == 0 ? true : false" :children="due_groups[day]"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DueBookGroup from './DueBookGroup.vue'
import dues from './test_due_data'


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
    console.log(`${d}/${m}/${y}`)
    return `${d}/${m}/${y}`

  }
} 

const dates = computed(() => {
  const result = []
  const d = []
  for (const due of dues) {
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

  for (const due of dues) {
    if (!result[due.days]) {
      result[due.days] = []
    }
    result[due.days].push(due)
  }

  return result
})
</script>

<style scoped>
/* .custom-scroll-container {
  height: calc(476px - 32px - 4.9rem);
} */
</style>