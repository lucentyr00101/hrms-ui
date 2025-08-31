<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your HRMS today.
        </p>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Row 1: Key Metrics -->
        <div class="md:col-span-1">
          <InterviewStats />
        </div>
        
        <div class="md:col-span-1">
          <EmployeeLeaveStats />
        </div>

        <div class="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <UpcomingInterviews />
        </div>

        <!-- Row 2: Charts and Analytics -->
        <div class="md:col-span-2 lg:col-span-2">
          <InterviewTrendsChart />
        </div>

        <div class="md:col-span-1">
          <SuccessRateChart />
        </div>

        <div class="md:col-span-1">
          <DepartmentLeaveChart />
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink 
            to="/interviews"
            class="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
          >
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UIcon name="i-material-symbols:calendar-add-on" class="w-6 h-6 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
              Schedule Interview
            </span>
          </NuxtLink>

          <NuxtLink 
            to="/employees"
            class="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
          >
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UIcon name="i-material-symbols:person-add" class="w-6 h-6 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
              Add Employee
            </span>
          </NuxtLink>

          <button class="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UIcon name="i-material-symbols:analytics" class="w-6 h-6 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
              View Reports
            </span>
          </button>

          <button class="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UIcon name="i-material-symbols:settings" class="w-6 h-6 text-white" />
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white text-center">
              Settings
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import all dashboard components
import InterviewStats from '~/components/dashboard/InterviewStats.vue';
import EmployeeLeaveStats from '~/components/dashboard/EmployeeLeaveStats.vue';
import UpcomingInterviews from '~/components/dashboard/UpcomingInterviews.vue';
import InterviewTrendsChart from '~/components/dashboard/InterviewTrendsChart.vue';
import SuccessRateChart from '~/components/dashboard/SuccessRateChart.vue';
import DepartmentLeaveChart from '~/components/dashboard/DepartmentLeaveChart.vue';
</script>