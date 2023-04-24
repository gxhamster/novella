<template>
  <login-page-container title="Login" welcome-message="Welcome back">
    <novella-form :handle-submit="handleSubmit">
      <div class="flex flex-col h-64 justify-between items-center max-w-md">
        <novella-input-text
          class="w-full"
          placeholder="Please enter your email"
          label="Email"
          name="email"
          :validation="
            (text) => new Validator(text).email().required().unwrap()
          "
        ></novella-input-text>
        <novella-input-text
          class="w-full"
          placeholder="Please enter your password"
          :validation="
            (text) => new Validator(text).between(8, 50).required().unwrap()
          "
          label="Password"
          type="password"
          name="password"
        ></novella-input-text>
        <novella-form-button class="my-4" label="Submit" />
      </div>
    </novella-form>
  </login-page-container>
</template>

<script setup lang="ts">
import LoginPageContainer from "@/components/LoginPageContainer.vue";
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import { FormData } from "@/components/NovellaForm.vue";
import { Validator } from "@/utils/validation";
import { useLogin } from "@/composables/auth";
import { router } from "@/router";
import { getAuth } from "firebase/auth";

async function handleSubmit(data: FormData) {
  const { email, password, login } = useLogin();
  email.value = data.email.value;
  password.value = data.password.value;

  await login();
  if (getAuth().currentUser) router.push("/dashboard");
}
</script>
