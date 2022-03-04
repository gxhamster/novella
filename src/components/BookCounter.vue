<template>
  <div @click="emitClick" :class="props.active ? 'flex-grow' : ''">
    <Transition name="slide-fade" mode="out-in">
    <div v-if="props.active" class="bg-secondary custom-shadow h-full w-full rounded-lgg p-4 desktop:pr-10 laptop:pr-4 flex">
      <div class="flex flex-grow desktop:gap-4 laptop:gap-2 items-center">
        <div @mouseover="icon_hovered = true" @mouseleave="icon_hovered = false" class="cursor-pointer bg-steel aspect-square border box-border laptop:p-3 desktop:p-6 flex justify-center items-center">
          <component :is="props.icon" class="text-primary" :size="48"/>
        </div>
        <div class="flex-grow h-full flex-shrink-0">
          <span class="font-medium text-1xl">{{ props.title }}</span>
          <span class="block font-bold desktop:text-5xl laptop:text-4xl">{{ props.count }}</span>
        </div>
        <DetailsButton class="self-end"/>
      </div>
    </div>
    <BookCounterSmall v-else/>
  </Transition>
  </div>
</template>

<style>
.border {
  border-radius: 15px;
}
</style>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import DetailsButton from './DetailsButton'
import BookCounterSmall from './BookCounterSmall'

const icon_hovered = ref(false)
const emit = defineEmits(['clicked'])
const props = defineProps({
  title: String,
  count: Number,
  active: Boolean,
  icon: Object
})

function emitClick() {
  if (props.active === false || (icon_hovered.value && props.active === true))
    emit('clicked')
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  /* opacity: 0; */
}
</style>
