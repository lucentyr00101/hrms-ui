<template>
  <div class="space-y-6">
    <PageHeader
      title="Interviews"
      description="Schedule and manage interviews with candidates."
    />

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        to="/interviews/candidates"
        class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group border border-gray-200 dark:border-gray-700"
      >
        <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UIcon name="i-material-symbols:person-search" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          View Candidates
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          Browse and manage candidates through the interview process
        </p>
      </NuxtLink>

      <button 
        class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group border border-gray-200 dark:border-gray-700"
        @click="handleScheduleInterview"
      >
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UIcon name="i-material-symbols:calendar-add-on" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Schedule Interview
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          Schedule a new interview with a candidate
        </p>
      </button>

      <button 
        class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group border border-gray-200 dark:border-gray-700"
        @click="handleViewCalendar"
      >
        <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UIcon name="i-material-symbols:calendar-month" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Interview Calendar
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
          View scheduled interviews in calendar format
        </p>
      </button>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Recent Interview Activity
      </h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-center space-x-3">
            <UIcon name="i-material-symbols:person" class="w-5 h-5 text-blue-600" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                John Smith - Technical Interview
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                Software Engineer position
              </p>
            </div>
          </div>
          <UBadge color="blue" label="Scheduled" size="sm" />
        </div>
        
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-center space-x-3">
            <UIcon name="i-material-symbols:person" class="w-5 h-5 text-green-600" />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Emily Davis - Final Interview
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400">
                UX Designer position
              </p>
            </div>
          </div>
          <UBadge color="green" label="Completed" size="sm" />
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/interviews/candidates"
          class="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>View all candidates</span>
          <UIcon name="i-material-symbols:arrow-forward" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleScheduleInterview = () => {
  // TODO: Implement interview scheduling
  console.log('Schedule interview clicked');
};

const handleViewCalendar = () => {
  // TODO: Implement calendar view
  console.log('View calendar clicked');
};
</script>
