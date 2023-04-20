<template>
  <login-page-container title="Sign Up" welcome-message="Welcome back">
    <form-kit
      type="form"
      v-model="formData"
      :actions="false"
      id="signup-form"
      @submit="handleSubmit"
    >
      <div class="flex-col justify-center max-w-sm mx-auto">
        <novella-input-text
          type="email"
          label="Student Email Address"
          validation="required|email"
          validation-visibility="live"
          placeholder="iyaanazeez757@gmail.com"
          name="email"
          id="email"
        />
        <novella-input-text
          type="password"
          label="Student Password"
          validation="required"
          validation-visibility="live"
          name="password"
          id="password"
        />
        <form-kit
          type="submit"
          input-class="hover:opacity-90 bg-primary px-4 desktop:py-3 laptop:py-2 h-10 text-white rounded-full my-4"
          outer-class="flex justify-center"
          >Register</form-kit
        >
      </div>
    </form-kit>
    <div class="h-full flex flex-col justify-end">
      <novella-logo color="primary" />
    </div>
  </login-page-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginPageContainer from "@/components/LoginPageContainer.vue";
import NovellaLogo from "@/components/NovellaLogo.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import { useSignup } from "@/composables/auth";

const formData = ref();

async function handleSubmit() {
  const { email, password, signup } = useSignup();
  email.value = formData.value.email;
  password.value = formData.value.password;
  await signup();
}
</script>
