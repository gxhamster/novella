<template>
  <button
    @click="emit('clicked')"
    class="hover:opacity-90 transition duration-150 px-5 desktop:py-1 laptop:py-1 text-white rounded-full"
    :class="`${props.background} ${props.text_color}`"
  >
    {{ props.title }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["clicked"]);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    default: "bg-primary",
  },
  text_color: {
    type: String,
    default: "text-white",
  },
});
</script>
