<template>
  <LeaveCard title="Pending Approval">
    <div class="space-y-4">
      <!-- Count Display -->
      <div class="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
          {{ leaveSummary.pending.count }}
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pending Requests
        </p>
      </div>

      <!-- Pending Requests List -->
      <div v-if="leaveSummary.pending.count > 0" class="space-y-3">
        <div
          v-for="request in leaveSummary.pending.requests"
          :key="request.id"
          class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <span class="font-medium text-gray-900 dark:text-white">
                  {{ request.type }}
                </span>
                <UBadge 
                  v-if="request.isUrgent" 
                  color="error" 
                  size="xs"
                >
                  Urgent
                </UBadge>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ formatDateRange(request.startDate, request.endDate) }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <UBadge color="warning" variant="subtle" size="xs">
              {{ request.status }}
            </UBadge>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              @click="viewRequest(request.id)"
            >
              View Details
            </UButton>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-6">
        <UIcon 
          name="i-material-symbols:check-circle" 
          class="w-12 h-12 mx-auto text-green-500 mb-2"
        />
        <p class="text-sm text-gray-500 dark:text-gray-400">
          No pending requests
        </p>
      </div>
    </div>

    <template #footer v-if="leaveSummary.pending.count > 0">
      <UButton
        color="primary"
        variant="soft"
        block
        size="sm"
      >
        View All Pending Requests
      </UButton>
    </template>
  </LeaveCard>
</template>

<script setup lang="ts">
import { useLeaveData } from '~/composables/useLeaveData';

const { leaveSummary } = useLeaveData();

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  };
  
  if (startDate === endDate) {
    return start.toLocaleDateString('en-US', formatOptions);
  }
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
};

const viewRequest = (requestId: string) => {
  // Handle view request details
  console.log('View request:', requestId);
};
</script>
