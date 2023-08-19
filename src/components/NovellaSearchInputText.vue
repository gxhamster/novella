<template>
  <div class="relative box">
    <novella-input-text v-bind="props" v-model="inputRef">
      <template #suffix>
        <button @click="searchButtonClicked" class="absolute right-3 top-8">
          <magnify-icon class="text-primary" :size="22" />
        </button>
      </template>
    </novella-input-text>
    <novella-search-dropdown
      class="dropdown"
      @dropdownItemClicked="
        (data) => {
          inputRef = data.title;
          $emit('dropdownItemClicked', data);
        }
      "
      v-if="props.searchItems.length"
      :search-data="props.searchItems"
    >
      <template #icon>
        <account-group-icon :size="22" class="text-gray-700" />
      </template>
    </novella-search-dropdown>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";
import { ValidationResult } from "@/utils/validation";
import NovellaInputText from "./NovellaInputText.vue";
import NovellaSearchDropdown, {
  NovellaSearchDropdownField,
} from "./NovellaSearchDropdown.vue";

// FIXME: Vue compiler throws error when using imported interface in defineProps
interface NovellaSearchInputTextProps {
  label: string;
  name: string;
  searchItems: NovellaSearchDropdownField[];
  type?: "text" | "password" | "date";
  // eslint-disable-next-line
  validation?: (input: string | number) => ValidationResult;
  placeholder?: string;
  modelValue?: string;
}

const props = defineProps<NovellaSearchInputTextProps>();
const inputRef = ref("");

// TODO: component should not be aware of the outside state
async function searchButtonClicked() {}
</script>

<!-- Styles to make dropdown appear only when input is focused (pure CSS way)-->
<style scoped>
.dropdown {
  will-change: transform;
  will-change: opacity;
  transform: translateY(-15px);
  transition: all 250ms ease;
  opacity: 0;
  pointer-events: none;
}

.dropdown:hover {
  transform: translateY(0px);
  opacity: 1;
  pointer-events: auto;
}

.box:focus-within .dropdown {
  transform: translateY(0px);
  pointer-events: auto;
  opacity: 1;
}
</style>
