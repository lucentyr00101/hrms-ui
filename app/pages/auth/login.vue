<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { loginSchema, type LoginSchema } from "~/schemas/login";

definePageMeta({
  layout: "auth",
});

const state = reactive({
  email: "",
  password: "",
});

const onSubmit = (event: FormSubmitEvent<LoginSchema>) => {
  const { data } = event;
  console.log("form submitted", data);
};
</script>

<template>
  <UCard class="max-w-fit">
    <UForm
      :schema="loginSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton block type="submit">Submit</UButton>
    </UForm>
  </UCard>
</template>
