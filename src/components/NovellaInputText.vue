<template>
  <div class="space-y-1 m-2 h-20 flex-shrink-0">
    <label :for="props.name">{{ props.label }}</label>
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
} from "vue";
import { FormDataProvider } from "./NovellaForm.vue";
import { ValidationResult } from "@/utils/validation";

/*
  TODO:
  - Handle prefix and suffix icons
*/
interface NovellaInputTextProps {
  label: string;
  name: string;
  type?: "text" | "password";
  // eslint-disable-next-line
  validation: (input: string | number) => ValidationResult;
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
    } else {
      // When not using values supplied by the form element
      emit("update:modelValue", newValue);
    }
  },
});

const validationErrorStatus = ref<ValidationResult>(
  props.validation(currentInputValue.value)
);
const inputBorderColor = computed(() => {
  const validStateClass =
    "border-border hover:border-border-hover focus:border-border-focus";
  const invalidStateClass = "border-red-400";
  return validationErrorStatus.value.result
    ? validStateClass
    : invalidStateClass;
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
</script>
