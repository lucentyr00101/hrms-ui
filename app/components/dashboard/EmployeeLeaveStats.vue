<template>
  <DashboardWidget
    title="Employees on Leave"
    :show-period-selector="true"
    @period-change="handlePeriodChange"
  >
    <div class="text-center">
      <div class="mb-4">
        <div class="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          {{ currentValue }}
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Employees this {{ selectedPeriod }}
        </p>
      </div>
      
      <div class="grid grid-cols-3 gap-2 text-xs">
        <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
          <div class="font-semibold text-orange-700 dark:text-orange-300">Week</div>
          <div class="text-orange-900 dark:text-orange-100">{{ stats.employeesOnLeaveThisWeek }}</div>
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-2">
          <div class="font-semibold text-red-700 dark:text-red-300">Month</div>
          <div class="text-red-900 dark:text-red-100">{{ stats.employeesOnLeaveThisMonth }}</div>
        </div>
        <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-2">
          <div class="font-semibold text-pink-700 dark:text-pink-300">Year</div>
          <div class="text-pink-900 dark:text-pink-100">{{ stats.employeesOnLeaveThisYear }}</div>
        </div>
      </div>

      <div class="mt-4">
        <div class="flex items-center justify-center space-x-2 text-sm">
          <UIcon name="i-material-symbols:trending-down" class="w-4 h-4 text-red-500" />
          <span class="text-red-600 dark:text-red-400 font-medium">-5%</span>
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
      return stats.employeesOnLeaveThisWeek;
    case 'month':
      return stats.employeesOnLeaveThisMonth;
    case 'year':
      return stats.employeesOnLeaveThisYear;
    default:
      return stats.employeesOnLeaveThisWeek;
  }
});

const handlePeriodChange = (period: string) => {
  selectedPeriod.value = period;
};
</script>