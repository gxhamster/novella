<template>
  <page-container title="Add new student">
    <novella-form
      class="grid grid-cols-2 content-between flex-grow gap-x-14"
      :handle-submit="sendToSupabase"
    >
      <novella-input-text
        name="name"
        title="Student Name"
        label="Student Name"
        :validation="(text) => new Validator(text).required().unwrap()"
      />
      <novella-input-text
        name="index"
        title="Student Index"
        label="Student Index"
        :validation="(text) => new Validator(text).required().unwrap()"
      />
      <novella-input-text
        name="island"
        title="Student Island"
        label="Student Island"
      />
      <novella-input-text
        name="address"
        title="Student Address"
        label="Student Address"
      />
      <novella-input-text
        name="phone"
        title="Student Phone"
        label="Student Phone"
      />
      <novella-input-text
        name="grade"
        title="Student Grade"
        label="Student Grade"
      />
      <section class="col-span-2 flex gap-x-5 justify-center">
        <novella-form-button label="Submit" />
        <novella-form-button-cancel label="Cancel" />
      </section>
    </novella-form>
  </page-container>
</template>

<script setup>
import NovellaInputText from "@/components/NovellaInputText.vue";
import PageContainer from "@/components/PageContainer";
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import NovellaFormButtonCancel from "@/components/NovellaFormButtonCancel.vue";
import { Validator } from "@/utils/validation";
import { supabase } from "@/modules/auth/supabase";

async function sendToSupabase(formData) {
  console.log("Sending: ", formData);
  const { data, error } = await supabase
    .from("students")
    .insert([
      {
        name: formData.name.value,
        index: formData.index.value,
        address: formData.address.value,
        island: formData.island.value,
        phone: formData.phone.value,
        grade: formData.grade.value,
      },
    ])
    .select();
  if (error) {
    console.error("Cannot create new student", error);
  } else {
    console.log("Succesfully created new student", data);
  }
}
</script>
