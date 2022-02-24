<template>
  <div class="w-full">
    <label class="block mb-2 laptop:text-sm desktop:text-md" for="text input">{{ title }}</label>
    <input :value="modelValue" @input="emit('update:modelValue', filteredTextInput($event.target.value))" class="outline-none apperance-none border-2 rounded-full bg-secondary border-border desktop:py-2 desktop:px-4 laptop:py-1 laptop:px-3" :class="widthFormat" alt="Text Input">
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'

const filteredWords = ref({
  'shit': 's**t',
  'fuck': 'f**k',
  'motherfuck': 'motherf**k',
  'retard': 'challenged',
  'arse': 'a**e',
  'ass': 'a**',
  'bitch': 'b**ch',
  'pussy': 'p**sy',
  'tit': 't*t',
  'boobs': 'b**bs',
  'idiot': '',
  'stupid': '',
  'mayahoki': 'ma***oki',
  'fui': 'f**',
  'nagubalhu': 'na***alhu',
  'nagoobalhu': 'na***alhu',
  'foa': 'f**',
  'haivanu': 'ha***nu',
  'haivaanu': 'ha***nu',
  'bakata': 'ba**ta',
  'bakhata': 'ba**ta',
  'bakataa': 'ba**taa',
})

const filteredTextInput = (inputString) => {
  const newString = inputString
  const re = new RegExp(Object.keys(filteredWords.value).join("|"), "gi")
  return newString.replace(re, (val) => {
      for (const key in filteredWords.value) {
        if (key == val) {
          return filteredWords.value[key]
        }
      }
    })
}
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  title: String,
  width: String,
  modelValue: String
})
const widthFormat = computed(() => `w-${props.width}`)

</script>
