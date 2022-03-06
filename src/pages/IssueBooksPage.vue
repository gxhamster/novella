<template>
    <PageContainer title="Issue Books to Students">
      <div class="flex gap-x-14 h-3/5">
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl">Student Details</span>
          <div class="flex flex-col justify-between flex-grow mt-6">
            <div v-for="(field, index) in student_fields" :key="field.id" class="flex space-x-4">
              <InputText v-model="textStartArray1[index]" :searchable="field.searchable" :title="field.name" :width="field.name == 'Student Grade' ? '48' : 'full'"/>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl">Book Details</span>
          <div class="flex flex-col flex-grow justify-between mt-6">
            <div v-for="(field, index) in book_fields" :key="field.id" class="flex space-x-4">
              <InputText v-model="textStartArray2[index]" :searchable="field.searchable" :title="field.name" width="full"/>
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
        <PageButton @click="sendToServer" title="Add"/>
      </div>
    </PageContainer>
</template>

<script setup>
import { ref, watch } from 'vue'
import InputText from '@/components/InputText'
import PageButton from '@/components/PageButton'
import DateInput from '@/components/DateInput'
import PageContainer from '@/components/PageContainer'
import { fiveDaysAfterDate } from '@/utils/helper'

// Student input
const textStartArray1 = ref([])
// Book input
const textStartArray2 = ref([])
// Date input
const issueDate = ref(new Date())
const dueDate = ref(fiveDaysAfterDate(issueDate.value))

// Due Date automatically becomes 5 days after
watch(issueDate, () => {
  dueDate.value = fiveDaysAfterDate(issueDate.value)
})

const cleanTextInputs = () => {
    textStartArray1.value = textStartArray1.value.map(() => '')
    textStartArray2.value = textStartArray2.value.map(() => '')
    dueDate.value = new Date()
    issueDate.value = new Date()
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
