<template>
  <div class="desktop:p-20 max:p-28 laptop:py-12 laptop:px-14 bg-secondary rounded-lgg flex-grow overflow-hidden">
    <span class="block desktop:text-3xl laptop:text-2xl font-medium">Add New Student</span>
    <div class="grid grid-cols-2 desktop:mt-16 laptop:mt-4 desktop:gap-y-14 laptop:gap-y-8 gap-x-14">
      <div v-for="field in student_fields" :key="field.id" class="flex space-x-4">
        <InputText :title="field" :width="field == 'Student Grade' ? '48' : 'full'"/>
      </div>
      <div class="flex justify-center col-span-2 ">
        <PageButton title="Save"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from '@/components/InputText'
import PageButton from '@/components/PageButton'

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
