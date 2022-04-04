<template>
  <div class="relative">
    <InputText
      :title="title"
      :searchable="true"
      :modelValue="modelValue"
      :validate="validate"
      ref="elem"
      @update:modelValue="doSearch"
      @inputFocus="isFocused = true"
      @inputBlur="isFocused = false"
      @searchClicked="toggleDropdown"
    />
    <SearchDropdown
      v-show="dropdownShouldShow"
      :searchText="modelValue"
      :data="filteredResults"
      @itemClicked="sendItemData"
      @addItemClicked="() => false"
    />
  </div>
</template>

<script setup>
import {
  ref,
  defineExpose,
  defineProps,
  defineEmits,
  computed,
  onUpdated,
} from "vue";
import InputText from "./InputText";
import SearchDropdown from "./SearchDropdown";
import { filterPromise } from "@/utils/search";

const emit = defineEmits(["update:modelValue", "dropdownItemSelected"]);
const props = defineProps({
  modelValue: [String, Number],
  title: String,
  validate: Function,
  searchData: {
    type: Array,
    required: true,
  },
});

const elem = ref(null);
const isFocused = ref(false);
const dropdownShouldShow = computed(() => {
  if (isFocused.value) return true;
  else return false;
});
const filteredResults = ref(props.searchData);

function toggleDropdown() {
  dropdownShouldShow.value = !dropdownShouldShow.value;
}

function setFilteredData(result) {
  filteredResults.value = result;
}

function doSearch(searchText) {
  emit("update:modelValue", searchText);
  if (searchText == "") {
    setFilteredData(props.searchData);
  } else {
    filterPromise(searchText, props.searchData)
      .then(setFilteredData)
      .catch(setFilteredData);
  }
}

function sendItemData(obj) {
  // Close dropdown after selecting an item
  dropdownShouldShow.value = false;
  emit("dropdownItemSelected", obj);
}

// Call the checkEmpty function on input text
function checkEmpty() {
  elem.value.checkEmpty();
}

function hideError() {
  elem.value.hideError();
}

defineExpose({
  checkEmpty,
  hideError,
});

onUpdated(() => {
  if (props.modelValue === "") {
    setFilteredData(props.searchData);
  }
});
</script>
