<template>
  <form @submit.prevent="checkBeforeSubmit(formData)">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import {
  provide,
  ref,
  defineProps,
  withDefaults,
  Ref,
  defineExpose,
} from "vue";

export interface FormDataField {
  value: string;
  validationStatus?: boolean;
}
export interface FormData {
  [key: string]: FormDataField;
}

export interface FormDataProvider {
  formData: Ref<FormData>;
  // eslint-disable-next-line
  setFormData: (field: string, fieldData: FormDataField) => void;
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
const formData = ref<FormData>(defaultValuesCopy);

function setFormData(field: string, fieldData: FormDataField) {
  formData.value[field] = fieldData;
}

function checkBeforeSubmit(data: FormData) {
  const formErrors: Array<string> = [];
  for (const [key, values] of Object.entries(data)) {
    if (!values.validationStatus) {
      const errorMessage = `Cannot submit, ${key} is not valid`;
      formErrors.push(errorMessage);
      console.error(`(-) ${errorMessage}`);
    }
  }
  if (formErrors.length === 0) props.handleSubmit(data);
}

provide<FormDataProvider>("novella-form", { formData, setFormData });
defineExpose({
  setFormData,
});
</script>
