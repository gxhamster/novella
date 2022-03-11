<template>
  <div class="flex flex-col space-y-5 justify-center h-full items-center">
    <div class="animate-spin">
      <LoadingIcon class="text-primary" :size="56" />
    </div>
    <span
      class="animate-pulse text-gray-500 desktop:text-2xl laptop:text-1.5xl"
      >{{ !props.failed ? "Loading..." : "Failed to retreive data" }}</span
    >
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import LoadingIcon from "vue-material-design-icons/Loading.vue";

const props = defineProps({
  failed: Boolean,
});
</script>
