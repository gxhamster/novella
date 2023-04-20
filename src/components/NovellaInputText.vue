<template>
  <form-kit
    :classes="classes"
    :type="type"
    :label="label"
    :validation="validation"
    :validation-visibility="validation_visibility"
    :placeholder="placeholder"
    :name="name"
    id="email"
  />
</template>

<script setup lang="ts">
interface Props {
  type: "email" | "text" | "password" | "textarea";
  label: string;
  name: string;
  validation: string;
  validation_visibility?: string;
  placeholder?: string;
  help?: string;
  classes?: any;
}
withDefaults(defineProps<Props>(), {
  classes: {
    outer: "mt-5",
    label: "mb-2 text-gray-700",
    input:
      "border-2 border-primary bg-secondary border-black rounded-full py-2 mt-2 px-4 w-full",
    message: "text-red-400 mt-2",
  },
});
</script>
