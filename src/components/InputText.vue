<template>
  <div class="w-full">
    <label class="block mb-2 laptop:text-sm desktop:text-md" for="text input">{{ props.title }}</label>
    <input class="outline-none apperance-none border-2 rounded-full bg-secondary border-border py-2 px-4" :class="widthFormat" alt="Text Input">
  </div>
</template>

<script setup>
  import { computed, defineProps } from 'vue'

  const props = defineProps({
    title: String,
    width: String
  })
  const widthFormat = computed(() => `w-${props.width}`)

</script>


