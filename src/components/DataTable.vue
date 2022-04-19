<template>
  <div class="h-full">
    <table>
      <thead>
        <tr>
          <th
            v-for="heading in headings"
            :key="heading"
            class="laptop:text-xs desktop:text-sm flex items-center justify-center gap-1"
          >
            <label
              :for="
                shouldHeadingFilter(heading) &&
                filterBtnState.get(heading).hidden
                  ? `unhide-btn-${heading}`
                  : `toggle-switch-${heading}`
              "
              class="transition-all duration-150 text-gray-600"
              :class="{
                'cursor-pointer': shouldHeadingFilter(heading),

                'hover:text-gray-900': shouldHeadingFilter(heading),
              }"
              >{{ heading }}</label
            >
            <button @click="unhideBtn(heading)" :id="`unhide-btn-${heading}`" />
            <button
              :id="`toggle-switch-${heading}`"
              v-if="
                shouldHeadingFilter(heading) &&
                !filterBtnState.get(heading).hidden
              "
              @click="toggleSwitch(heading)"
            >
              <ChevronDownIcon
                :size="15"
                v-show="filterBtnState.get(heading).state"
              />
              <ChevronUpIcon
                :size="15"
                v-show="!filterBtnState.get(heading).state"
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll thin-scrollbar">
        <tr
          v-for="(dataitem, index) in filteredData"
          :key="dataitem"
          :class="{ 'highlight-clr': index % 2 == 0 }"
        >
          <td
            v-for="field in dataProps"
            :key="field"
            class="laptop:text-xs desktop:text-sm text-gray-700"
          >
            {{ dataitem[field] || "N/A" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, watchEffect, onMounted, toRaw } from "vue";
import ChevronDownIcon from "vue-material-design-icons/ChevronDown.vue";
import ChevronUpIcon from "vue-material-design-icons/ChevronUp.vue";

const props = defineProps({
  headings: {
    type: Array,
    required: true,
  },
  filter: {
    type: Array,
    default() {
      return [];
    },
  },
  dataProps: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

// true is acending, false is descending
const filterBtnState = ref(new Map());
const filteredData = ref([]);

watch(
  () => props.data,
  () => {
    filteredData.value = props.data;
  }
);

function unhideBtn(heading) {
  const oldValue = filterBtnState.value.get(heading);
  const newValue = {
    ...oldValue,
    hidden: oldValue.hidden ? false : false,
  };
  for (const [key, value] of filterBtnState.value) {
    if (key !== heading) {
      filterBtnState.value.set(key, {
        ...value,
        hidden: true,
      });
    }
  }
  filterBtnState.value.set(heading, newValue);
  const isAscending = filterBtnState.value.get(heading).state;
  const prop = filterBtnState.value.get(heading).prop;
  filterData(prop, { ascending: isAscending, descending: !isAscending });
}

function toggleSwitch(heading) {
  const newValue = {
    ...filterBtnState.value.get(heading),
    state: !filterBtnState.value.get(heading).state,
  };
  filterBtnState.value.set(heading, newValue);

  // Filter data in the column of heading
  const isAscending = filterBtnState.value.get(heading).state;
  const prop = filterBtnState.value.get(heading).prop;
  filterData(prop, { ascending: isAscending, descending: !isAscending });
}

function shouldHeadingFilter(heading) {
  const d = props.filter;
  return d.filter((v) => v.heading === heading).length > 0;
}

function filterData(prop, options = { ascending: true, descending: false }) {
  let result = [];
  const data = toRaw(props.data);

  console.time();
  if (options.ascending) {
    result = insertionSort(data, data.length, prop);
  } else if (options.descending) {
    result = insertionSortReverse(data, data.length, prop);
  }
  console.timeEnd();
  filteredData.value = result;
}

function insertionSortReverse(arr, n, prop) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    while (j >= 0 && arr[j][prop] < key[prop]) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

function insertionSort(arr, n, prop) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;

    while (j >= 0 && arr[j][prop] > key[prop]) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

function updateBtnState() {
  const m = new Map();
  for (const a of props.filter) {
    m.set(a.heading, {
      state: false,
      hidden: true,
      prop: a.prop,
    });
  }
  filterBtnState.value = m;
}

watchEffect(updateBtnState);
onMounted(() => (filteredData.value = props.data));
</script>

<style scoped>
table {
  --table-background-clr: #dbdddd;
  --table-highlight-clr: #d0d1d1;
  --table-border-rad: 30px;
  --table-column-width: 250px;
  table-layout: fixed;
  border-collapse: separate;
  border-radius: var(--table-border-rad);
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--table-background-clr);
}
thead th {
  position: sticky;
  top: 0;
  width: var(--table-column-width);
  padding: 1.7em 0em 1em 0em;
}

td {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  width: var(--table-column-width);
  margin: 0em 0.1em;
}

tr {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

tbody {
  width: 100%;
  display: block;
  height: 97%;
}

tbody tr {
  padding: 0.5em 1em;
}

.highlight-clr {
  background-color: var(--table-highlight-clr);
}
</style>
