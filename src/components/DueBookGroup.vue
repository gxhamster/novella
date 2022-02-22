<template>
  <div>
    <div class="flex space-x-1 mb-1">
      <span class="text-1xl font-bold"> {{ props.title }} </span>
      <div @click="show = !show">
        <ChevronDownIcon v-show="show"/>
        <ChevronUpIcon v-show="!show"/>
      </div>
    </div>
    <div v-show="show"> 
      <div v-for="child in children" :key="child.name">
          <DueBookItem :title="child.title" :grade="child.grade" :name="child.name" :days="child.days"/>  
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref} from 'vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUpIcon from 'vue-material-design-icons/ChevronUp.vue'

import DueBookItem from './DueBookItem.vue'

const show = ref(false)

const props = defineProps({
  title: String,
  children: Array
})
</script>

<style scoped>
#expand-container {
  overflow: hidden;
}

.expand-contract {
  height: 0;
}
@keyframes expand {
  0% { height: 0; opacity: 0%;}
  20% { height: 20%; opacity: 20%;}
  40% { height: 40%; opacity: 40%;}
  60% { height: 60%; opacity: 60%;}
  80% { height: 80%; opacity: 80%;}
  100% { height: 100%; opacity: 100%;}
}

.expanded {
  animation: expand 2s infinite;
}
</style>