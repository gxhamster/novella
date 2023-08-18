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
        <fieldset class="text-gray-500 text-sm w-full m-2">
          <router-link to="/signup">
            <a class="hover:underline">Not a user. Register Here</a>
          </router-link>
        </fieldset>
        <novella-form-button class="my-4" label="Submit" />
      </div>
    </novella-form>
  </login-page-container>
</template>

<script setup lang="ts">
import LoginPageContainer from "../components/LoginPageContainer.vue";
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import { FormData } from "@/components/NovellaForm.vue";
import { Validator } from "@/utils/validation";
import { RouterLink } from "vue-router";
import { supabase } from "@/modules/auth/supabase";
import { router } from "@/router";

async function handleSubmit(formData: FormData) {
  const { email, password } = formData;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.error("Cannot login ", error);
  } else {
    console.log("Succesfully logged in ", data);
    router.push("/");
  }
}
</script>
