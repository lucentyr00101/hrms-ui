<template>
  <DashboardWidget title="Employee Statistics">
    <div class="space-y-4">
      <!-- Key Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.totalEmployees }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Total Employees</p>
        </div>
        <div class="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.newHires }}</div>
          <p class="text-xs text-green-700 dark:text-green-300">New Hires</p>
        </div>
      </div>

      <!-- Department Breakdown -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">By Department</h4>
        <div 
          v-for="dept in stats.departments" 
          :key="dept.name"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-gray-600 dark:text-gray-400">{{ dept.name }}</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ dept.count }}</span>
        </div>
      </div>

      <!-- Turnover Rate -->
      <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <div class="flex items-center justify-between">
          <span class="text-sm text-yellow-700 dark:text-yellow-300">Turnover Rate</span>
          <span class="font-bold text-yellow-600 dark:text-yellow-400">{{ stats.turnoverRate }}%</span>
        </div>
        <div class="mt-1 w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
          <div 
            class="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
            :style="`width: ${stats.turnoverRate}%`"
          ></div>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const stats = {
  totalEmployees: 342,
  newHires: 12,
  turnoverRate: 8.5,
  departments: [
    { name: 'Engineering', count: 98 },
    { name: 'Sales', count: 67 },
    { name: 'Marketing', count: 45 },
    { name: 'HR', count: 23 },
    { name: 'Finance', count: 34 },
    { name: 'Operations', count: 75 }
  ]
};
</script>