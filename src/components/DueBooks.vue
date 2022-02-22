<template>
  <div class="rounded-lg custom-scroll-container scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
    <div class="pr-5"> 
      <div v-for="day in dates" :key="day">
        <DueBookGroup :title="calculateDate(day)" :children="due_groups[day]"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DueBookGroup from './DueBookGroup.vue'


const dues = [
  {
    title: "Harry Potter and the Half Blood Prince",
    grade: "9 A",
    name: "Sharafudeen Jamaal",
    days: 3
  },
  {
    title: "Islamic Studies 9A",
    grade: "9 A",
    name: "Yamaan Ahmed Naseem",
    days: 5
  },
  {
    title: "How to think like a criminal",
    grade: "9 A",
    name: "Abdul Masyh",
    days: 2
  },
  {
    title: "How to talk in discord",
    grade: "9 A",
    name: "Sadhin Shareef",
    days: 1
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to talk in discord",
    grade: "9 A",
    name: "Sadhin Shareef",
    days: 1
  },
]

function calculateDate(day) {
  if (day == 0) {
    return 'Today'
  } else if (day == 1) {
    return 'Yesterday'
  } else {
    const dateObj = new Date()
    const d = dateObj.getUTCDate()
    const m = dateObj.getUTCMonth()
    const y = dateObj.getUTCFullYear()
    console.log(`${d-day}/${m}/${y}`)
    return `${d-day}/${m}/${y}`
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
  d.sort()
  
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
.custom-scroll-container {
  height: calc(476px - 32px - 2.7rem);
}
</style>