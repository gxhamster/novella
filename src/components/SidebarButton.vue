<template>
    <button class="bg-white 
    text-primary 
    flex-grow
    rounded-full 
    border-primary
    h-10
    laptop:w-50 
    desktop:w-60
    text-2xl 
    hover:bg-blue-200
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