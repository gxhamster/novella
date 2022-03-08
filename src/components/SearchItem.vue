<template>
  <div @click="sendItemData" class="flex bg-secondary rounded-md cursor-pointer hover:shadow-md transition-all p-2 flex">
    <component class="pr-4 text-gray-700 rounded-full" :is="icons[props.dataType]" :size="40"></component>
    <section class="flex justify-around flex-col flex-grow">
      <span class="text-1xl">{{ props.title }}</span>
      <div class="flex text-sm flex-col font-light">
        <div v-for="data of Object.keys(props.optionalData)" :key="data">
          <span class="font-light">{{ `${prettyCapitalize(data)}: ` }}</span>
          <span class="font-normal">{{ props.optionalData[data] }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import BookIcon from 'vue-material-design-icons/Book.vue'
import AccountIcon from 'vue-material-design-icons/Account.vue'
import { prettyCapitalize } from '@/utils/helper'
import { SearchItemClass } from '@/utils/search'

const icons = {
  book: BookIcon,
  user: AccountIcon
}
const emit = defineEmits(['clicked'])

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

function sendItemData() {
  emit('clicked', new SearchItemClass(props.title, props.dataType, props.optionalData))
}
</script>
