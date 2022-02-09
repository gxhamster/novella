<template>
  <ul class="flex justify-between">
    <button class="hover:opacity-75 transition-all " v-for="icon in icons" :key="icon.id">
      <img :src="icon" class="w-16 p-1"/>
    </button>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      icons: {
        teacher: require("@/assets/teachers.png"),
        database: require("@/assets/database.png"),
        settings: require("@/assets/settings.png"),
      },
    };
  },
};
</script>
