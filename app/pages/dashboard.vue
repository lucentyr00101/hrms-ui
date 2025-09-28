<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <div class="p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

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

      <QuickActions />
    </div>
  </div>
</template>

<script setup>
// Import all dashboard components
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue';
import InterviewStats from '~/components/dashboard/InterviewStats.vue';
import EmployeeLeaveStats from '~/components/dashboard/EmployeeLeaveStats.vue';
import UpcomingInterviews from '~/components/dashboard/UpcomingInterviews.vue';
import InterviewTrendsChart from '~/components/dashboard/InterviewTrendsChart.vue';
import SuccessRateChart from '~/components/dashboard/SuccessRateChart.vue';
import DepartmentLeaveChart from '~/components/dashboard/DepartmentLeaveChart.vue';
import QuickActions from '~/components/dashboard/QuickActions.vue';
</script>