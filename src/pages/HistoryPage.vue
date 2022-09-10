<template>
  <PageContainer :max="true" title="History">
    <DataTable
      :data="receivedBooks"
      :headings="[
        'Name',
        'Index',
        'Grade',
        'Title',
        'Book ID',
        'Issue Date',
        'Due Date',
        'Receive Date',
      ]"
      :data-props="[
        'name',
        'index',
        'grade',
        'book_name',
        'book_id',
        'issue_date_formatted',
        'due_date_formatted',
        'receive_date_formatted',
      ]"
      :filter="[
        { heading: 'Name', prop: 'name' },
        { heading: 'Index', prop: 'index' },
        { heading: 'Issue Date', prop: 'issue_date_formatted' },
        { heading: 'Due Date', prop: 'due_date_formatted' },
        { heading: 'Receive Date', prop: 'receive_date_formatted' },
      ]"
    />
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "@/components/PageContainer.vue";
import DataTable from "@/components/DataTable.vue";
import { receiveStore } from "@/stores/store";
import { computed } from "@vue/reactivity";

const receivestore = receiveStore();
const receivedBooks = computed(() => {
  const formattedDate = (date: Date) => {
    const d = date.getUTCDate();
    const m = date.getUTCMonth() + 1; // getUTCMonth() is zero based
    const y = date.getUTCFullYear();
    return `${d}/${m}/${y}`;
  };

  return receivestore.received.map((v) => {
    const issue_date = formattedDate(new Date(v.issue_date.seconds * 1000));
    const due_date = formattedDate(new Date(v.due_date.seconds * 1000));
    const receive_date = formattedDate(new Date(v.receive_date.seconds * 1000));
    const n = {
      ...v,
      issue_date_formatted: issue_date,
      due_date_formatted: due_date,
      receive_date_formatted: receive_date,
    };
    return n;
  });
});
</script>
