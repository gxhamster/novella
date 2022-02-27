<template>
  <div class="laptop:w-52 desktop:w-60">
    <label class="block mb-2 laptop:text-sm desktop:text-md" for="text input">{{ props.title }}</label>
    <div class="relative">
      <DatePicker v-model="date" color="blue">
        <template v-slot="{ inputValue, togglePopover }">
        <input readonly :value="inputValue" class="rounded-lgg bg-secondary text-gray-400 w-full border-steel border-2 desktop:py-2 desktop:px-4 laptop:py-1 laptop:px-3">
        <div @click="togglePopover" class="bg-primary cursor-pointer rounded-full  inline-block top-0 right-0 absolute laptop:p-2 desktop:p-3">
          <CalendarMonthOutline class="text-white"/>
        </div>
        </template>
      </DatePicker>
    </div>
  </div>
</template>

<script setup>
import { watch, defineProps, ref, defineEmits, onUpdated } from 'vue'
import CalendarMonthOutline from 'vue-material-design-icons/CalendarMonthOutline.vue'
import { DatePicker } from 'v-calendar'

const date = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', ])
const props = defineProps({
  title: String,
  modelValue: Date
})

onUpdated(() => {
  date.value = props.modelValue
})

watch(date, (n) => {
  emit('update:modelValue', n)
})

</script>

<style scoped>
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
</style>