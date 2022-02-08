<template>
  <button class="bg-primary rounded-full text-white w-24 hover:text-black">
      {{ title }}
  </button>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String
  }
}
</script>

