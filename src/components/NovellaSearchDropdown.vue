<template>
  <div
    class="w-64 border-2 border-gray-500 absolute left-0 z-10 mx-2 -my-2 shadow-lg p-3 pt-4 bg-gray-100 rounded-lgg"
  >
    <div
      class="flex space-x-2 my-2 bg-primary p-2 rounded-lg"
      v-for="data in searchData"
      :key="data.id"
    >
      <slot name="icon"></slot>
      <div>
        <span class="text-sm block text-white">{{ data.title }}</span>
        <span class="text-xs block text-white">{{ data.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

export interface NovellaSearchDropdownField {
  id: string | number;
  title: string;
  subtitle: string;
}

interface NovellaSearchDropdownProps {
  searchData: NovellaSearchDropdownField[];
}

defineProps<NovellaSearchDropdownProps>();
</script>
