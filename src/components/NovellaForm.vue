<template>
  <form @submit.prevent="checkBeforeSubmit(data)"><slot></slot></form>
</template>

<script setup lang="ts">
import { provide, ref, defineProps, withDefaults } from "vue";

export interface FormData {
  [key: string]: {
    value: string;
    validationStatus?: boolean;
  };
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

function checkBeforeSubmit(data: FormData) {
  for (const [, values] of Object.entries(data)) {
    if (!values.validationStatus) {
      console.error(`(-) Cannot submit ${values.value} is not valid`);
      return;
    }
  }
  props.handleSubmit(data);
}

provide("novella-form", data);
</script>
