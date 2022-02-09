<template>
    <button class="bg-white 
    text-primary 
    flex-grow
    rounded-full 
    border-primary
    h-10
    w-60 
    text-2xl 
    hover:bg-blue-100
    hover:opacity-95
    hover:text-black
    font-light
    transition-all">{{ title }}</button>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>