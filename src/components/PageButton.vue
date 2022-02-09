<template>
    <button class="bg-primary py-4 px-10 text-white rounded-full hover:opacity-95">{{ title }}</button>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>