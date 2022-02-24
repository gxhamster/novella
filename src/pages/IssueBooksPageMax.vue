
<template>
  <div class="desktop:p-20 laptop:p-12 bg-secondary rounded-lgg flex-grow overflow-hidden">
    <span class="block text-3xl font-medium">Issue Books to Students</span>
    <div class="flex justify-between desktop:mt-6 laptop:mt-5 gap-4">
      <div class="flex flex-col gap-10 ">
        <span class="text-2xl">Student Details</span>
        <div v-for="field in student_fields" :key="field.id" class="flex space-x-4">
          <InputText :title="field" :width="field == 'Student Grade' ? '48' : 'full'"/>
          <template v-if="search_fields.includes(field)" >
            <SearchButton class="self-end"/>
          </template>
        </div>
      </div>
      <div class="flex flex-col gap-10 ">
        <span class="text-2xl">Book Details</span>
        <div v-for="field in book_fields" :key="field.id" class="flex space-x-4">
          <InputText :title="field" width="full"/>
          <template v-if="search_fields.includes(field)" >
            <SearchButton class="self-end"/>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from '@/components/InputText'
import SearchButton from '@/components/SearchButton'

export default {
  components: {
    InputText,
    SearchButton
  },
  data() {
    return {
      search_fields: ["Student Index", "Book ID"],
      student_fields: ["Student Index", "Student Name", "Student Grade", "Student Name", "Student Name"],
      book_fields: ["Book ID", "Book Name", "Author", "Book Name", "Book Name"]
    }
  }
}
</script>
