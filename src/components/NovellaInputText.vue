<template>
  <div class="space-y-1 m-2 h-20 relative">
    <label :for="props.name" class="text-sm text-gray-600">{{
      props.label
    }}</label>
    <slot name="prefix"></slot>
    <input
      @input="handleInput"
      :value="currentInputValue"
      :placeholder="props.placeholder"
      :name="props.name"
      :type="props.type"
      :id="props.name"
      class="border-2 rounded-full px-4 block w-full bg-secondary pr-8 desktop:py-2 laptop:py-1"
      :class="inputBorderColor"
    />
    <slot name="suffix"></slot>
    <span
      class="m-0 block text-red-400 text-sm"
      v-if="!validationErrorStatus.result"
    >
      {{ validationErrorStatus.message }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineEmits,
  inject,
  ref,
  watchEffect,
  withDefaults,
  onMounted,
} from "vue";
import { FormDataProvider } from "./NovellaForm.vue";
import { ValidationResult } from "@/utils/validation";

export interface NovellaInputTextProps {
  label: string;
  name: string;
  type?: "text" | "password" | "date";
  // eslint-disable-next-line
  validation?: (input: string | number) => ValidationResult;
  placeholder?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<NovellaInputTextProps>(), {
  type: "text",
  validation: () => ({ result: true, message: "Invalid input" }),
  modelValue: "",
});
const emit = defineEmits(["update:modelValue"]);
const { formData, setFormData } = inject<FormDataProvider>("novella-form", {
  formData: ref({}),
  setFormData: () => true,
});

const currentInputValue = computed({
  get() {
    if (!props.modelValue && formData?.value[props.name])
      return formData?.value[props.name].value;
    else return props.modelValue;
  },
  set(newValue: string) {
    if (formData.value[props.name]) {
      setFormData(props.name, {
        value: newValue,
        validationStatus: validationErrorStatus.value.result,
      });
    }
    emit("update:modelValue", newValue);
  },
});

const validationErrorStatus = ref<ValidationResult>(
  props.validation(currentInputValue.value)
);
const inputBorderColor = computed(() => {
  return validationErrorStatus.value.result
    ? "border-border hover:border-border-hover focus:border-border-focus"
    : "border-red-400";
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  currentInputValue.value = target.value;
}

function setInputValidationStatus(value: string | number) {
  const { result, message } = props.validation(value);
  validationErrorStatus.value = { result, message };
  return result;
}

watchEffect(() => {
  const result = setInputValidationStatus(currentInputValue.value);
  setFormData(props.name, {
    value: currentInputValue.value,
    validationStatus: result,
  });
});

onMounted(() => emit("update:modelValue", currentInputValue.value));
</script>

<style>
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>
