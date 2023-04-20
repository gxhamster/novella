<template>
  <login-page-container title="Login" welcome-message="Welcome back">
    <FormControl :form-data="[...userData]" class="mt-10 flex flex-col gap-6">
      <fieldset class="flex flex-col gap-5">
        <InputText
          v-model="userData[0].text"
          :validate="userData[0].validator"
          placeholder="User ID"
          :ref="(elem) => (userData[0].elem = elem)"
        />
        <InputText
          v-model="userData[1].text"
          :validate="userData[1].validator"
          placeholder="Password"
          :ref="(elem) => (userData[1].elem = elem)"
        />
      </fieldset>
      <fieldset class="flex justify-between text-gray-500 text-xs">
        <span><input class="mx-2" type="checkbox" />Keep me signed in</span>
        <span>Forgot password? Click here</span>
      </fieldset>
      <fieldset><SubmitButtonsGroup /></fieldset>
    </FormControl>
    <div class="h-full flex flex-col justify-end">
      <NovellaLogo color="primary" />
    </div>
  </login-page-container>
</template>

<script setup>
import { ref } from "vue";
import LoginPageContainer from "@/components/LoginPageContainer.vue";
import FormControl from "@/components/FormControl.vue";
import InputText from "@/components/InputText.vue";
import NovellaLogo from "@/components/NovellaLogo.vue";
import SubmitButtonsGroup from "@/components/SubmitButtonsGroup.vue";
import { PageLayoutData } from "@/utils/helper";
import { validate } from "@/utils/validation";

const userData = ref([
  new PageLayoutData("User ID", {
    validator: (text) =>
      validate(text).between({
        min: 8,
        max: 30,
        message: "User ID should be between 8 and 30",
      }),
  }),
  new PageLayoutData("Password", {
    validator: (text) =>
      validate(text).between({
        min: 8,
        max: 30,
        message: "Password should be between 8 and 30",
      }),
  }),
]);
</script>
