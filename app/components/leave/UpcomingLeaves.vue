<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Leaves</h3>
    </template>

    <div v-if="upcomingLeaves.length > 0" class="space-y-3">
      <div
        v-for="leave in upcomingLeaves"
        :key="leave.id"
        class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-1">
            <UBadge :color="getLeaveTypeColor(leave.type)" size="xs">
              {{ leave.type }}
            </UBadge>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ leave.duration }} {{ leave.duration === 1 ? 'day' : 'days' }}
            </span>
          </div>
          <div class="text-sm text-gray-900 dark:text-white font-medium">
            {{ formatDateRange(leave.startDate, leave.endDate) }}
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs text-gray-500 dark:text-gray-400">Starts in</div>
          <div class="text-lg font-bold text-primary">
            {{ leave.daysUntil }}d
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-6">
      <UIcon 
        name="i-material-symbols:event-available" 
        class="w-12 h-12 mx-auto text-gray-400 mb-2"
      />
      <p class="text-sm text-gray-500 dark:text-gray-400">
        No upcoming leaves
      </p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useLeaveData } from '~/composables/useLeaveData';

const { upcomingLeaves } = useLeaveData();

const getLeaveTypeColor = (type: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  const typeMap: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
    'Annual': 'success',
    'Sick': 'warning',
    'Personal': 'info',
    'Maternity': 'secondary',
    'Paternity': 'primary',
    'Unpaid': 'neutral'
  };
  return typeMap[type] || 'neutral';
};

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric'
  };
  
  if (startDate === endDate) {
    return start.toLocaleDateString('en-US', formatOptions);
  }
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
};
</script>
