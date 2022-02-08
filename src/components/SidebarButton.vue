<template>
    <button class="bg-white 
    text-primary 
    shrink-1
    rounded-full 
    border-primary
    h-10 
    text-2xl 
    hover:bg-blue-100
    hover:opacity-95
    hover:text-black
    transition-all">{{ title }}</button>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>