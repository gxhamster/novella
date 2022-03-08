<template>
    <PageContainer title="Issue Books to Students">
      <div class="flex gap-x-14 h-3/5">
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl">Student Details</span>
          <div class="flex flex-col justify-between flex-grow mt-6">
            <div v-for="(field, index) in student_fields" :key="field.id" class="flex space-x-4">
              <SearchInput v-if="field.searchable" v-model="textStartArray1[index]" :searchData="results_students" @dropdownItemSelected="autocompleteStudentData" :title="field.name"/>
              <InputText :canEdit="false" v-else v-model="textStartArray1[index]" class="w-full" :title="field.name" :width="field.name == 'Student Grade' ? '48' : 'full'"/>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl">Book Details</span>
          <div class="flex flex-col flex-grow justify-between mt-6">
            <div v-for="(field, index) in book_fields" :key="field.id" class="flex space-x-4">
              <SearchInput v-if="field.searchable" v-model="textStartArray2[index]" :searchData="results_books" @dropdownItemSelected="autocompleteBookData" :title="field.name"/>
              <InputText :canEdit="false" v-else v-model="textStartArray2[index]" class="w-full" :title="field.name" width="full"/>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-12">
        <DateInput v-model="issueDate" :title="date_fields[0].name"/>
        <DateInput v-model="dueDate" :title="date_fields[1].name"/>
      </div>
      <div class="flex justify-center space-x-12">
        <PageButton @click="cleanTextInputs" title="Cancel" background="cancel-button-red"/>
        <PageButton @click="cleanTextInputs" title="Add"/>
      </div>
    </PageContainer>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

import InputText from '@/components/InputText'
import PageButton from '@/components/PageButton'
import DateInput from '@/components/DateInput'
import PageContainer from '@/components/PageContainer'
import { fiveDaysAfterDate } from '@/utils/helper'
import SearchInput from '@/components/SearchInput'
import { userStore, bookStore } from '@/stores/store'
import { SearchItemClass } from '@/utils/search'
import { prettyCapitalize } from '@/utils/helper'


// Student input
const textStartArray1 = ref([])
// Book input
const textStartArray2 = ref([])
// Date input
const issueDate = ref(new Date())
const dueDate = ref(fiveDaysAfterDate(issueDate.value))
const results_students = ref([])
const results_books = ref([])
const userstore = userStore()
const bookstore = bookStore()

function autocompleteStudentData(obj) {
  textStartArray1.value[0] = obj.optional.index
  textStartArray1.value[1] = obj.title
  textStartArray1.value[2] = obj.optional.grade
}
function autocompleteBookData(obj) {
  textStartArray2.value[0] = obj.title
  textStartArray2.value[1] = obj.optional.title
  textStartArray2.value[2] = obj.optional.author
}

function userStoreGetData() {
  // Remove duplicate titles
  const user_results = [...userstore.users.map((v) => new SearchItemClass(prettyCapitalize(v.name), 'user', {
    index: v.index === '' ? 'N/A' : prettyCapitalize(v.index),
    grade: v.grade
  }))]

  return [...user_results]
}

function bookStoreGetData() {
  // Remove duplicate titles
  const book_results = [...bookstore.books.map((v) => new SearchItemClass(v.bnumber === '' ? 'N/A' : v.bnumber, 'book', {
    title: v.title === '' ? 'N/A' : prettyCapitalize(v.title),
    author: prettyCapitalize(v.author),
  }))]

  return [...book_results]
}
bookstore.$onAction(({name, after}) => {
  if (name === "setDataFetched") {
    after(() => {
      results_books.value = bookStoreGetData()
    })
  }
})
userstore.$onAction(({name, after}) => {
  if (name === "setDataFetched") {
    after(() => {
      results_students.value = userStoreGetData()
    })
  }
})

// Due Date automatically becomes 5 days after
watch(issueDate, () => {
  dueDate.value = fiveDaysAfterDate(issueDate.value)
})

// Please include any data fetching methods Here
// Otherwise if we change routes the data will not be fetched
onMounted(() => {
  results_students.value = userStoreGetData()
  results_books.value = bookStoreGetData()
})

const cleanTextInputs = () => {
    textStartArray1.value = textStartArray1.value.map(() => '')
    textStartArray2.value = textStartArray2.value.map(() => '')
    dueDate.value = new Date()
    issueDate.value = new Date()
}

const date_fields = [
  { name: "Issue Date", searchable: false},
  { name: "Due Date", searchable: false}
]

const student_fields =  [
  { name: "Student Index", searchable: true},
  { name: "Student Name", searchable: false},
  { name: "Student Grade", searchable: false}
]
const book_fields =  [
  { name: "Book ID", searchable: true},
  { name: "Book Name", searchable: false},
  { name: "Author", searchable: false}
]
</script>
