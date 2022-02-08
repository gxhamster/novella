<template>
  <div class="container mx-auto h-full ml-10">
    <span class="text-4xl text-center block">Add New Student</span>
    <div class="flex mt-10">
        <InputText/>
    </div>
  </div>
</template>

<script>
import InputText from './InputText.vue'
export default {
    components: {
        InputText
    }
}
</script>