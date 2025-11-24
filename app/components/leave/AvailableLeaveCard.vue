<template>
  <LeaveCard title="Available Leave">
    <div class="space-y-4">
      <!-- Total Available -->
      <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          {{ leaveSummary.available.total }}
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Days Available
        </p>
      </div>

      <!-- Expandable Breakdown -->
      <div class="space-y-2">
        <UButton
          variant="ghost"
          color="gray"
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

        <div v-if="showBreakdown" class="space-y-3 pt-2">
          <div
            v-for="leave in leaveSummary.available.breakdown"
            :key="leave.type"
            class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-gray-900 dark:text-white">
                {{ leave.type }}
              </span>
              <span class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ leave.balance }} / {{ leave.total }}
              </span>
            </div>
            
            <!-- Progress Bar -->
            <UProgress 
              :value="(leave.balance / leave.total) * 100"
              :color="getProgressColor(leave.balance, leave.total)"
              size="sm"
            />

            <!-- Expiration Warning -->
            <div v-if="leave.expiresAt && isExpiringSoon(leave.expiresAt)" class="mt-2 flex items-center text-xs text-amber-600 dark:text-amber-400">
              <UIcon name="i-material-symbols:warning" class="w-4 h-4 mr-1" />
              <span>Expires {{ formatDate(leave.expiresAt) }}</span>
            </div>

            <!-- Carry Over Info -->
            <div v-if="leave.carryOver && leave.carryOver > 0" class="mt-1 text-xs text-blue-600 dark:text-blue-400">
              {{ leave.carryOver }} days carried over
            </div>
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

const getProgressColor = (balance: number, total: number) => {
  const percentage = (balance / total) * 100;
  if (percentage > 60) return 'green';
  if (percentage > 30) return 'amber';
  return 'red';
};

const isExpiringSoon = (expiresAt: string) => {
  const expiryDate = new Date(expiresAt);
  const today = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry <= 60;
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};
</script>
