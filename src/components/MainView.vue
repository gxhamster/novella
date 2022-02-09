<template>
    <div class="w-screen bg-white border-1 rounded-tl-lgg rounded-bl-lgg laptop:p-5 desktop:p-10 flex-grow">
        <!-- <AddStudentPage/> -->
        <AddBookPage/>
    </div>
</template>

<script>
// import AddStudentPage from './AddStudentPage.vue'
import AddBookPage from './AddBookPage.vue'

export default {
    components: {
        // AddStudentPage
        AddBookPage
    }
}
</script>