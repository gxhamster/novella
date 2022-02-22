<template>
  <div class="desktop:p-20 max:p-28 laptop:p-12 bg-secondary rounded-lgg flex-grow scrollbar-thin scrollbar-thumb-transparent scrollbar-track-gray-transparent overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
    <span class="block text-3xl font-medium">Add New Student</span>
    <div class="grid grid-cols-2 desktop:mt-16 laptop:mt-4 desktop:gap-y-12 laptop:gap-y-8 gap-x-6">
      <div v-for="field in student_fields" :key="field.id" class="flex space-x-4">
        <InputText :title="field" :width="field == 'Student Grade' ? '48' : 'full'"/>
      </div>
      <div class="flex justify-center col-span-2">
        <PageButton title="Save"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from './InputText'
import PageButton from './PageButton'

export default {
  components: {
    InputText,
    PageButton
  },
  data() {
    return {
      search_fields: ["Student Index", "Student Name"],
      student_fields: ["Student Index", "Student Name", "Student Island", "Student Address", "Student Grade", "Student Phone"],
    }
  }
}
</script>
