<template>
  <PageContainer title="Add New Book">
    <div class="grid grid-cols-2 h-full gap-x-14">
      <div v-for="(field, index) in book_fields" :key="field.title" class="relative" :class="field.full ? 'col-span-2' : 'col-span-1'">
        <SearchInput v-if="field.searchable" @dropdownItemSelected="(obj) => book_fields[index].text = obj.title" :searchData="results" v-model="book_fields[index].text" :title="field.title"/>
        <InputText v-else v-model="book_fields[index].text" width="full" :title="field.title"/>
      </div>
      <div class="flex gap-x-6">
        <div v-for="(field, index) in small_fields_left" :key="field.title">
          <InputText v-model="input_text_small[index]" :searchable="field.searchable" :title="field.title"/>
        </div>
      </div>
      <div class="flex gap-x-6">
        <div v-for="(field, index) in small_fields_right" :key="field.title">
          <InputText v-model="input_text_small[index]" :searchable="field.searchable" :title="field.title"/>
        </div>
      </div>
    </div>
    <div class="flex justify-center space-x-12 col-span-2 mt-5">
      <PageButton @click="cleanTextInputs" title="Cancel" background="cancel-button-red"/>
      <PageButton title="Save"/>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageButton from '@/components/PageButton'
import InputText from '@/components/InputText'
import PageContainer from '@/components/PageContainer'
import SearchInput from '@/components/SearchInput'
import { bookStore } from '@/stores/store'
import { prettyCapitalize } from '@/utils/helper'
import { groupByKey, SearchItemClass } from '@/utils/search'

const bookstore = bookStore()
const input_text = ref([])
const input_text_small = ref([])
const results = ref([])

const book_fields = ref([
  {title: "Title", full: false, searchable: false, dropdown: false, text: ''},
  {title: "Author", full: false, searchable: true, dropdown: false, text: ''},
  {title: "Book Number", full: false, searchable: false, dropdown: false, text: ''},
  {title: "Genre", full: false, searchable: true, dropdown: false, text: ''},
  {title: "DDC", full: false, searchable: false, dropdown: false, text: ''},
  {title: "Language", full: false, searchable: false, dropdown: false, text: ''},
])
const small_fields_left = [
  {title: "Edition", full: false, searchable: false},
  {title: "Pages", full: false, searchable: false},
]

const small_fields_right = [
  {title: "Volume", full: false, searchable: false},
  {title: "Year", full: false, searchable: false}
]

function storeGetData() {
  // Remove duplicate titles
  const book_results = [...bookstore.books.map((v) => new SearchItemClass(prettyCapitalize(v.author === '' ? 'N/A' : v.author), 'user', {
  }))]

  // Group objects by author
  const grouped_result = groupByKey('title', book_results, false)

  const final_result = []
  for (const arr of grouped_result.values()) {
    if (arr.length >= 1)
      arr[0].optional['books written'] = arr.length
    final_result.push(arr[0])
  }
  return [...final_result]
}

bookstore.$onAction(({name, after}) => {
  if (name === "setDataFetched") {
    after(() => {
      results.value = storeGetData()
    })
  }
}, true)

function cleanTextInputs() {
  input_text.value = input_text.value.map(() => '')
}

onMounted(() => {
  results.value = storeGetData()
})

</script>
