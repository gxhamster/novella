<template>
  <DirectoryPageBtnSmall v-if="isSmall" @clicked="$emit('clicked')"
    ><slot name="icon"></slot
  ></DirectoryPageBtnSmall>
  <button
    v-else
    :class="{ anim: !isSmall }"
    class="cursor-default rounded-full relative bg-primary text-sm text-center items-center text-white px-7 w-32 py-2 flex justify-between gap-2"
  >
    <slot name="icon"></slot>
    {{ title }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import DirectoryPageBtnSmall from "./DirectoryPageBtnSmall.vue";

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

<style scoped>
.anim {
  animation-duration: 0.4s;
  animation-name: scale-anim;
  animation-timing-function: ease;
  transform-origin: left;
}

@keyframes scale-anim {
  from {
    transform: scaleX(0%);
  }
  to {
    transform: scaleX(100%);
  }
}
</style>
