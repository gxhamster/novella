<template>
  <div class="relative">
    <label
      class="block mb-2 laptop:text-sm desktop:text-md text-gray-700"
      :for="title"
      >{{ title }}</label
    >
    <div class="flex space-x-2 items-center">
      <div class="relative" :class="width !== '' ? widthFormat : ''">
        <div
          v-if="isPhone"
          class="absolute rounded-lgg text-gray-500 phone-label"
        >
          +960
        </div>
        <input
          :id="title"
          :name="title"
          :readonly="!canEdit"
          :disabled="!canEdit"
          :value="modelValue"
          @input="inputEvent"
          @blur="emit('inputBlur')"
          @focus="emit('inputFocus')"
          class="transition duration-300 apperance-none border-2 rounded-full bg-secondary pr-8 desktop:py-2 laptop:py-1"
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
  isPhone: {
    type: Boolean,
    default: false,
  },
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

<style scoped>
.phone-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
}
</style>
