<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div class="text-center py-12">
      <UIcon :name="icon" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ title }}</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ description }}</p>
      <UButton :color="buttonColor" @click="$emit('action')">
        <UIcon :name="buttonIcon" class="w-4 h-4 mr-2" />
        {{ buttonText }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: string;
  buttonColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
}

withDefaults(defineProps<Props>(), {
  icon: 'i-material-symbols:info',
  buttonIcon: 'i-material-symbols:add',
  buttonColor: 'primary'
});

defineEmits<{
  action: [];
}>();
</script>