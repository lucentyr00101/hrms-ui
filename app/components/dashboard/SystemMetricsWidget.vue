<template>
  <DashboardWidget title="System Metrics">
    <div class="space-y-4">
      <!-- System Health -->
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ metrics.uptime }}%</div>
          <p class="text-xs text-green-700 dark:text-green-300">System Uptime</p>
        </div>
        <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ metrics.activeUsers }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Active Users</p>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ metrics.responseTime }}ms</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
          <div class="flex items-center space-x-2">
            <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getUsageColor(metrics.cpuUsage)"
                :style="`width: ${metrics.cpuUsage}%`"
              ></div>
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ metrics.cpuUsage }}%</span>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
          <div class="flex items-center space-x-2">
            <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getUsageColor(metrics.memoryUsage)"
                :style="`width: ${metrics.memoryUsage}%`"
              ></div>
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ metrics.memoryUsage }}%</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Last Backup:</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ metrics.lastBackup }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">Database Size:</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ metrics.dbSize }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500 dark:text-gray-400">API Calls Today:</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ metrics.apiCalls.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const metrics = {
  uptime: 99.8,
  activeUsers: 234,
  responseTime: 145,
  cpuUsage: 42,
  memoryUsage: 67,
  lastBackup: '2 hours ago',
  dbSize: '2.4 GB',
  apiCalls: 15782
};

const getUsageColor = (usage: number) => {
  if (usage >= 80) return 'bg-red-500';
  if (usage >= 60) return 'bg-yellow-500';
  return 'bg-green-500';
};
</script>