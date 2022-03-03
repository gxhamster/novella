<template>
  <div class="desktop:p-20 laptop:py-10 laptop:px-14 bg-secondary rounded-lgg flex-grow">
    <span class="block desktop:text-3xl laptop:text-2xl font-medium">Issue Books to Students</span>
    <div class="main-container flex flex-col justify-between">
      <div class="flex desktop:mt-6 laptop:mt-3 gap-x-14 h-3/5">
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl">Student Details</span>
          <div class="flex flex-col justify-between flex-grow mt-10">
            <div v-for="(field, index) in student_fields" :key="field.id" class="flex space-x-4">
              <InputText v-model="textStartArray1[index]" :title="field.name" :width="field.name == 'Student Grade' ? '48' : 'full'"/>
              <template v-if="field.searchable == true" >
                <SearchButton class="self-end"/>
              </template>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl">Book Details</span>
          <div class="flex flex-col flex-grow justify-between mt-10">
            <div v-for="(field, index) in book_fields" :key="field.id" class="flex space-x-4">
              <InputText v-model="textStartArray2[index]" :title="field.name" width="full"/>
              <template v-if="field.searchable == true" >
                <SearchButton class="self-end"/>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-12 mt-10">
        <div v-for="(field, index) in date_fields" :key="field.name">
          <DateInput v-model="dateArray[index]" :title="field.name"/>
        </div>
      </div>
      <div class="flex justify-center space-x-12 mt-10">
        <PageButton @click="cleanTextInputs" title="Cancel" background="cancel-button-red"/>
        <PageButton @click="sendToServer" title="Add"/>
      </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from '@/components/InputText'
import PageButton from '@/components/PageButton'
import SearchButton from '@/components/SearchButton'
import DateInput from '@/components/DateInput'

// Student input
const textStartArray1 = ref([])
// Book input
const textStartArray2 = ref([])
// Date input
const dateArray = ref([new Date(), new Date()])

const cleanTextInputs = () => {
    textStartArray1.value = textStartArray1.value.map(() => '')
    textStartArray2.value = textStartArray2.value.map(() => '')
    dateArray.value = dateArray.value.map(() => '')
}

const sendToServer = async () => {
  const URL = 'http://localhost:3000/issue_book'
  const response = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify()
  })
  response.json().then(d => console.log(d))
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

<style scoped>
</style>
