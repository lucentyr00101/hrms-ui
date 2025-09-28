<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  description: ''
});
</script>