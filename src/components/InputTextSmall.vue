<template>
    <span class="flex justify-between">
        <label class="mr-4 w-16 font-light text-lg">{{ title }}</label>
        <input type="text" class="appearance-none px-2 w-28 py-1 border-2 rounded-full border-primary focus:opacity-95">
    </span>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>