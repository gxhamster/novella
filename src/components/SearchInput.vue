<template>
<div class="relative">
  <InputText :title="title" :searchable="true" :modelValue="modelValue" @update:modelValue="doSearch" @inputFocus="isFocused = true" @inputBlur="isFocused = false" @searchClicked="setActive(true)" />
  <SearchDropdown v-show="isActive || isFocused" :searchText="modelValue" @itemClicked="sendItemData" @addItemClicked="isActive = false" :data="filteredResults" @mouseenter="isActive = true" @mouseleave="isActive = false"/>
</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onUpdated } from 'vue'
import InputText from './InputText'
import SearchDropdown from './SearchDropdown'
import { filterPromise } from '@/utils/search'

const emit = defineEmits(['update:modelValue', 'dropdownItemSelected'])
const props = defineProps({
  modelValue: String,
  title: String,
  searchData: {
    type: Array,
    required: true
  },
})
const isActive = ref(false)
const isFocused = ref(false)
const filteredResults = ref(props.searchData)

function setFilteredData(result) {
  filteredResults.value = result
}

function doSearch(searchText) {
  emit('update:modelValue', searchText)
  if (searchText == '') {
    setFilteredData(props.searchData)
  } else {
    filterPromise(searchText, props.searchData).then(setFilteredData).catch(setFilteredData)
  }
}

function sendItemData(obj) {
  // Close dropdown after selecting an item
  isActive.value = false
  emit('dropdownItemSelected', obj)
}

function setActive(btn = false) {
  if (btn) {
    isActive.value = false
    isFocused.value = false
  } else {
    isActive.value = true
    isFocused.value = true
  }
}

onUpdated(() => {
  if (props.modelValue === '') {
    setFilteredData(props.searchData)
  }
})

</script>
