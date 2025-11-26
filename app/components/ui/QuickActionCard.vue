<template>
  <NuxtLink 
    :to="to"
    class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group border border-gray-200 dark:border-gray-700"
  >
    <div 
      :class="[
        'w-16 h-16 bg-gradient-to-r rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform',
        gradient
      ]"
    >
      <UIcon :name="icon" class="w-8 h-8 text-white" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
      {{ description }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string
  title: string
  description: string
  icon: string
  gradient: string
}

defineProps<Props>()
</script>
