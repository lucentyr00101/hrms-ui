<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <div class="p-4 sm:p-6 lg:p-8 space-y-6">
      <DashboardHeader />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <InterviewStats />
        <EmployeeLeaveStats />
        <div class="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <UpcomingInterviews />
        </div>
        <div class="md:col-span-2 lg:col-span-2">
          <InterviewTrendsChart />
        </div>
        <SuccessRateChart />
        <DepartmentLeaveChart />
      </div>

      <QuickActions />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Dashboard'
})
</script>