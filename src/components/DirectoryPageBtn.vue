<template>
  <button
    :class="btnStyles"
    class="rounded-full relative bg-primary text-sm text-center items-center text-white flex justify-start"
    @click="
      () => {
        if (isSmall) $emit('clicked');
      }
    "
  >
    <slot name="icon"></slot>
    <p class="btn-text" v-show="!isSmall">
      {{ title }}
    </p>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

defineEmits(["clicked"]);
const props = defineProps({
  isSmall: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "right"].includes(value);
    },
  },
  title: {
    type: String,
    default: "Clicked",
  },
});

const btnStyles = computed(() => {
  return props.isSmall ? "p-2 w-10" : "px-7 py-2 w-32 cursor-default gap-2";
});
</script>

<style scoped>
button {
  --transition-duration: 0.3s;
  transition: all var(--transition-duration) ease;
  transform-origin: right;
}

.btn-text {
  animation-name: fade-text;
  animation-duration: calc(
    var(--transition-duration) + var(--transition-duration) / 2
  );
  position: absolute;
  right: 20px;
}

@keyframes fade-text {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
