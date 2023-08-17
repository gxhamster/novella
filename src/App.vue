<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { supabase } from "@/modules/auth/supabase";
import { onMounted, ref } from "vue";
import { router } from "@/router";

const session = ref();

const setCurrentSessionState = async () => {
  const { data } = await supabase.auth.getSession();
  session.value = data.session;
};

onMounted(() => {
  setCurrentSessionState();
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});

// eslint-disable-next-line
router.beforeEach(async (to, from) => {
  await setCurrentSessionState();
  if (!session.value && to.meta.requireAuth && to.name !== "Login") {
    return { name: "Login" };
  }
});
</script>

<style scoped>
#app {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
