<template>
  <login-page-container title="Login" welcome-message="Welcome back">
    <novella-form
      class="mt-5 block h-full flex-col justify-between"
      :handle-submit="handleSubmit"
    >
      <novella-input-text
        placeholder="Please enter your email"
        label="Email"
        name="email"
      ></novella-input-text>
      <novella-input-text
        placeholder="Please enter your email"
        label="Email"
        name="email1"
      ></novella-input-text>
      <novella-form-button label="Submit" />
    </novella-form>
  </login-page-container>
</template>

<script setup lang="ts">
import LoginPageContainer from "@/components/LoginPageContainer.vue";
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import { FormData } from "@/components/NovellaForm.vue";

function handleSubmit(data: FormData) {
  console.log("(+) You clicked the submit handler", data);
}
</script>
