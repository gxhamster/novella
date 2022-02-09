<template>
  <div class="container h-full w-full pr-20">
    <span class="text-4xl block text-center">Add New Student</span>
    <div class="grid grid-cols-2 gap-12 mt-32 pr-20 justify-center">
        <InputText title="Student Name:"/>
        <InputText title="Student Index:"/>
        <InputText title="Student Address:"/>
        <InputText title="Student Island:"/>
        <InputText title="Student Grade:"/>
        <InputText title="Student Phone:"/>
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
    }
}
</script>