<template>
  <div class="space-y-1">
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
    <span class="block text-red-400" v-if="!validationErrorStatus.result">
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
  onMounted,
  ref,
  withDefaults,
  Ref,
} from "vue";
import { FormData } from "./NovellaForm.vue";
import { ValidationResult } from "@/utils/validation";

/*
  TODO:
  - Handle validation
  - Handle prefix and suffix icons
  - Different input types
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
const formData = inject<Ref<FormData>>("novella-form");
const validationErrorStatus = ref<ValidationResult>({
  result: true,
  message: "",
});
// If seperate v-model not applied in input use form supplied values and update it
const currentInputValue = computed(() => {
  if (!props.modelValue && formData?.value[props.name])
    return formData?.value[props.name].value;
  else return props.modelValue;
});
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
  // checkInputValidationStatus should be called before setting form data
  checkInputValidationStatus(target.value);
  if (formData?.value) {
    formData.value[props.name] = {
      value: target.value,
      validationStatus: validationErrorStatus.value.result,
    };
  } else {
    throw Error("(-) Form Data was not provided");
  }
  emit("update:modelValue", target.value);
}

function checkInputValidationStatus(value: string | number) {
  const { result, message } = props.validation(value);
  validationErrorStatus.value = { result, message };
}

onMounted(() => {
  // If default input value not given set default value from form defaults
  if (!props.modelValue && formData?.value[props.name]) {
    const formDataValue = formData.value[props.name].value;
    checkInputValidationStatus(formDataValue);
    emit("update:modelValue", formDataValue);
  }
});
</script>
