<template>
  <div @click="emit('clicked')" class="cursor-pointer p-1 rounded-full w-10">
    <div class="flex justify-center items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["clicked"]);
defineProps({
  title: String,
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.font {
  font-size: 1.28rem;
}
.btn-active {
  background-color: rgb(189, 208, 215) !important;
}

.btn:hover {
  background-color: rgb(189, 208, 215, 0.3);
}
</style>
