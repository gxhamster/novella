<template>
  <button
    class="hover:opacity-90 transition duration-150 px-4 desktop:py-3 cancel-button-red laptop:py-2 h-12 w-28 text-white rounded-full"
    @click.prevent="clearAllFields"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, inject, ref } from "vue";
import { FormDataProvider } from "./NovellaForm.vue";

interface Props {
  label: string;
}
defineProps<Props>();
const { formData, setFormData } = inject<FormDataProvider>("novella-form", {
  formData: ref({}),
  setFormData: () => true,
});

function clearAllFields() {
  for (const field in formData.value) {
    setFormData(field, { value: "", validationStatus: true });
  }
}
</script>
