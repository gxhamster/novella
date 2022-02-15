<template>
  <div class="bg-secondary rounded-lgg p-4 pr-10 flex">
    <div class="flex flex-grow gap-4 items-center">
      <div class="bg-steel rounded-lgg image flex-shrink-0"></div>
      <div class="flex-grow h-full">
        <span class="font-medium text-1xl">Number of Unreturned Books</span>
        <span class="block font-bold text-5xl">187</span>
      </div>
      <DetailsButton class="self-end"/>
    </div>
  </div>
</template>

<style>
.image {
  width: 100px;
  height: 100px;
  border-radius: 30px;
}
</style>

<script>
import DetailsButton from './DetailsButton'

export default {
  components: {
    DetailsButton
  }
}
</script>
