<template>
  <div class="rounded-lg mt-3 custom-scroll-container thin-scrollbar">
    <LoadingIcon :failed="failed_ui" v-show="loading_ui" />
    <div class="pr-5" v-if="!loading_ui">
      <div v-for="(day, index) in dates" :key="day">
        <DueBookGroup
          :title="calculateDate(day)"
          :initialShow="due_groups.get(day).length === 1 || index === 0"
          :children="due_groups.get(day)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { getFirestore } from "firebase/firestore";
import DueBookGroup from "./DueBookGroup.vue";
import LoadingIcon from "./LoadingIcon.vue";
import { dueStore } from "@/stores/store.js";
import { firebaseSetupSync } from "@/utils/firebase";

const duestore = dueStore();
const db = getFirestore();
const loading_ui = ref(true);
const failed_ui = ref(false);

async function getData() {
  firebaseSetupSync(db, "dues", duestore, "setDues");
  loading_ui.value = false;
}

onMounted(() => {
  getData();
});

onUnmounted(() => {});

function calculateDate(day) {
  if (day == 0) {
    return "Today";
  } else if (day == 1) {
    return "Yesterday";
  } else {
    const currentDate = new Date().getTime();
    const newDate = currentDate - day * 24 * 60 * 60 * 1000;
    const dateObj = new Date(newDate);
    const d = dateObj.getUTCDate();
    const m = dateObj.getUTCMonth() + 1; // getUTCMonth() is zero based
    const y = dateObj.getUTCFullYear();
    return `${d}/${m}/${y}`;
  }
}

function convertSecondsToDays(seconds) {
  const date = new Date(seconds * 1000);
  const days = Math.floor((new Date() - date) / (24 * 60 * 60 * 1000));
  return days;
}

const dates = computed(() => {
  const result = new Map();
  const d = [];

  for (const due of duestore.dues) {
    const days = convertSecondsToDays(due.due_date.seconds);
    if (!result.get(days)) {
      result.set(days, []);
      d.push(days);
    }
  }
  d.sort((a, b) => b - a);
  return d;
});

// Grouped by days
const due_groups = computed(() => {
  const result = new Map();
  for (const due of duestore.dues) {
    const days = convertSecondsToDays(due.due_date.seconds);
    due.days = days;
    if (!result.get(days)) {
      result.set(days, []);
    }
    result.set(days, [...result.get(days), due]);
  }

  return result;
});
</script>
