<template>
  <sidebar-buttons @clicked="signout" class="w-full" title="Sign out">
    <LogoutIcon :size="24" class="p-2 text-white" />
  </sidebar-buttons>
</template>

<script setup lang="ts">
import SidebarButtons from "@/components/SidebarButtons.vue";
import LogoutIcon from "vue-material-design-icons/Logout.vue";
import { supabase } from "@/modules/auth/supabase";
import { router } from "@/router";

async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Cannot signout properly: ", error);
  } else {
    router.push("/login");
    console.log("Logged out succesfully");
  }
}
</script>
