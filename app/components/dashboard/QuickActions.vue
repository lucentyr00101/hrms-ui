<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Quick Actions
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NuxtLink 
        v-for="action in quickActions"
        :key="action.label"
        :to="action.to"
        :class="action.class"
        @click="action.onClick"
      >
        <div :class="action.iconWrapperClass">
          <UIcon :name="action.icon" class="w-6 h-6 text-white" />
        </div>
        <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
          {{ action.label }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface QuickAction {
  label: string;
  to?: string;
  icon: string;
  class: string;
  iconWrapperClass: string;
  onClick?: () => void;
}

const quickActions: QuickAction[] = [
  {
    label: 'Schedule Interview',
    to: '/interviews',
    icon: 'i-material-symbols:calendar-add-on',
    class: 'flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group',
    iconWrapperClass: 'w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'
  },
  {
    label: 'Add Employee',
    to: '/employees',
    icon: 'i-material-symbols:person-add',
    class: 'flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group',
    iconWrapperClass: 'w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'
  },
  {
    label: 'View Reports',
    icon: 'i-material-symbols:analytics',
    class: 'flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group',
    iconWrapperClass: 'w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform',
    onClick: () => {
      // Handle reports navigation
      navigateTo('/reports');
    }
  },
  {
    label: 'Settings',
    icon: 'i-material-symbols:settings',
    class: 'flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group',
    iconWrapperClass: 'w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform',
    onClick: () => {
      // Handle settings navigation
      navigateTo('/settings');
    }
  }
];
</script>