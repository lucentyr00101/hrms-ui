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

const onSubmit = async (event: FormSubmitEvent<LoginSchema>) => {
  const { data } = event;
  console.log("form submitted", data);
  
  // Create and save auth_token cookie
  const authToken = useCookie('auth_token');
  authToken.value = 'TEST_TOKEN';
  
  // Redirect to dashboard
  await navigateTo('/');
};
</script>

<template>
  <div class="w-full max-w-md mx-auto px-4 sm:px-6">
    <UCard class="shadow-lg border-0">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your HRMS account
          </p>
        </div>
      </template>

      <UForm
        :schema="loginSchema"
        :state="state"
        class="space-y-6"
        @submit="onSubmit"
      >
        <UFormField label="Email Address" name="email">
          <UInput 
            v-model="state.email" 
            placeholder="Enter your email address"
            size="lg"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput 
            v-model="state.password" 
            type="password" 
            placeholder="Enter your password"
            size="lg"
          />
        </UFormField>

        <UButton 
          block 
          type="submit" 
          size="lg"
          class="mt-6"
        >
          Login
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
