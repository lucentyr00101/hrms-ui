<template>
  <LeaveCard title="Used Leave">
    <div class="space-y-4">
      <!-- Total Used -->
      <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {{ leaveSummary.used.total }}
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Days Used This Year
        </p>
      </div>

      <!-- Trend Indicator -->
      <div class="flex items-center justify-center space-x-2 py-2">
        <UIcon 
          :name="trendIcon" 
          :class="trendColorClass"
          class="w-5 h-5"
        />
        <span :class="trendColorClass" class="font-medium">
          {{ Math.abs(leaveSummary.used.percentageChange) }}%
        </span>
        <span class="text-gray-500 dark:text-gray-400 text-sm">
          vs last period ({{ leaveSummary.used.previousPeriod }} days)
        </span>
      </div>

      <!-- Expandable Breakdown -->
      <div class="space-y-2">
        <UButton
          variant="ghost"
          color="neutral"
          block
          @click="showBreakdown = !showBreakdown"
          class="justify-between"
        >
          <span>View Breakdown</span>
          <UIcon 
            :name="showBreakdown ? 'i-material-symbols:expand-less' : 'i-material-symbols:expand-more'" 
            class="w-5 h-5"
          />
        </UButton>

        <div v-if="showBreakdown" class="space-y-2 pt-2">
          <div
            v-for="leave in leaveSummary.used.breakdown"
            :key="leave.type"
            class="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
          >
            <span class="font-medium text-gray-900 dark:text-white">
              {{ leave.type }}
            </span>
            <span class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ leave.used }} days
            </span>
          </div>
        </div>
      </div>
    </div>
  </LeaveCard>
</template>

<script setup lang="ts">
import { useLeaveData } from '~/composables/useLeaveData';

const { leaveSummary } = useLeaveData();
const showBreakdown = ref(false);

const trendIcon = computed(() => {
  return leaveSummary.value.used.percentageChange > 0 
    ? 'i-material-symbols:trending-up' 
    : 'i-material-symbols:trending-down';
});

const trendColorClass = computed(() => {
  return leaveSummary.value.used.percentageChange > 0 
    ? 'text-red-600 dark:text-red-400' 
    : 'text-green-600 dark:text-green-400';
});
</script>
