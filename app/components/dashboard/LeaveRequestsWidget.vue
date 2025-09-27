<template>
  <DashboardWidget title="Leave Requests">
    <div class="space-y-4">
      <!-- Summary -->
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ pendingRequests.length }}</div>
          <p class="text-xs text-orange-700 dark:text-orange-300">Pending Approval</p>
        </div>
        <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ upcomingLeaves.length }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Upcoming Leaves</p>
        </div>
      </div>

      <!-- Pending Requests -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Requests</h4>
        <div 
          v-for="request in pendingRequests.slice(0, 3)" 
          :key="request.id"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span class="text-xs text-white font-medium">{{ request.employee.initials }}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ request.employee.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ request.type }} • {{ request.duration }}</div>
            </div>
          </div>
          <div class="flex space-x-1">
            <button class="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded">
              <UIcon name="i-material-symbols:check" class="w-4 h-4" />
            </button>
            <button class="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
              <UIcon name="i-material-symbols:close" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex space-x-2">
        <button class="flex-1 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
          View All Requests
        </button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
interface LeaveRequest {
  id: string;
  employee: {
    name: string;
    initials: string;
  };
  type: string;
  duration: string;
  requestDate: string;
}

const pendingRequests: LeaveRequest[] = [
  {
    id: '1',
    employee: { name: 'Alice Johnson', initials: 'AJ' },
    type: 'Vacation',
    duration: '3 days',
    requestDate: '2024-01-15'
  },
  {
    id: '2',
    employee: { name: 'Bob Smith', initials: 'BS' },
    type: 'Sick Leave',
    duration: '1 day',
    requestDate: '2024-01-14'
  },
  {
    id: '3',
    employee: { name: 'Carol Davis', initials: 'CD' },
    type: 'Personal',
    duration: '2 days',
    requestDate: '2024-01-13'
  }
];

const upcomingLeaves = [
  { id: '1', employee: 'David Wilson', type: 'Vacation', startDate: '2024-01-20' },
  { id: '2', employee: 'Emma Brown', type: 'Personal', startDate: '2024-01-22' }
];
</script>