<template>
  <div class="flex gap-3 justify-center bg-primary">
    <div
      v-for="(btn, index) in main_view_buttons"
      :key="btn.name"
      class="flex items-center"
    >
      <MainViewButton
        class="text-1xl"
        :title="btn.name"
        @clicked="setFocus(index)"
        :isActive="index === current_active_btn_index"
      >
        <component
          :is="btn.icon"
          class="rounded-full text-white main-icon"
          :class="{ 'main-icon-active': index === current_active_btn_index }"
        />
      </MainViewButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CogIcon from "vue-material-design-icons/Cog.vue";
import CommentQuoteOutlineIcon from "vue-material-design-icons/CommentQuoteOutline.vue";
import InformationIcon from "vue-material-design-icons/Information.vue";
import MainViewButton from "./MainViewButton.vue";

const current_active_btn_index = ref(-1000);
const router = useRouter();
router.afterEach((to) => {
  const valid = main_view_buttons.filter((v) => to.path === v.route);
  if (valid.length === 0) {
    current_active_btn_index.value = -1000;
  }
});

function setFocus(index) {
  current_active_btn_index.value = index;
  router.replace(main_view_buttons[current_active_btn_index.value].route);
}

const main_view_buttons = [
  { name: "Settings", icon: CogIcon, route: "/settings" },
  { name: "Feedback", icon: InformationIcon, route: "/feedback" },
  { name: "About us", icon: CommentQuoteOutlineIcon, route: "/about" },
];
</script>

<style>
.material-design-icon.main-icon {
  transition: all 0.3s ease;
  height: 1.7em;
  width: 1.7em;
}

.material-design-icon.main-icon > .material-design-icon__svg {
  transition: all 0.3s ease;
  height: 1.7em;
  width: 1.7em;
}

.material-design-icon.main-icon-active {
  height: 2.4em;
  width: 2.4em;
}

.material-design-icon.main-icon-active > .material-design-icon__svg {
  height: 2.4em;
  width: 2.4em;
}
</style>
