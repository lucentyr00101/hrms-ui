<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ dashboardTitle }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ dashboardSubtitle }}
            </p>
          </div>
          <div v-if="user" class="flex items-center space-x-3">
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ user.role }} • {{ user.department }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span class="text-sm text-white font-medium">{{ userInitials }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="widget in enabledWidgets"
          :key="widget.id"
          :class="getWidgetColSpan(widget.size)"
        >
          <component :is="widget.component" />
        </div>
      </div>

      <!-- Quick Actions Section (shown for all roles) -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink 
            v-for="action in quickActions" 
            :key="action.id"
            :to="action.to"
            class="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
          >
            <div 
              class="w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
              :class="action.gradient"
            >
              <UIcon :name="action.icon" class="w-6 h-6 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
              {{ action.label }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDashboardLayout } from '~/types/dashboard';

// Import all possible widget components
import PendingActionsWidget from '~/components/dashboard/PendingActionsWidget.vue';
import EmployeeStatsWidget from '~/components/dashboard/EmployeeStatsWidget.vue';
import TeamActivityWidget from '~/components/dashboard/TeamActivityWidget.vue';
import LeaveRequestsWidget from '~/components/dashboard/LeaveRequestsWidget.vue';
import PersonalInfoWidget from '~/components/dashboard/PersonalInfoWidget.vue';
import MyRequestsWidget from '~/components/dashboard/MyRequestsWidget.vue';
import AnnouncementsWidget from '~/components/dashboard/AnnouncementsWidget.vue';

// Keep existing components for fallback
import InterviewStats from '~/components/dashboard/InterviewStats.vue';
import EmployeeLeaveStats from '~/components/dashboard/EmployeeLeaveStats.vue';
import UpcomingInterviews from '~/components/dashboard/UpcomingInterviews.vue';

const { user } = useUser();

const dashboardLayout = computed(() => {
  if (!user.value?.role) return null;
  return getDashboardLayout(user.value.role);
});

const enabledWidgets = computed(() => {
  return dashboardLayout.value?.widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order) || [];
});

const dashboardTitle = computed(() => {
  switch (user.value?.role) {
    case 'admin': return 'Admin Dashboard';
    case 'hr': return 'HR Dashboard';
    case 'manager': return 'Manager Dashboard';
    case 'employee': return 'My Dashboard';
    default: return 'Dashboard';
  }
});

const dashboardSubtitle = computed(() => {
  switch (user.value?.role) {
    case 'admin': return 'System overview and administration tools';
    case 'hr': return 'Manage recruitment, employees, and HR processes';
    case 'manager': return 'Track your team activity and manage requests';
    case 'employee': return 'Your personal workspace and information';
    default: return 'Welcome back! Here\'s what\'s happening with your HRMS today.';
  }
});

const userInitials = computed(() => {
  if (!user.value?.name) return 'U';
  return user.value.name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();
});

const quickActions = computed(() => {
  const baseActions = [
    {
      id: 'interviews',
      label: 'Schedule Interview',
      icon: 'i-material-symbols:calendar-add-on',
      gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
      to: '/interviews',
      roles: ['admin', 'hr', 'manager']
    },
    {
      id: 'employees',
      label: 'Manage Employees',
      icon: 'i-material-symbols:person-add',
      gradient: 'bg-gradient-to-r from-green-500 to-teal-500',
      to: '/employees',
      roles: ['admin', 'hr', 'manager']
    },
    {
      id: 'reports',
      label: 'View Reports',
      icon: 'i-material-symbols:analytics',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
      to: '/reports',
      roles: ['admin', 'hr', 'manager']
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: 'i-material-symbols:person',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      to: '/profile',
      roles: ['employee']
    },
    {
      id: 'leave-request',
      label: 'Request Leave',
      icon: 'i-material-symbols:event-available',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      to: '/leave-request',
      roles: ['employee', 'manager']
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'i-material-symbols:settings',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      to: '/settings',
      roles: ['admin', 'hr', 'manager', 'employee']
    }
  ];

  return baseActions.filter(action => 
    action.roles.includes(user.value?.role)
  ).slice(0, 4);
});

const getWidgetColSpan = (size) => {
  switch (size) {
    case 'small': return 'md:col-span-1';
    case 'medium': return 'md:col-span-1 lg:col-span-2';
    case 'large': return 'md:col-span-2 lg:col-span-3';
    case 'full': return 'md:col-span-2 lg:col-span-4';
    default: return 'md:col-span-1';
  }
};
</script>