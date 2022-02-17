<template>
  <button class="bg-primary px-4 desktop:py-3 laptop:py-2 w-28 text-white rounded-full">
    {{ title }}
  </button>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
