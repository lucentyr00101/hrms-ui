<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const state = reactive({
  email: "",
  password: "",
});

const onSubmit = () => {
  console.log("form submitted", state);
};
</script>

<template>
  <UCard class="max-w-fit">
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton type="submit">Submit</UButton>
    </UForm>
  </UCard>
</template>
