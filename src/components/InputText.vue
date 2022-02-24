<template>
  <div class="w-full">
    <label class="block mb-2 laptop:text-sm desktop:text-md" for="text input">{{ title }}</label>
    <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" class="outline-none apperance-none border-2 rounded-full bg-secondary border-border desktop:py-2 desktop:px-4 laptop:py-1 laptop:px-3" :class="widthFormat" alt="Text Input">
  </div>
</template>

<script setup>
  import { computed, defineProps, defineEmits } from 'vue'

  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    title: String,
    width: String,
    modelValue: String
  })
  const widthFormat = computed(() => `w-${props.width}`)

</script>
