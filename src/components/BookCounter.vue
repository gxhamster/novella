<template>
  <div class="bg-secondary rounded-lgg p-4 desktop:pr-10 laptop:pr-4 flex">
    <div class="flex flex-grow desktop:gap-4 laptop:gap-2 items-center">
      <div class="bg-steel aspect-square border box-border laptop:w-20 desktop:w-28 h-full"></div>
      <div class="flex-grow h-full flex-shrink-0">
        <span class="font-medium text-1xl">{{ title }}</span>
        <span class="block font-bold desktop:text-5xl laptop:text-4xl">{{ count }}</span>
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

<script>
import DetailsButton from './DetailsButton'

export default {
  components: {
    DetailsButton
  },
  props: {
    title: String,
    count: Number
  }
}
</script>
