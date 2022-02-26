<template>
  <div class="desktop:p-20 max:p-28 laptop:py-12 laptop:px-14 bg-secondary rounded-lgg flex-grow overflow-hidden">
    <span class="block desktop:text-3xl laptop:text-2xl font-medium">Add New Book</span>
    <div class="grid grid-cols-2 desktop:mt-16 laptop:mt-4 desktop:gap-y-14 laptop:gap-y-8 laptop:gap-x-14 desktop:gap-x-20 max:gap-x-24">
      <div v-for="(field, index) in book_fields" :key="field" class="flex space-x-4">
        <InputText v-model="input_text[index]" :title="field" :width="field == 'Year' || field == 'Pages' ? '48' : 'full'"/>
      </div>
      <div class="flex justify-center col-span-2 mt-4">
        <PageButton title="Save"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' 
import PageButton from '@/components/PageButton'
import InputText from '@/components/InputText'

const input_text = ref([])
const book_fields = ["Title", "DDC", "Subject", "Author", "Year", "Pages"]
</script>
