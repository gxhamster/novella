<template>
  <div class="mainview-container">
    <div class="mainview-grid">
        <span class="text-4xl col-span-2 text-center pb-20">Add New Book</span>
        <div v-for="title in input_titles" :key="title.id">
            <InputText :title="title"/>
        </div>
        <div class="flex justify-evenly">
            <InputTextSmall title="Year" />
            <InputTextSmall title="Pages"/>
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
import InputTextSmall from './InputTextSmall.vue'

export default {
    components: {
        InputText,
        PageButton,
        InputTextSmall
    },
    data() {
        return {
            input_titles: ["BookID:", "Publisher:", "Book Title:", "Subject:", "Book DDC:", "Author:", "Book Number:"]
        }
    }
}
</script>