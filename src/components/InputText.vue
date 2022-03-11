<template>
  <div>
    <label class="block mb-2 laptop:text-sm desktop:text-md" for="text input">{{
      title
    }}</label>
    <div class="flex space-x-2 items-center">
      <input
        :readonly="!canEdit"
        :value="modelValue"
        @input="inputEvent"
        @blur="emit('inputBlur')"
        @focus="emit('inputFocus')"
        class="outline-none apperance-none border-2 rounded-full bg-secondary border-border desktop:py-2 desktop:px-4 laptop:py-1 laptop:px-3"
        :class="width !== '' ? widthFormat : ''"
        alt="Text Input"
      />
      <SearchButton v-if="searchable" @click="emit('searchClicked')" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { filteredTextInput } from "@/utils/helper";
import SearchButton from "@/components/SearchButton";

const emit = defineEmits([
  "update:modelValue",
  "searchClicked",
  "inputBlur",
  "inputFocus",
]);
const props = defineProps({
  title: String,
  width: {
    default: "full",
  },
  canEdit: {
    type: Boolean,
    default: true,
  },
  modelValue: String,
  searchable: Boolean,
});
const widthFormat = computed(() => `w-${props.width}`);
function inputEvent(event) {
  emit("update:modelValue", filteredTextInput(event.target.value));
}
</script>
