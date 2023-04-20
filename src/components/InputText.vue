<template>
  <div class="relative">
    <label
      class="block mb-2 laptop:text-sm desktop:text-md text-gray-700"
      :for="(title as string)"
      >{{ title }}</label
    >
    <div class="flex space-x-2 items-start">
      <div class="relative" :class="width !== '' ? widthFormat : ''">
        <div
          v-if="isPhone"
          class="absolute rounded-lgg text-gray-500 phone-label"
        >
          +960
        </div>
        <input
          alt="Text Input"
          :placeholder="placeholder"
          class="transition duration-300 apperance-none border-2 rounded-full bg-secondary pr-8 desktop:py-2 laptop:py-1"
          :class="inputStyle"
          :id="(title as string)"
          ref="inputRef"
          :name="(title as string)"
          :readonly="!canEdit"
          :disabled="!canEdit"
          :value="modelValue"
          @input="inputEvent"
          @blur="emit('inputBlur')"
          @focus="emit('inputFocus')"
        />
        <AlertCircle
          v-show="showError || validationError"
          class="absolute text-red-400 right-2 laptop:top-2 desktop:top-3"
          :size="20"
        />
        <MagnifyIcon
          v-if="searchable && !showError && !validationError"
          class="absolute right-3 laptop:top-2 desktop:top-3 text-primary"
          :size="22"
        />
      </div>
    </div>
    <span
      v-show="showError || validationError"
      class="text-red-400 whitespace-nowrap text-sm flex space-x-1 px-2 absolute -bottom-5"
    >
      <span>
        {{ errorMessage }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineEmits,
  ref,
  watch,
  defineExpose,
  withDefaults,
} from "vue";
import { filteredTextInput } from "@/utils/helper";
import AlertCircle from "vue-material-design-icons/AlertCircle";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";

const emit = defineEmits([
  "update:modelValue",
  "searchClicked",
  "inputBlur",
  "inputFocus",
]);

type SizeVariants = "sm" | "md" | "lg";

interface Props {
  title: string | number;
  modelValue: string;
  searchable?: boolean;
  isPhone?: boolean;
  width?: string;
  validate?: any;
  canEdit?: boolean;
  placeholder?: string;
  size?: SizeVariants;
}

const props = withDefaults(defineProps<Props>(), {
  isPhone: false,
  width: "full",
  canEdit: true,
  placeholder: "",
  size: "md",
});

const validationError = ref(false);
const showError = ref(false);
const errorMessage = ref<string | null>("");
const widthFormat = computed(() => `w-${props.width}`);
const inputStyle = computed(() => {
  let result = [];
  if (validationError.value || showError.value) {
    result.push("border-red-400");
  } else {
    result.push(
      "border-border hover:border-border-hover focus:border-border-focus"
    );
  }
  if (props.isPhone) {
    result.push("desktop:pl-14 laptop:pl-14");
  } else {
    result.push("laptop:pl-3 desktop:pl-4");
  }

  result.push(props.width !== "" ? widthFormat.value : "");
  result.join(" ");
  return result;
});

function checkIfValid(value: string) {
  if (props.validate) {
    const { result, message } = props.validate(value);
    if (!result) {
      validationError.value = true;
      showError.value = false;
      errorMessage.value = message;
    } else {
      validationError.value = false;
      showError.value = false;
    }
  }
}

function inputEvent(event: Event) {
  emit("update:modelValue", filteredTextInput(event.target.value));
  checkIfValid(event.target.value);
}

watch(
  () => props.modelValue,
  () => {
    checkIfValid(props.modelValue);
  }
);

function checkEmpty() {
  if (props.modelValue === "") {
    showError.value = true;
    errorMessage.value = `${props.title} is required`;
  } else {
    showError.value = false;
  }
}

// Used to hide error after required error is shown
function hideError() {
  showError.value = false;
}

defineExpose({
  checkEmpty,
  hideError,
  showError,
  validationError,
});
</script>

<style scoped>
.phone-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
}
</style>
