<template>
  <div class="relative">
    <label
      class="block mb-2 laptop:text-sm desktop:text-md text-gray-700"
      :for="title"
      >{{ title }}</label
    >
    <div class="flex space-x-2 items-center">
      <div class="relative" :class="width !== '' ? widthFormat : ''">
        <input
          :id="title"
          :name="title"
          :readonly="!canEdit"
          :disabled="!canEdit"
          :value="modelValue"
          @input="inputEvent"
          @blur="emit('inputBlur')"
          @focus="emit('inputFocus')"
          class="transition duration-300 apperance-none border-2 rounded-full bg-secondary pr-8 desktop:py-2 desktop:pl-4 laptop:py-1 laptop:pl-3"
          :class="inputStyle"
          alt="Text Input"
        />
        <AlertCircle
          v-show="showError"
          class="absolute text-red-400 right-2 laptop:top-2 desktop:top-3"
          :size="20"
        />
      </div>
      <SearchButton v-if="searchable" @click="emit('searchClicked')" />
    </div>
    <span
      v-show="showError"
      class="text-red-400 text-sm flex space-x-1 px-2 absolute -bottom-5"
    >
      <span>
        {{ errorMessage }}
      </span>
    </span>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from "vue";
import { filteredTextInput } from "@/utils/helper";
import SearchButton from "@/components/SearchButton";
import AlertCircle from "vue-material-design-icons/AlertCircle";

const emit = defineEmits([
  "update:modelValue",
  "searchClicked",
  "inputBlur",
  "inputFocus",
]);
const props = defineProps({
  title: [String, Number],
  width: {
    default: "full",
  },
  validate: Function,
  canEdit: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
  searchable: Boolean,
});
const showError = ref(false);
const errorMessage = ref("");
const widthFormat = computed(() => `w-${props.width}`);
const inputStyle = computed(() => {
  let result = [];
  if (showError.value) {
    result.push("border-red-400 ");
  } else {
    result.push(
      "border-border hover:border-border-hover focus:border-border-focus "
    );
  }
  result.join(" ");
  result += props.width !== "" ? widthFormat.value : "";
  return result;
});
function inputEvent(event) {
  emit("update:modelValue", filteredTextInput(event.target.value));
  if (props.validate) {
    const { result, message } = props.validate(event.target.value);
    if (!result) {
      showError.value = true;
      errorMessage.value = message;
    } else {
      showError.value = false;
    }
  }
}
</script>
