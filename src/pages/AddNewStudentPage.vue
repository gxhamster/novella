<template>
  <PageContainer title="Add New Student">
    <div class="grid grid-cols-2 content-between h-full gap-x-14">
      <div v-for="(field, index) in student_fields" :key="field.id" class="flex space-x-4">
        <InputText v-model="input_text[index]" :title="field" :width="field == 'Student Grade' ? '48' : 'full'"/>
      </div>
      <div class="flex justify-center col-span-2 mt-4">
        <PageButton @click="clear_input_text" title="Save"/>
      </div>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref } from 'vue'
import InputText from '@/components/InputText'
import PageButton from '@/components/PageButton'
import PageContainer from '@/components/PageContainer'

const input_text = ref([])
const student_fields = ["Student Index", "Student Name", "Student Island", "Student Address", "Student Grade", "Student Phone"]
const clear_input_text = () => {
  input_text.value = input_text.value.map(() => '')
}
</script>
