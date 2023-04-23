<template>
  <form @submit.prevent="props.handleSubmit(data)"><slot></slot></form>
</template>

<script setup lang="ts">
import { provide, ref, defineProps, withDefaults } from "vue";

export interface FormData {
  [key: string]: string | undefined;
}

interface NovellaFormProps {
  // eslint-disable-next-line
  handleSubmit: (data: FormData) => void;
  defaultValues?: FormData;
}
const props = withDefaults(defineProps<NovellaFormProps>(), {
  defaultValues: () => ({} as FormData),
});

// FIXME: If any input elements have duplicate name props it would override.
// Need to throw error if duplicate
// Copy created to make sure prop is not mutated
const defaultValuesCopy: FormData = JSON.parse(
  JSON.stringify(props.defaultValues)
);
const data = ref<FormData>(defaultValuesCopy);

provide("novella-form", data);
</script>
