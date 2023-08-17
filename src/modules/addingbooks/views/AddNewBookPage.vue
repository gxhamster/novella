<template>
  <page-container title="Add new book">
    <novella-form
      :handleSubmit="sendToSupabase"
      class="grid grid-cols-2 flex-grow gap-x-14 content-between"
    >
      <novella-input-text
        name="title"
        title="Title"
        label="Title"
        :validation="(text) => new Validator(text).required().unwrap()"
      />
      <novella-input-text name="author" title="Author" label="Author" />
      <novella-input-text name="genre" title="Genre" label="Genre" />
      <novella-input-text
        name="ddc"
        title="DDC"
        label="DDC"
        :validation="
          (text) => new Validator(text).isAlpha().required().unwrap()
        "
      />
      <novella-input-text name="isbn" title="ISBN" label="ISBN" />
      <novella-input-text
        name="publisher"
        title="Publisher"
        label="Publisher"
      />
      <div class="flex gap-x-6">
        <novella-input-text name="edition" title="Edition" label="Edition" />
        <novella-input-text name="pages" title="Pages" label="Pages" />
      </div>
      <section class="flex gap-x-6">
        <novella-input-text name="language" title="Language" label="Language" />
        <novella-input-text name="year" title="Year" label="Year" />
      </section>
      <section class="col-span-2 flex gap-x-5 justify-center">
        <novella-form-button label="Submit" />
        <novella-form-button-cancel label="Cancel" />
      </section>
    </novella-form>
  </page-container>
</template>

<script setup>
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import NovellaFormButtonCancel from "@/components/NovellaFormButtonCancel.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import PageContainer from "@/components/PageContainer";
import { Validator } from "@/utils/validation";
import { supabase } from "@/modules/auth/supabase";

async function sendToSupabase(formData) {
  // Send to firebase
  console.log("Sending to Supabase -", formData);
  const { data, error } = await supabase
    .from("books")
    .insert([
      {
        title: formData.title.value,
        author: formData.author.value,
        genre: formData.genre.value,
        publisher: formData.publisher.value,
        ddc: formData.ddc.value,
        edition: formData.edition.value,
        language: formData.language.value,
        year: formData.year.value,
        pages: formData.pages.value,
        isbn: formData.isbn.value,
      },
    ])
    .select();
  if (error) {
    console.error("Cannot create new book", error);
  } else {
    console.log("Succesfully created new book", data);
  }
}
</script>
