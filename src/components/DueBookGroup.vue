<template>
  <div>
    <div
      class="flex space-x-2 items-center mb-1 rounded-lg mt-1"
      :class="!show ? 'mb-3' : ''"
    >
      <div
        class="bg-steel rounded-lg text-center p-1 text-gray-700 truncate font-bold item-icon"
      >
        {{ children.length }}
      </div>
      <div class="flex justify-between flex-grow">
        <span class="text-1xl text-gray-600 font-bold">
          {{ props.title }}
        </span>
        <div
          @click="show = !show"
          class="cursor-pointer text-gray-600 hover:text-black transition-colors"
        >
          <ChevronDownIcon v-if="show" />
          <ChevronUpIcon v-else />
        </div>
      </div>
    </div>
    <div v-show="show">
      <div v-for="child in children" :key="child.name">
        <DueBookItem
          :title="child.title"
          :book-name="child.book_name"
          :name="child.name"
          :days="child.days"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onBeforeMount } from "vue";
import ChevronDownIcon from "vue-material-design-icons/ChevronDown.vue";
import ChevronUpIcon from "vue-material-design-icons/ChevronUp.vue";

import DueBookItem from "./DueBookItem.vue";

const show = ref(false);

onBeforeMount(() => {
  show.value = props.initialShow;
});

const props = defineProps({
  title: String,
  initialShow: Boolean,
  children: Array,
});
</script>

<style scoped>
.item-icon {
  width: 35px;
  height: 35px;
  aspect-ratio: 1/1;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
