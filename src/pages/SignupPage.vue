<template>
  <login-page-container title="Sign Up" welcome-message="Welcome back">
    <form-control
      @firebase-send="createUser"
      :form-data="[...userData]"
      class="mt-10 flex flex-col gap-6"
    >
      <fieldset class="flex flex-col gap-5">
        <input-text
          v-model="userData[0].text"
          :validate="userData[0].validator"
          placeholder="User ID"
          :ref="(elem) => (userData[0].elem = elem)"
        />
        <input-text
          v-model="userData[1].text"
          :validate="userData[1].validator"
          placeholder="Password"
          :ref="(elem) => (userData[1].elem = elem)"
        />
      </fieldset>
      <fieldset class="flex justify-between text-gray-500 text-xs">
        <span>Alreay a user? Click here</span>
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
import LoginPageContainer from "@/components/LoginPageContainer.vue";
import FormControl from "@/components/FormControl.vue";
import InputText from "@/components/InputText.vue";
import NovellaLogo from "@/components/NovellaLogo.vue";
import SubmitButtonsGroup from "@/components/SubmitButtonsGroup.vue";
import { PageLayoutData } from "@/utils/helper";
import { validate } from "@/utils/validation";
import { useSignup } from "@/composables/auth";
import { getFirestore, setDoc, doc } from "@firebase/firestore";
import { UserMetadata } from "@firebase/auth";

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

interface User {
  email: string;
  uid: string;
  metadata: UserMetadata;
}

function storeUser(user: User) {
  const db = getFirestore();
  console.log(user);
  setDoc(doc(db, "users", user.uid), user);
}

async function createUser(formData: any) {
  const user = await useSignup(formData[0].text, formData[0].text);
  if (user !== null) {
    storeUser({
      email: user.email,
      uid: user.uid,
      metadata: user.metadata,
    });
  }
}
</script>
