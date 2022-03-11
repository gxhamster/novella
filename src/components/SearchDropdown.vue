<template>
  <div
    class="z-50 transition-height duration-100 shadow-lg w-full p-3 pt-4 laptop:mt-2 desktop:mt-3 bg-white rounded-lgg absolute overflow-x-hidden"
    :class="show_add_btn ? 'h-48' : 'h-96'"
  >
    <div
      class="p-2 overflow-x-hidden thin-scrollbar flex flex-col gap-2 dropdown-scroll-container pr-4"
    >
      <span v-show="!data.length" class="text-1.5xl text-gray-500"
        >No search results</span
      >
      <SearchItemAddButton
        @clicked="addNewItemClicked"
        v-show="showAddBtn && show_add_btn"
        :title="searchText"
      />
      <TransitionGroup name="list">
        <div v-for="result in data.filter((v, i) => i < maxShow)" :key="result">
          <SearchItem
            @clicked="searchItemClicked"
            :dataType="result.type"
            :title="result.title"
            :optionalData="result.optional"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import SearchItem from "./SearchItem.vue";
import SearchItemAddButton from "./SearchItemAddButton.vue";

const props = defineProps({
  searchText: String,
  showAddBtn: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Array,
    required: true,
    default() {
      return [];
    },
  },
  maxShow: {
    type: Number,
    default: 30,
  },
});
const emit = defineEmits(["itemClicked", "addItemClicked"]);
const show_add_btn = computed(() =>
  props.data.length == 0 && props.searchText != "" ? true : false
);

function searchItemClicked(search_item_obj) {
  emit("itemClicked", search_item_obj);
}

function addNewItemClicked() {
  emit("addItemClicked");
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
