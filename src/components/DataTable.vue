<template>
  <div class="h-full">
    <table>
      <thead>
        <tr>
          <th
            v-for="heading in headings"
            :key="heading"
            class="laptop:text-xs desktop:text-sm text-gray-800 flex items-center justify-center gap-1"
          >
            {{ heading }}
            <span @click="toggleSwitch(heading)">
              <ChevronDownIcon
                :size="15"
                v-show="
                  shouldHeadingFilter(heading) &&
                  filterBtnState.get(heading).state
                "
              />
              <ChevronUpIcon
                :size="15"
                v-show="
                  shouldHeadingFilter(heading) &&
                  !filterBtnState.get(heading).state
                "
              />
            </span>
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
import { ref, defineProps, watch, watchEffect } from "vue";
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

function filterData(prop, options = { ascending: true, descending: false }) {
  let result = [];
  const data = props.data;

  if (options.ascending) {
    result = data.sort((a, b) => ascending(a, b, prop));
  } else if (options.descending) {
    result = data.sort((a, b) => descending(a, b, prop));
  }

  filteredData.value = result;
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

function ascending(obj1, obj2, prop) {
  let data1, data2;
  if (typeof obj1[prop] === "string" && typeof obj2[prop] === "string") {
    data1 = obj1[prop].toLowerCase().trim();
    data2 = obj2[prop].toLowerCase().trim();
  } else {
    data1 = obj1[prop];
    data2 = obj2[prop];
  }

  if (data1 < data2) return -1;
  if (data1 > data2) return 1;
  return 0;
}

function descending(obj1, obj2, prop) {
  let data1, data2;
  if (typeof obj1[prop] === "string" && typeof obj2[prop] === "string") {
    data1 = obj1[prop].toLowerCase().trim();
    data2 = obj2[prop].toLowerCase().trim();
  } else {
    data1 = obj1[prop];
    data2 = obj2[prop];
  }

  if (data1 > data2) return -1;
  if (data1 < data2) return 1;
  return 0;
}

function updateBtnState() {
  const m = new Map();
  for (const a of props.filter) {
    m.set(a.heading, {
      state: false,
      prop: a.prop,
    });
  }
  filterBtnState.value = m;
}

watchEffect(updateBtnState);
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
