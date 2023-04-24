<template>
  <login-page-container title="Login" welcome-message="Welcome back">
    <novella-form
      :handle-submit="handleSubmit"
      class="flex flex-col space-y-5 items-center"
    >
      <novella-input-text
        placeholder="Please enter your email"
        label="Email"
        name="email"
        :validation="
          (text) =>
            validate(text).between({
              min: 5,
              max: 15,
              message: 'Email should be between 5 - 15',
            })
        "
      ></novella-input-text>
      <novella-input-text
        placeholder="Please enter your email"
        label="Email"
        name="email1"
        :validation="
          (text) =>
            validate(text).between({
              min: 5,
              max: 15,
              message: 'Email should be between 5 - 15',
            })
        "
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
import { validate } from "@/utils/validation";

function handleSubmit(data: FormData) {
  console.log("(+) You clicked the submit handler", data);
}
</script>
