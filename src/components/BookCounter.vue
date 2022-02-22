<template>
  <div class="bg-secondary rounded-lgg p-4 desktop:pr-10 laptop:pr-4 flex">
    <div class="flex flex-grow desktop:gap-4 laptop:gap-2 items-center">
      <div class="bg-steel aspect-square border box-border p-5 flex justify-center items-center">
        <BookOutlineIcon class="text-lg"/>
      </div>
      <div class="flex-grow h-full flex-shrink-0">
        <span class="font-medium text-1xl">{{ props.title }}</span>
        <span class="block font-bold desktop:text-5xl laptop:text-4xl">{{ props.count }}</span>
      </div>
      <DetailsButton class="self-end"/>
    </div>
  </div>
</template>

<style>
.border {
  border-radius: 24px;
}
</style>

<script setup>
import { defineProps } from 'vue'
import DetailsButton from './DetailsButton'
import BookOutlineIcon from 'vue-material-design-icons/BookOutline.vue'

const props = defineProps({
  title: String,
  count: Number
})
</script>
