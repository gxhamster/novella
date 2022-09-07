<template>
  <div
    @mouseover="setFocus(true)"
    @mouseleave="setFocus(false)"
    @click="setFocus(true)"
    class="w-full h-full"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const emits = defineEmits([
  "arrowUpPressed",
  "arrowDownPressed",
  "returnPressed",
]);

const isAreaFocused = ref(false);

function setFocus(focus = true) {
  if (focus) {
    isAreaFocused.value = true;
  } else {
    isAreaFocused.value = false;
  }
}

window.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (isAreaFocused.value) {
    if (event.key === "ArrowUp") {
      emits("arrowUpPressed");
    } else if (event.key === "ArrowDown") {
      emits("arrowDownPressed");
    } else if (event.key === "Enter") {
      emits("returnPressed");
    }
  }
});
</script>
