<script setup lang="ts">
import { navItems } from "~/constants/side-nav";

const route = useRoute();

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/dashboard';
  }
  return route.path.startsWith(path);
};

// Mobile navigation items - just use the main nav items
const mobileNavItems = navItems;
</script>

<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-2 py-2 z-50">
    <div class="flex justify-around items-center">
      <NuxtLink
        v-for="item in mobileNavItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex flex-col items-center justify-center p-2 rounded-lg min-w-0 flex-1 mx-1 transition-colors duration-200',
          isActive(item.to)
            ? 'text-primary bg-primary/10'
            : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
        ]"
      >
        <UIcon 
          :name="item.icon" 
          class="w-5 h-5 mb-1 flex-shrink-0" 
        />
        <span class="text-xs font-medium truncate">
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>