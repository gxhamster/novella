<template>
  <login-page-container title="Sign Up" welcome-message="Welcome back">
    <form-control
      @firebase-send="createUser"
      :form-data="[...userData]"
      class="mt-10 flex flex-col gap-6"
    >
      <fieldset class="flex flex-col gap-5">
        <input-text
          title="Email"
          v-model="userData[0].text"
          :validate="userData[0].validator"
          placeholder="User ID"
          :ref="(elem) => (userData[0].elem = elem)"
        />
        <input-text
          title="Password"
          v-model="userData[1].text"
          :validate="userData[1].validator"
          placeholder="Password"
          :ref="(elem) => (userData[1].elem = elem)"
        />
      </fieldset>
      <fieldset class="text-gray-500 text-xs">
        <router-link to="/login">
          <span>Alreay a user? Click here</span>
        </router-link>
      </fieldset>
      <fieldset>
        <submit-buttons-group :names="['Create', 'Cancel']" />
      </fieldset>
    </form-control>
    <div class="h-full flex flex-col justify-end">
      <novella-logo color="primary" />
    </div>
  </login-page-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginPageContainer from "@/modules/login/components/LoginPageContainer.vue";
import FormControl from "@/components/FormControl.vue";
import InputText from "@/components/InputText.vue";
import NovellaLogo from "@/components/NovellaLogo.vue";
import SubmitButtonsGroup from "@/components/SubmitButtonsGroup.vue";
import { PageLayoutData } from "@/utils/helper";
import { validate } from "@/utils/validation";
import { supabase } from "@/modules/auth/supabase";

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

async function createUser(formData: any) {
  const { data, error } = await supabase.auth.signUp({
    email: formData[0].text,
    password: formData[1].text,
  });

  if (error) {
    console.error("Cannot create user: ", error);
  } else {
    console.log("Succesfully created new user", data);
  }
}
</script>
