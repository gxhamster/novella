<template>
  <div class="laptop:w-52 desktop:w-60">
    <label class="block mb-2 laptop:text-sm desktop:text-md" for="text input">{{ props.title }}</label>
    <div class="relative">
      <input type="date" class="rounded-lgg bg-secondary text-gray-400 w-full border-steel border-2 desktop:py-2 desktop:px-4 laptop:py-1 laptop:px-3">
      <div class="bg-primary rounded-full  inline-block top-0 right-0 absolute laptop:p-2 desktop:p-3">
        <CalendarMonthOutline class="text-white"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CalendarMonthOutline from 'vue-material-design-icons/CalendarMonthOutline.vue'

const props = defineProps({
  title: String
})

</script>

<style scoped>
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
</style>