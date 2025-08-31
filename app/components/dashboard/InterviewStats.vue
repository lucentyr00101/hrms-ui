<template>
  <DashboardWidget
    title="Interviews Scheduled"
    :show-period-selector="true"
    @period-change="handlePeriodChange"
  >
    <div class="text-center">
      <div class="mb-4">
        <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {{ currentValue }}
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Interviews this {{ selectedPeriod }}
        </p>
      </div>
      
      <div class="grid grid-cols-3 gap-2 text-xs">
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
          <div class="font-semibold text-purple-700 dark:text-purple-300">Week</div>
          <div class="text-purple-900 dark:text-purple-100">{{ stats.interviewsThisWeek }}</div>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
          <div class="font-semibold text-blue-700 dark:text-blue-300">Month</div>
          <div class="text-blue-900 dark:text-blue-100">{{ stats.interviewsThisMonth }}</div>
        </div>
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
          <div class="font-semibold text-green-700 dark:text-green-300">Year</div>
          <div class="text-green-900 dark:text-green-100">{{ stats.interviewsThisYear }}</div>
        </div>
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-center space-x-2 text-sm">
          <UIcon name="i-material-symbols:trending-up" class="w-4 h-4 text-green-500" />
          <span class="text-green-600 dark:text-green-400 font-medium">+12%</span>
          <span class="text-gray-500 dark:text-gray-400">vs last {{ selectedPeriod }}</span>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { DUMMY_DASHBOARD_STATS } from '~/constants/DUMMY_DASHBOARD_DATA';

const stats = DUMMY_DASHBOARD_STATS;
const selectedPeriod = ref('week');
const currentValue = computed(() => {
  switch (selectedPeriod.value) {
    case 'week':
      return stats.interviewsThisWeek;
    case 'month':
      return stats.interviewsThisMonth;
    case 'year':
      return stats.interviewsThisYear;
    default:
      return stats.interviewsThisWeek;
  }
});

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};
</script>