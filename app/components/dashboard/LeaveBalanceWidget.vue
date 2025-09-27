<template>
  <DashboardWidget title="Leave Balance">
    <div class="space-y-4">
      <!-- Current Balance -->
      <div class="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ balances.total }}</div>
        <p class="text-sm text-blue-700 dark:text-blue-300">Days Available</p>
      </div>

      <!-- Balance Breakdown -->
      <div class="space-y-2">
        <div 
          v-for="leaveType in balances.types" 
          :key="leaveType.name"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center space-x-2">
            <div 
              class="w-3 h-3 rounded-full" 
              :class="leaveType.color"
            ></div>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ leaveType.name }}</span>
          </div>
          <span class="text-sm font-bold text-gray-900 dark:text-white">{{ leaveType.available }}/{{ leaveType.total }}</span>
        </div>
      </div>

      <!-- Usage Summary -->
      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600 dark:text-gray-400">Used this year</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ balances.used }} days</span>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const balances = {
  total: 18,
  used: 7,
  types: [
    {
      name: 'Vacation',
      available: 12,
      total: 15,
      color: 'bg-blue-500'
    },
    {
      name: 'Sick Leave',
      available: 5,
      total: 10,
      color: 'bg-green-500'
    },
    {
      name: 'Personal',
      available: 1,
      total: 3,
      color: 'bg-purple-500'
    }
  ]
};
</script>