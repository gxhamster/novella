<template>
  <div
    class="bg-secondary desktop:w-80 laptop:w-60 p-4 laptop:pt-6 desktop:pt-8 rounded-lgg h-1/2 custom-shadow overflow-hidden flex flex-col justify-between"
  >
    <BookCounterSelected :counter="counters[selectedCounterIdx]" />
    <div class="flex justify-center gap-x-5">
      <div v-for="counter in smallCounters" :key="counter.title">
        <BookCounterSmall @clicked="counterClicked" :counter="counter" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw, Ref, onMounted } from "vue";
import BookIcon from "vue-material-design-icons/Book.vue";
import BookArrowRightIcon from "vue-material-design-icons/BookArrowRight.vue";
import BookArrowLeftIcon from "vue-material-design-icons/BookArrowLeft.vue";
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";
import BookCounterSelected from "./BookCounterSelected.vue";
import BookCounterSmall from "./BookCounterSmall.vue";
import {
  getTotalBooks,
  getTotalStudents,
} from "@/modules/bookcounter/utils/fetchCounterData";

interface Counter {
  title: string;
  icon: any;
  value: Ref<number>;
}

const selectedCounterIdx = ref(0);
const totalBooks = ref(0);
const totalUnreturendBooks = ref(0);
const totalDueBooks = ref(0);
const totalStudents = ref(0);

const counters = ref<Counter[]>([
  {
    title: "Number Of Unreturned Books",
    icon: markRaw(BookArrowLeftIcon),
    value: totalUnreturendBooks,
  },
  {
    title: "Number of Due Books",
    icon: markRaw(BookArrowRightIcon),
    value: totalDueBooks,
  },
  {
    title: "Number Of Books",
    icon: markRaw(BookIcon),
    value: totalBooks,
  },
  {
    title: "Number Of Students",
    icon: markRaw(AccountGroupIcon),
    value: totalStudents,
  },
]);

onMounted(async () => {
  totalBooks.value = await getTotalBooks();
  totalStudents.value = await getTotalStudents();
});

const smallCounters = computed(() =>
  counters.value.filter((_, index) => index !== selectedCounterIdx.value)
);

function counterClicked(counter: Counter) {
  let idx = -1;
  for (const [i, c] of counters.value.entries()) {
    if (c.title === counter.title) idx = i;
  }
  selectedCounterIdx.value = idx;
}
</script>
