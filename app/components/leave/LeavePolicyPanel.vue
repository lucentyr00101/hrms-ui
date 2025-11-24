<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Leave Policy Summary</h3>
    </template>

    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div class="text-sm text-gray-600 dark:text-gray-400">Max Consecutive Days</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ leavePolicy.maxConsecutiveDays }}
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div class="text-sm text-gray-600 dark:text-gray-400">Min Notice Period</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ leavePolicy.minNoticePeriodInDays }} days
          </div>
        </div>
      </div>

      <div v-if="leavePolicy.blackoutDates.length > 0">
        <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Blackout Dates
        </div>
        <div class="space-y-2">
          <div
            v-for="(blackout, index) in leavePolicy.blackoutDates"
            :key="index"
            class="flex items-start space-x-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2"
          >
            <UIcon name="i-material-symbols:block" class="w-4 h-4 text-red-600 mt-0.5" />
            <div class="flex-1 text-sm">
              <div class="font-medium text-red-900 dark:text-red-100">
                {{ formatDateRange(blackout.startDate, blackout.endDate) }}
              </div>
              <div class="text-red-700 dark:text-red-300 text-xs">
                {{ blackout.reason }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UButton
        color="primary"
        variant="soft"
        size="sm"
        block
        icon="i-material-symbols:open-in-new"
      >
        View Full Policy Document
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useLeaveData } from '~/composables/useLeaveData';

const { leavePolicy } = useLeaveData();

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric'
  };
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
};
</script>
