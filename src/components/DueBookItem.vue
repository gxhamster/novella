<template>
  <div class="flex gap-2 border-b-2 border-gray-300 py-2 justify-between">
    <div class="flex flex-col flex-grow-0">
      <span class="duebooks-title laptop:text-sm desktop:text-1xl font-medium">
        {{ name }}</span
      >
      <div class="flex gap-4 text-xs">
        <div id="book_title" class="pt-1">
          <span class="laptop:text-sm desktop:text-1xl">{{ bookName }}</span>
        </div>
      </div>
    </div>
    <div
      :class="{
        'bg-secondary border-2 border-gray-400': days <= 0,
        green: days >= 1 && days <= 3,
        yellow: days >= 4 && days <= 6,
        red: days >= 7,
      }"
      class="flex tracking-tighter flex-col text-center w-14 h-14 aspect-square rounded-lg flex-shrink-0"
    >
      <span class="font-bold text-1.5xl">{{ days }}</span>
      <span class="text-sm flex-shrink">{{ days != 1 ? "Days" : "Day" }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  name: String,
  bookName: String,
  title: String,
  days: Number,
});
</script>

<style scoped>
.red {
  background: #d79894;
}
.green {
  background: #d3e8cb;
}
.yellow {
  background: #efefd0;
}
.white {
  background: #eff1f1;
}
</style>
