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
  await navigateTo('/dashboard');
};
</script>

<template>
  <div class="w-full">
    <UCard class="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-xl border-0 overflow-hidden">
      <template #header>
        <div class="text-center py-2">
          <!-- Logo/Icon -->
          <div class="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <UIcon name="i-material-symbols:business" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to your HRMS account
          </p>
        </div>
      </template>

      <UForm
        :schema="loginSchema"
        :state="state"
        class="space-y-6 p-2"
        @submit="onSubmit"
      >
        <UFormField label="Email Address" name="email">
          <template #label>
            <div class="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <UIcon name="i-material-symbols:mail" class="w-4 h-4" />
              <span>Email Address</span>
            </div>
          </template>
          <UInput 
            v-model="state.email" 
            placeholder="Enter your email address"
            size="lg"
            class="transition-all duration-200 focus-within:scale-[1.02]"
            :ui="{ 
              base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
              rounded: 'rounded-xl',
              placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
              color: {
                white: {
                  outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
                }
              }
            }"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <template #label>
            <div class="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <UIcon name="i-material-symbols:lock" class="w-4 h-4" />
              <span>Password</span>
            </div>
          </template>
          <UInput 
            v-model="state.password" 
            type="password" 
            placeholder="Enter your password"
            size="lg"
            class="transition-all duration-200 focus-within:scale-[1.02]"
            :ui="{ 
              base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
              rounded: 'rounded-xl',
              placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
              color: {
                white: {
                  outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
                }
              }
            }"
          />
        </UFormField>

        <UButton 
          block 
          type="submit" 
          size="lg"
          class="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl font-semibold"
          :ui="{
            base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0',
            font: 'font-medium',
            rounded: 'rounded-xl',
            size: {
              lg: 'text-base px-6 py-3'
            }
          }"
        >
          <div class="flex items-center justify-center space-x-2">
            <UIcon name="i-material-symbols:login" class="w-5 h-5" />
            <span>Sign In</span>
          </div>
        </UButton>
      </UForm>

      <!-- Additional Links -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between text-sm">
          <a href="#" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center space-x-1">
            <UIcon name="i-material-symbols:key" class="w-4 h-4" />
            <span>Forgot Password?</span>
          </a>
          <a href="#" class="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors flex items-center space-x-1">
            <UIcon name="i-material-symbols:person-add" class="w-4 h-4" />
            <span>Sign Up</span>
          </a>
        </div>
      </div>
    </UCard>
  </div>
</template>
