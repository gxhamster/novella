<template>
<button @click="emit('clicked', title)" class="bg-gray-200 custom-shadow rounded-lg flex content-center p-2 space-x-2">
  <PlusCircleIcon class="text-primary"/>
  <span class="transition truncate">{{ title }}</span>
</button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import PlusCircleIcon from 'vue-material-design-icons/PlusCircle.vue'

const emit = defineEmits(['clicked'])
defineProps({
  title: String
})
</script>
