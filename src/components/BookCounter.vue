<template>
  <div class="bg-secondary rounded-lgg p-4 desktop:pr-10 laptop:pr-4 flex">
    <div class="flex flex-grow desktop:gap-4 laptop:gap-2 items-center">
      <div class="bg-steel border desktop:w-28 desktop:h-full laptop:w-20 laptop:h-20 flex-shrink-0"></div>
      <div class="flex-grow h-full">
        <span class="font-medium text-1xl">Number of Unreturned Books</span>
        <span class="block font-bold desktop:text-5xl laptop:text-4xl">187</span>
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

.border {
  border-radius: 24px;
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
