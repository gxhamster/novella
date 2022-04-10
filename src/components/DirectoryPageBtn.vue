<template>
  <DirectoryPageBtnSmall v-if="isSmall"><BookIcon /></DirectoryPageBtnSmall>
  <button
    v-else
    @click="$emit('clicked')"
    class="rounded-full relative bg-primary text-sm text-center items-center text-white px-7 w-32 py-2 flex justify-between"
  >
    <slot name="icon"></slot>
    {{ title }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import DirectoryPageBtnSmall from "./DirectoryPageBtnSmall.vue";
import BookIcon from "vue-material-design-icons/Book.vue";

defineEmits(["clicked"]);
defineProps({
  isSmall: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Clicked",
  },
});
</script>
