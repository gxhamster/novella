<template>
  <div class="relative box">
    <InputText
      :title="title"
      :searchable="true"
      :modelValue="modelValue"
      :validate="validate"
      ref="elem"
      @update:modelValue="doSearch"
      @searchClicked="() => true"
    />
    <SearchDropdown
      class="dropdown"
      :searchText="modelValue"
      :data="filteredResults"
      @itemClicked="sendItemData"
      @addItemClicked="() => false"
    />
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps, defineEmits, onUpdated } from "vue";
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
const itemAdded = ref(false);
const filteredResults = ref(props.searchData);

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
  itemAdded.value = true;
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
