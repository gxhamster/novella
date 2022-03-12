<template>
  <div
    class="desktop:p-20 laptop:py-10 laptop:px-14 bg-secondary rounded-lgg flex-grow overflow-hidden"
  >
    <span
      class="block desktop:text-3xl laptop:text-2xl font-medium desktop:mb-6 laptop:mb-3"
      >{{ props.title }}</span
    >
    <div class="main-container-scroll thin-scrollbar pr-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({ title: String });
</script>

<style scoped>
.container {
  max-width: 1000px;
  height: 100%;
}
</style>
