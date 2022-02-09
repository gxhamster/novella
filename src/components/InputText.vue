<template>
    <span class="flex flex-wrap justify-center flex-shrink">
        <label class="mr-4 w-32 font-light text-lg">{{ title }}</label>
        <input type="text" class="appearance-none px-4 py-1 border-2 rounded-full border-primary focus:opacity-95">
    </span>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>