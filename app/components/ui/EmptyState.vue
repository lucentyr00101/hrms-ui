<template>
  <div class="flex flex-col items-center justify-center p-8 text-center">
    <UIcon 
      :name="icon" 
      class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
    />
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
      {{ description }}
    </p>
    <div class="flex gap-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>