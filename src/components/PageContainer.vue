<template>
  <div
    class="bg-secondary rounded-lgg flex-grow overflow-hidden"
    :class="
      max
        ? 'desktop:p-10 laptop:pt-7 laptop:pb-4 laptop:px-7'
        : 'desktop:p-20 laptop:py-8 laptop:px-14'
    "
  >
    <span
      class="desktop:text-3xl laptop:text-2xl font-medium desktop:mb-6 laptop:mb-3 flex justify-between"
      :class="{ 'px-7': max }"
      >{{ props.title }}
      <slot name="titleContent"></slot>
    </span>
    <div
      class="mx-auto flex flex-col justify-between"
      :class="{ 'main-container': !max, 'main-container-max': max }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  title: string;
  max?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  max: false,
});
</script>
