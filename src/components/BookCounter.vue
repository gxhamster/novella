<template>
  <div
    @click="emitClick"
    class="relative"
    :class="props.active ? 'flex-grow ' : ''"
  >
    <div
      v-if="props.active"
      :class="props.active ? 'animate-w' : ''"
      class="overflow-hidden bg-secondary custom-shadow h-full w-full rounded-lgg p-4 desktop:pr-10 laptop:pr-4 flex"
    >
      <div class="flex flex-grow desktop:gap-4 laptop:gap-2 items-center">
        <div
          @mouseover="icon_hovered = true"
          @mouseleave="icon_hovered = false"
          class="cursor-pointer bg-steel aspect-square border box-border laptop:p-3 desktop:p-6 flex justify-center items-center"
        >
          <component :is="props.icon" class="text-primary" :size="48" />
        </div>
        <div
          class="flex flex-col flex-grow justify-between gap-y-2 flex-shrink-0"
        >
          <span class="font-medium laptop:text-1xl desktop:text-1.5xl">{{
            props.title
          }}</span>
          <div class="flex flex-shrink-0 justify-between">
            <span
              class="inline-block font-bold desktop:text-5xl laptop:text-4xl mr-4"
              >{{ props.count }}</span
            >
            <DetailsButton />
          </div>
        </div>
      </div>
    </div>
    <BookCounterSmall v-else :icon="props.icon" />
  </div>
</template>

<style>
.border {
  border-radius: 15px;
}
</style>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import DetailsButton from "./DetailsButton";
import BookCounterSmall from "./BookCounterSmall";

const icon_hovered = ref(false);
const emit = defineEmits(["clicked"]);
const props = defineProps({
  title: String,
  count: Number,
  active: Boolean,
  icon: Object,
});

function emitClick() {
  if (props.active === false || (icon_hovered.value && props.active === true))
    emit("clicked");
}
</script>

<style scoped>
.animate-w {
  animation-duration: 0.4s;
  animation-name: width-animation;
}

@keyframes width-animation {
  from {
    width: 10%;
  }
  to {
    width: 100%;
  }
}
</style>
