<template>
  <div class="desktop:p-20 laptop:p-16 bg-secondary rounded-lgg flex-grow overflow-hidden">
    <span class="block text-3xl font-medium">Issue Books to Students</span>
    <div class="flex justify-between mt-6 gap-2">
      <div class="flex flex-col gap-10 ">
        <span class="text-2xl">Student Details</span>
        <div v-for="field in student_fields" :key="field.id">
          <InputText :title="field" :width="field == 'Student Grade' ? 48 : 82"/>
        </div>
      </div>
      <div class="flex flex-col gap-10 ">
        <span class="text-2xl">Book Details</span>
        <div v-for="field in book_fields" :key="field.id">
          <InputText :title="field" width="80"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from './InputText'

export default {
  components: {
    InputText
  },
  data() {
    return {
      student_fields: ["Student Index", "Student Name", "Student Grade"],
      book_fields: ["Book ID", "Book Name", "Author"]
    }
  }
}
</script>
