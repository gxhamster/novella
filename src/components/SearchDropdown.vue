<template>
  <div class="z-50 shadow-lg laptop:h-96 desktop:h-96 w-full p-3 pt-4 laptop:mt-2 desktop:mt-3 bg-white rounded-lgg absolute overflow-x-hidden">
    <div class="p-2 overflow-x-hidden thin-scrollbar flex flex-col gap-2 dropdown-scroll-container pr-4">
      <span v-show="!data.length" class="text-1.5xl text-gray-500">No search results</span>
      <TransitionGroup name="list">
        <div v-for="result in data.filter((v, i) => i < maxShow)" :key="result">
          <SearchItem @clicked="searchItemClicked" :dataType="result.type" :title="result.title" :optionalData="result.optional"/>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import SearchItem from './SearchItem.vue'

defineProps({
  data: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  maxShow: {
    type: Number,
    default: 30
  }
})
const emit = defineEmits(['itemClicked'])

function searchItemClicked(search_item_obj) {
    emit('itemClicked', search_item_obj)
}

</script>

<style scoped>
.dropdown-scroll-container {
  height: calc(100% - 10px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

</style>
