<template>
  <PageContainer title="Add new student">
    <FormControl
      class="grid grid-cols-2 content-between flex-grow gap-x-14"
      :formData="[...student_fields]"
      @firebaseSend="sendToFirebase"
    >
      <div
        v-for="(field, index) in student_fields"
        :key="field.id"
        class="flex space-x-4"
      >
        <InputText
          v-model="student_fields[index].text"
          :title="field.title"
          class="w-full"
          :width="!field.full ? '48' : 'full'"
          :validate="student_fields[index].validator"
          :isPhone="student_fields[index].phone"
          :ref="(el) => (student_fields[index].elem = el)"
        />
      </div>
      <SubmitButtonsGroup class="col-span-2" />
    </FormControl>
  </PageContainer>
</template>

<script setup>
import { ref } from "vue";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import InputText from "@/components/InputText";
import PageContainer from "@/components/PageContainer";
import { PageLayoutData } from "@/utils/helper";
import { validate } from "@/utils/validation";
import FormControl from "@/components/FormControl.vue";
import SubmitButtonsGroup from "../components/SubmitButtonsGroup.vue";

const student_fields = ref([
  new PageLayoutData("Student Name", {
    firebase_field: "name",
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 30,
        message: "Name should be between 5 and 30",
      }),
  }),
  new PageLayoutData("Student Island", {
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 20,
        message: "Island should be between 5 and 20",
      }),
    firebase_field: "island",
    required: false,
  }),
  new PageLayoutData("Student Address", {
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 20,
        message: "Address should be between 1 and 20",
      }),
    firebase_field: "address",
    required: false,
  }),
  new PageLayoutData("Student Phone", {
    firebase_field: "number",
    validator: (text) =>
      validate(text).isPhone({
        message: "Phone should be a valid number",
      }),
    phone: true,
  }),
  new PageLayoutData("Student Grade", {
    firebase_field: "grade",
    validator: (text) =>
      validate(text).isNumeric({ message: "Grade should be a number" }),
  }),
  new PageLayoutData("Student Index", {
    firebase_field: "index",
    validator: (text) =>
      validate(text).isNumeric({
        message: "Index should be a number",
      }),
  }),
]);

function sendToFirebase(formData) {
  // Send to firebase
  console.log("Sending to firebase -", formData);
  const db = getFirestore();
  const temp = formData.map((field) => [field.firebase_field, field.text]);
  const firebaseDocObj = Object.fromEntries(temp);
  console.log(firebaseDocObj);
  const studentDocRef = doc(db, "students", firebaseDocObj.index);
  setDoc(studentDocRef, firebaseDocObj);
}
</script>
