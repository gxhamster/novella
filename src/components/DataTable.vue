<template>
  <div class="h-full">
    <table>
      <thead>
        <tr>
          <th
            v-for="heading in headings"
            :key="heading"
            class="laptop:text-xs text-gray-800"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll thin-scrollbar">
        <tr
          v-for="(dataitem, index) in data"
          :key="dataitem"
          :class="{ 'highlight-clr': index % 2 == 0 }"
        >
          <td
            v-for="field in dataProps"
            :key="field"
            class="laptop:text-xs text-gray-700"
          >
            {{ dataitem[field] || "N/A" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  headings: {
    type: Array,
    required: true,
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
  height: 100%;
}

tbody tr {
  padding: 0.5em 0em;
}

.highlight-clr {
  background-color: var(--table-highlight-clr);
}
</style>
