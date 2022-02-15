<template>
  <div class="w-full">
    <label class="block mb-2">{{ title }}</label>
    <input class="outline-none apperance-none border-2 rounded-full bg-secondary border-border py-2 px-4" :class="widthFormat">
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    width: Number
  },
  computed: {
    widthFormat() {
      return `w-${this.width}`
    }
  }
}
</script>


