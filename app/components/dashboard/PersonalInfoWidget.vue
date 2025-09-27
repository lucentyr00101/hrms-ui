<template>
  <DashboardWidget title="Personal Information">
    <div class="space-y-4">
      <!-- Profile Header -->
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <span class="text-lg text-white font-medium">{{ userInitials }}</span>
        </div>
        <div>
          <div class="text-lg font-medium text-gray-900 dark:text-white">{{ personalInfo.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ personalInfo.position }}</div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ personalInfo.yearsAtCompany }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Years at Company</p>
        </div>
        <div class="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ personalInfo.department }}</div>
          <p class="text-xs text-green-700 dark:text-green-300">Department</p>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Details</h4>
        <div class="space-y-1 text-sm">
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:mail" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-600 dark:text-gray-400">{{ personalInfo.email }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:phone" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-600 dark:text-gray-400">{{ personalInfo.phone }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:location-on" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-600 dark:text-gray-400">{{ personalInfo.location }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex space-x-2">
        <button class="flex-1 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const { user } = useUser();

const personalInfo = {
  name: user.value?.name || 'Employee Name',
  position: 'Software Engineer',
  department: user.value?.department || 'Engineering',
  email: user.value?.email || 'employee@hrms.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  yearsAtCompany: 3
};

const userInitials = computed(() => {
  return personalInfo.name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();
});
</script>