<template>
  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div class="flex items-center gap-3">
      <UIcon name="i-material-symbols:person" class="w-5 h-5 text-blue-600" />
      <div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          {{ title }}
        </p>
        <p class="text-xs text-gray-600 dark:text-gray-400">
          {{ description }}
        </p>
      </div>
    </div>
    <UBadge 
      :color="statusColor" 
      :label="status" 
      size="sm" 
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  status: string
  statusColor: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
}

defineProps<Props>()
</script>
