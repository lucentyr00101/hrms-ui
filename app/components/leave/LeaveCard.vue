<template>
  <UCard class="shadow-md hover:shadow-lg transition-shadow duration-200">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <slot name="header-actions"></slot>
      </div>
    </template>

    <slot></slot>

    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
