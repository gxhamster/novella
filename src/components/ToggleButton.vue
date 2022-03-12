<template>
  <label class="flex items-center cursor-pointer" @click="toggled = !toggled">
    <div class="relative">
      <div class="bg-primary w-16 h-8 rounded-full"></div>
      <span
        v-show="!toggled"
        class="text-md font-medium text-white absolute left-2 top-1"
        >off</span
      >
      <span
        v-show="toggled"
        class="text-md font-medium text-white absolute right-2 top-1"
        >on</span
      >
      <div
        :class="toggled ? 'move-left' : 'move-right'"
        class="dot w-6 h-6 bg-white rounded-full absolute transition top-1"
      ></div>
    </div>
  </label>
</template>

<script setup>
import { ref } from "vue";

const toggled = ref(false);
</script>

<style scoped>
.move-right {
  transform: translateX(150%);
}

.move-left {
  transform: translateX(20%);
}
</style>
