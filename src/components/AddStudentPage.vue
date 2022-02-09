<template>
  <div class="container h-full w-full pr-20">
    <span class="text-4xl block text-center">Add New Student</span>
    <div class="grid grid-cols-2 gap-12 mt-32 pr-20 justify-center">
        <div v-for="title in input_titles" :key="title.id">
            <InputText :title="title"/>
        </div>
        <div class="flex justify-center col-span-2 mt-10" >
            <PageButton title="Save"/>
        </div>
        
    </div>
    
  </div>
</template>

<script>
import InputText from './InputText.vue'
import PageButton from './PageButton.vue'
export default {
    components: {
        InputText,
        PageButton
    },
    data() {
        return {
            input_titles: ["Student Name:", "Student Index:", "Student Address:", "Student Island:", "Student Grade:", "Student Phone:"]
        }
    }
}
</script>