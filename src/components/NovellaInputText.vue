<template>
  <div class="space-y-1">
    <label :for="props.name">{{ props.label }}</label>
    <input
      @input="handleInput"
      :value="currentInputValue"
      :placeholder="props.placeholder"
      :name="props.name"
      :id="props.name"
      type="text"
      class="border-2 border-border rounded-full px-4 block w-full hover:border-border-hover focus:border-border-focus bg-secondary pr-8 desktop:py-2 laptop:py-1"
    />
    <span class="block" v-if="validationError">{{ props.help }}</span>
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
} from "vue";
import { FormData } from "./NovellaForm.vue";

/*
  TODO:
  - Handle validation
  - Handle prefix and suffix icons
  - Different input types
*/

interface NovellaInputTextProps {
  label: string;
  name: string;
  // eslint-disable-next-line
  validation: (input: string | number) => boolean;
  help?: string;
  placeholder?: string;
  modelValue?: string;
}
const props = withDefaults(defineProps<NovellaInputTextProps>(), {
  validation: () => true,
  help: "Invalid input",
  modelValue: "",
});
const emit = defineEmits(["update:modelValue"]);
const formData = inject<FormData>("novella-form");
const validationError = ref(false);
// If seperate v-model not applied in input use form supplied values and update it
const currentInputValue = computed(() => {
  if (!props.modelValue && formData?.value) return formData?.value[props.name];
  else return props.modelValue;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (formData?.value) {
    formData.value[props.name] = target.value;
  } else {
    throw Error("(-) Cannot set form data from component");
  }
  checkInputValidationStatus(target.value);
  emit("update:modelValue", target.value);
}

function checkInputValidationStatus(value: string | number) {
  const validationResult = props.validation(value);
  if (!validationResult) {
    validationError.value = true;
  } else {
    validationError.value = false;
  }
}

onMounted(() => {
  // If default input value not given set default value from form defaults
  if (!props.modelValue && formData?.value) {
    emit("update:modelValue", formData.value[props.name]);
  }
});
</script>
