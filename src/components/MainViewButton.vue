<template>
  <div
    @click="emit('clicked')"
    :class="isActive ? 'btn-active' : ''"
    class="flex cursor-pointer transition py-1 desktop:py-2 px-4 justify-center btn rounded-lg"
  >
    <div class="flex items-center w-48 space-x-6">
      <slot></slot>
      <button class="text-primary h-full desktop:text-1.5xl laptop:text-1xl">
        {{ props.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["clicked"]);
const props = defineProps({
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
