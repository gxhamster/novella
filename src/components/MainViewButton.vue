<template>
  <div class="flex space-x-4 w-40 items-center">
    <slot></slot>
    <button class="text-primary h-full font">{{ title }}</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String

  }
}
</script>

<style>
.font {
  font-size: 1.28rem;
}
</style>
