<script setup lang="ts">
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

const isSearchOpen = ref(false);
const searchQuery = ref('');
const showNotifications = ref(false);
const showUserMenu = ref(false);

// Mock notifications data
const notifications = ref<NotificationItem[]>([
  {
    id: '1',
    title: 'New Interview Scheduled',
    message: 'John Doe - Frontend Developer position',
    time: '5 min ago',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Leave Request',
    message: 'Sarah Connor requested 3 days leave',
    time: '1 hour ago',
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Interview Completed',
    message: 'Michael Smith - Backend Developer',
    time: '2 hours ago',
    read: true,
    type: 'success'
  }
]);

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

const emits = defineEmits<{
  toggleSidebar: []
}>();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value);
    // Implement search functionality
  }
};

const markAsRead = (id: string) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
};

const handleSignOut = async () => {
  // Clear auth token
  const authToken = useCookie('auth_token');
  authToken.value = null;
  await navigateTo('/auth/login');
};
</script>

<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
    <!-- Left Section: Menu Toggle & Breadcrumb -->
    <div class="flex items-center space-x-4">
      <UButton 
        @click="emits('toggleSidebar')"
        variant="ghost" 
        size="sm"
      >
        <UIcon name="i-material-symbols:menu" class="w-5 h-5" />
      </UButton>

      <!-- Simple breadcrumb text for now -->
      <nav class="hidden sm:block">
        <span class="text-sm text-gray-600 dark:text-gray-400">Dashboard</span>
      </nav>
    </div>

    <!-- Center Section: Search -->
    <div class="flex-1 max-w-xl mx-4">
      <div class="relative">
        <UInput
          v-model="searchQuery"
          placeholder="Search employees, interviews, or documents..."
          size="sm"
          @keydown.enter="handleSearch"
          class="w-full"
        >
          <template #leading>
            <UIcon name="i-material-symbols:search" class="w-4 h-4" />
          </template>
        </UInput>
      </div>
    </div>

    <!-- Right Section: Notifications & User Menu -->
    <div class="flex items-center space-x-3">
      <!-- Notifications Button -->
      <UButton variant="ghost" size="sm" class="relative">
        <UIcon name="i-material-symbols:notifications" class="w-5 h-5" />
        <span 
          v-if="unreadCount > 0" 
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ unreadCount }}
        </span>
      </UButton>

      <!-- User Profile Button -->
      <div class="flex items-center space-x-2">
        <UAvatar
          src=""
          alt="User Avatar" 
          size="sm"
          class="bg-primary text-white"
        >
          <UIcon name="i-material-symbols:person" class="w-4 h-4" />
        </UAvatar>
        <span class="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</span>
        <UButton 
          variant="ghost" 
          size="sm"
          @click="handleSignOut"
          class="text-xs"
        >
          <UIcon name="i-material-symbols:logout" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
  </header>
</template>