<template>
  <Transition :name="transitionName" mode="out-in">
    <DirectoryPageBtnSmall v-if="isSmall" @clicked="$emit('clicked')"
      ><slot name="icon"></slot
    ></DirectoryPageBtnSmall>
    <button
      v-else
      class="cursor-default rounded-full relative bg-primary text-sm text-center items-center text-white px-7 w-32 py-2 flex justify-between gap-2"
    >
      <slot name="icon"></slot>
      {{ title }}
    </button>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import DirectoryPageBtnSmall from "./DirectoryPageBtnSmall.vue";

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
const direction = ref(props.direction);
const transitionName = computed(() => {
  return props.isSmall ? "scale-large" : "scale";
});
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transform: scaleX(100%);
  will-change: transform;
  transition: transform 0.25s ease;
  transform-origin: v-bind(direction);
}

.scale-enter-from,
.scale-leave-to {
  transform: scaleX(120%);
}

.scale-large-enter-active,
.scale-large-leave-active {
  transform: scaleX(100%);
  will-change: transform;
  transition: transform 0.25s ease;
  transform-origin: v-bind(direction);
}

.scale-large-enter-from,
.scale-large-leave-to {
  transform: scaleX(20%);
}
</style>
