<template>
  <div class="flex gap-2 border-b-2 border-gray-300 py-2 justify-between">
    <div class="flex flex-col flex-grow-0">
      <span class="duebooks-title text-1xl"> {{ name }}</span>
      <div class="flex gap-4 text-xs">
        <div class="flex flex-col" id="grade">
          <span class="block font-bold">Grade</span>
          <span>{{ grade }}</span>
        </div>
        <div id="book_title">
          <span>{{ title }}</span>
        </div>
      </div>
    </div>
    <div :class="days < 6 && days >= 0 ? days_colors[days] : 'red'" class="flex tracking-tighter flex-col text-center w-14 h-14 aspect-square rounded-lg flex-shrink-0">
      <span class="font-bold text-1.5xl">{{ days }}</span>
      <span class="text-sm flex-shrink">{{ days != 1 ? 'Days' : 'Day'}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const days_colors = ref({
  0: "bg-secondary border-2 border-gray-400",
  1: "green",
  2: "yellow",
  3: "yellow",
  4: "red",
  5: "red"
})

defineProps({
  name: String,
  grade: String,
  title: String,
  days: Number
})
</script>

<style scoped>
.red {
  background: #D79894;
}
.green {
  background: #D3E8CB;
}
.yellow {
  background: #EFEFD0;
}
.white {
  background: #EFF1F1;
}
</style>