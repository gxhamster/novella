<template>
  <div class="relative">
    <novella-input-text v-bind="props" v-model="inputRef">
      <template #suffix>
        <button @click="searchButtonClicked" class="absolute right-3 top-8">
          <magnify-icon class="text-primary" :size="22" />
        </button>
      </template>
    </novella-input-text>
    <novella-search-dropdown v-if="searchData.length" :search-data="searchData">
      <template #icon>
        <account-group-icon :size="22" class="text-white" />
      </template>
    </novella-search-dropdown>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { ValidationResult } from "@/utils/validation";
import NovellaInputText from "./NovellaInputText.vue";
import NovellaSearchDropdown, {
  NovellaSearchDropdownField,
} from "./NovellaSearchDropdown.vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";

// FIXME: Vue compiler throws error when using imported interface in defineProps
interface NovellaSearchInputTextProps {
  label: string;
  name: string;
  type?: "text" | "password" | "date";
  // eslint-disable-next-line
  validation?: (input: string | number) => ValidationResult;
  placeholder?: string;
  modelValue?: string;
}

const props = defineProps<NovellaSearchInputTextProps>();
const inputRef = ref("");
const searchData = ref<NovellaSearchDropdownField[]>([]);

// TODO: component should not be aware of the outside state
async function searchButtonClicked() {}
</script>
