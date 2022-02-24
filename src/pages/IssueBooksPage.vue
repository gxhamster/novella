<template>
  <div class="desktop:p-20 laptop:py-10 laptop:px-14 bg-secondary rounded-lgg flex-grow overflow-hidden">
    <span class="block desktop:text-3xl laptop:text-2xl font-medium">Issue Books to Students</span>
    <div class="flex justify-between desktop:mt-6 laptop:mt-3 gap-10">
      <div class="flex flex-col laptop:gap-6 desktop:gap-12">
        <span class="desktop:text-2xl laptop:text-1.5xl">Student Details</span>
        <div v-for="field in student_fields" :key="field.id" class="flex space-x-4">
          <InputText :title="field" :width="field == 'Student Grade' ? '48' : 'full'"/>
          <template v-if="search_fields.includes(field)" >
            <SearchButton class="self-end"/>
          </template>
        </div>
      </div>
      <div class="flex flex-col laptop:gap-6 desktop:gap-12">
        <span class="desktop:text-2xl laptop:text-1.5xl">Book Details</span>
        <div v-for="field in book_fields" :key="field.id" class="flex space-x-4">
          <InputText :title="field" width="full"/>
          <template v-if="search_fields.includes(field)" >
            <SearchButton class="self-end"/>
          </template>
        </div>
      </div>
    </div>
    <div class="flex justify-center space-x-12 laptop:mt-8 desktop:mt-14">
      <PageButton title="Cancel" background="bg-red-300"/>
      <PageButton title="Add"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from '@/components/InputText'
import PageButton from '@/components/PageButton'
import SearchButton from '@/components/SearchButton'

const search_fields = ref(["Student Index", "Book ID"])
const student_fields =  ref(["Student Index", "Student Name", "Student Grade"])
const book_fields =  ref(["Book ID", "Book Name", "Author"])
</script>
