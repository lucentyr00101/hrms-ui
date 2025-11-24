<script setup lang="ts">
import { navItems, additionalNavItems } from "~/constants/side-nav";

interface Props {
  collapsed?: boolean;
}

const _props = withDefaults(defineProps<Props>(), {
  collapsed: false
});

const route = useRoute();
const expandedItems = ref<Set<string>>(new Set());

const isAnyChildActive = (item: typeof navItems[0]) => {
  if (!item.children) return false;
  return item.children.some(child => {
    if (child.to === '/') {
      return route.path === '/' || route.path === '/dashboard';
    }
    return route.path.startsWith(child.to);
  });
};

const toggleExpanded = (itemLabel: string) => {
  if (expandedItems.value.has(itemLabel)) {
    expandedItems.value.delete(itemLabel);
  } else {
    expandedItems.value.add(itemLabel);
  }
};

const isExpanded = (itemLabel: string) => {
  const item = navItems.find(i => i.label === itemLabel);
  return expandedItems.value.has(itemLabel) || (item ? isAnyChildActive(item) : false);
};

// Auto-expand parent if child is active
watchEffect(() => {
  navItems.forEach(item => {
    if (item.children && isAnyChildActive(item)) {
      expandedItems.value.add(item.label);
    }
  });
});
</script>

<template>
  <aside 
    :class="[
      'bg-gray-900 dark:bg-gray-950 h-screen transition-all duration-300 ease-in-out border-r border-gray-700 dark:border-gray-800 flex flex-col',
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
    <nav class="flex-1 py-4 overflow-y-auto">
      <div class="space-y-1 px-3">
        <div v-for="item in navItems" :key="item.label">
          <!-- Parent Item (with or without children) -->
          <template v-if="!item.children">
            <!-- Item without children - clickable link -->
            <NuxtLink
              :to="item.to"
              :exact="item.to === '/'"
              class="group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900 text-gray-300 hover:text-white"
              active-class="!bg-primary !text-white shadow-lg [&>div]:block"
              exact-active-class="!bg-primary !text-white shadow-lg [&>div]:block"
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
                class="absolute right-0 w-1 h-8 bg-white rounded-l-full hidden"
              />
            </NuxtLink>
          </template>

          <template v-else>
            <!-- Item with children - expandable button -->
            <button
              type="button"
              :class="[
                'group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900 w-full',
                isAnyChildActive(item) ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'
              ]"
              @click="!collapsed ? toggleExpanded(item.label) : null"
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
                class="transition-opacity duration-200 truncate flex-1 text-left"
              >
                {{ item.label }}
              </span>
              
              <!-- Expand/Collapse Icon -->
              <UIcon 
                v-if="!collapsed"
                :name="isExpanded(item.label) ? 'i-material-symbols:expand-less' : 'i-material-symbols:expand-more'"
                class="flex-shrink-0 w-5 h-5 transition-transform duration-200"
              />
            </button>

            <!-- Child Items -->
            <div 
              v-if="!collapsed && isExpanded(item.label)"
              class="mt-1 ml-8 space-y-1"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                :exact="child.to === '/'"
                class="group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900 text-gray-400 hover:text-white"
                active-class="!bg-primary !text-white shadow-lg [&>div]:block"
                exact-active-class="!bg-primary !text-white shadow-lg [&>div]:block"
              >
                <UIcon 
                  :name="child.icon" 
                  class="flex-shrink-0 w-4 h-4 mr-3 transition-colors duration-200" 
                />
                <span class="transition-opacity duration-200 truncate">
                  {{ child.label }}
                </span>
                
                <!-- Active indicator -->
                <div 
                  class="absolute right-0 w-1 h-6 bg-white rounded-l-full hidden"
                />
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>

      <!-- Divider -->
      <div class="mx-3 my-4 border-t border-gray-700 dark:border-gray-800" />

      <!-- Additional Navigation Items -->
      <div class="space-y-1 px-3">
        <NuxtLink
          v-for="item in additionalNavItems"
          :key="item.to"
          :to="item.to"
          class="group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-900 text-gray-300 hover:text-white"
          active-class="!bg-primary !text-white shadow-lg [&>div]:block"
          exact-active-class="!bg-primary !text-white shadow-lg [&>div]:block"
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
            class="absolute right-0 w-1 h-8 bg-white rounded-l-full hidden"
          />
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
