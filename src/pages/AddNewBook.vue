<template>
  <PageContainer title="Add New Book">
    <div class="grid grid-cols-2 content-between h-full laptop:gap-x-14 desktop:gap-x-20 max:gap-x-24">
      <div v-for="(field, index) in book_fields" :key="field.title" class="flex space-x-4" :class="field.full ? 'col-span-2' : 'col-span-1'">
        <InputText v-model="input_text[index]" :title="field.title" :width="field.title == 'Year' || field.title == 'Pages' ? '48' : 'full'"/>
      </div>
      <div class="flex justify-center col-span-2 mt-5">
        <PageButton title="Save"/>
      </div>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref } from 'vue'
import PageButton from '@/components/PageButton'
import InputText from '@/components/InputText'
import PageContainer from '@/components/PageContainer'

const input_text = ref([])
const book_fields = [
  {title: "Title", full: false},
  {title: "Author", full: false},
  {title: "Genre", full: false},
  {title: "Language", full: false},
  {title: "DDC", full: false},
  {title: "Year", full: false},
  {title: "Edition", full: false},
  {title: "Pages", full: false},
  {title: "Publisher", full: false},
  {title: "Stock", full: false},
  {title: "Description", full: true}
]
</script>
