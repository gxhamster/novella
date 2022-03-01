<template>
  <div class="flex bg-secondary rounded-md cursor-pointer hover:shadow-md transition-all p-2 flex-col">
    <div class="flex font-medium">
      <component class="pr-4" :is="icons[props.dataType]"></component>
      <span class="text-1.5xl">{{ props.title }}</span>
    </div>
    <section class="flex justify-around">
      <div v-for="data of Object.keys(props.optionalData)" :key="data">
        <span>{{ props.optionalData[data] }}</span>
      </div>
    </section>
  </div>
</template>



<script setup>
import { defineProps } from 'vue'
import BookOpenOutlineIcon from 'vue-material-design-icons/BookOpenOutline.vue'
import AccountIcon from 'vue-material-design-icons/Account.vue' 

const icons = {
  book: BookOpenOutlineIcon,
  user: AccountIcon
}

const props = defineProps({
  title: String,
  dataType: {
    type: String,
    default: 'user',
    validator(value) {
      return ['book', 'user'].includes(value)
    }
  },
  optionalData: {
    type: Object,
  }
})
</script>

