<script setup lang="ts">
import { navItems } from "~/constants/side-nav";

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
});

const route = useRoute();

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/dashboard';
  }
  return route.path.startsWith(path);
};
</script>

<template>
  <aside 
    :class="[
      'bg-gray-900 dark:bg-gray-950 min-h-screen transition-all duration-300 ease-in-out border-r border-gray-700 dark:border-gray-800 flex flex-col',
      collapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Logo/Brand Section -->
    <div class="p-4 border-b border-gray-700 dark:border-gray-800">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <UIcon name="i-material-symbols:business" class="w-5 h-5 text-white" />
        </div>
        <div v-if="!collapsed" class="transition-opacity duration-200">
          <h1 class="text-lg font-bold text-white">HRMS</h1>
          <p class="text-xs text-gray-400">Management System</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 py-4">
      <div class="space-y-1 px-3">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900',
            isActive(item.to) 
              ? 'bg-primary text-white shadow-lg' 
              : 'text-gray-300 hover:text-white'
          ]"
        >
          <UIcon 
            :name="item.icon" 
            :class="[
              'flex-shrink-0 w-5 h-5 transition-colors duration-200',
              collapsed ? 'mx-auto' : 'mr-3'
            ]" 
          />
          <span 
            v-if="!collapsed" 
            class="transition-opacity duration-200 truncate"
          >
            {{ item.label }}
          </span>
          
          <!-- Active indicator -->
          <div 
            v-if="isActive(item.to)" 
            class="absolute right-0 w-1 h-8 bg-white rounded-l-full"
          />
        </NuxtLink>
      </div>

      <!-- Divider -->
      <div class="mx-3 my-4 border-t border-gray-700 dark:border-gray-800" />

      <!-- Additional Navigation Items -->
      <div class="space-y-1 px-3">
        <NuxtLink
          to="/reports"
          :class="[
            'group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900',
            isActive('/reports') 
              ? 'bg-primary text-white shadow-lg' 
              : 'text-gray-300 hover:text-white'
          ]"
        >
          <UIcon 
            name="i-material-symbols:analytics" 
            :class="[
              'flex-shrink-0 w-5 h-5 transition-colors duration-200',
              collapsed ? 'mx-auto' : 'mr-3'
            ]" 
          />
          <span 
            v-if="!collapsed" 
            class="transition-opacity duration-200 truncate"
          >
            Reports
          </span>
        </NuxtLink>

        <NuxtLink
          to="/settings"
          :class="[
            'group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900',
            isActive('/settings') 
              ? 'bg-primary text-white shadow-lg' 
              : 'text-gray-300 hover:text-white'
          ]"
        >
          <UIcon 
            name="i-material-symbols:settings" 
            :class="[
              'flex-shrink-0 w-5 h-5 transition-colors duration-200',
              collapsed ? 'mx-auto' : 'mr-3'
            ]" 
          />
          <span 
            v-if="!collapsed" 
            class="transition-opacity duration-200 truncate"
          >
            Settings
          </span>
        </NuxtLink>
      </div>
    </nav>

    <!-- User Profile Section -->
    <div class="border-t border-gray-700 dark:border-gray-800 p-3">
      <div 
        :class="[
          'flex items-center space-x-3 p-3 rounded-lg bg-gray-800 dark:bg-gray-900',
          collapsed ? 'justify-center' : ''
        ]"
      >
        <UAvatar
          src=""
          alt="Admin User" 
          size="sm"
          class="bg-primary text-white flex-shrink-0"
        >
          <UIcon name="i-material-symbols:person" class="w-4 h-4" />
        </UAvatar>
        <div v-if="!collapsed" class="min-w-0 flex-1 transition-opacity duration-200">
          <p class="text-sm font-medium text-white truncate">Admin User</p>
          <p class="text-xs text-gray-400 truncate">admin@hrms.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>
