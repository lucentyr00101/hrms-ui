<template>
  <DashboardWidget title="Recruitment Pipeline">
    <div class="space-y-4">
      <!-- Pipeline Stats -->
      <div class="grid grid-cols-3 gap-2">
        <div class="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ pipeline.applications }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Applications</p>
        </div>
        <div class="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ pipeline.interviews }}</div>
          <p class="text-xs text-yellow-700 dark:text-yellow-300">Interviews</p>
        </div>
        <div class="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ pipeline.offers }}</div>
          <p class="text-xs text-green-700 dark:text-green-300">Offers</p>
        </div>
      </div>

      <!-- Stage Progress -->
      <div class="space-y-3">
        <div 
          v-for="stage in pipeline.stages" 
          :key="stage.name"
          class="space-y-1"
        >
          <div class="flex justify-between text-sm">
            <span class="font-medium text-gray-700 dark:text-gray-300">{{ stage.name }}</span>
            <span class="text-gray-500 dark:text-gray-400">{{ stage.count }}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :class="stage.color"
              :style="`width: ${stage.percentage}%`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Conversion Rate -->
      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600 dark:text-gray-400">Conversion Rate</span>
          <span class="font-bold text-green-600 dark:text-green-400">{{ pipeline.conversionRate }}%</span>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const pipeline = {
  applications: 156,
  interviews: 42,
  offers: 12,
  conversionRate: 7.7,
  stages: [
    {
      name: 'Application Review',
      count: 89,
      percentage: 85,
      color: 'bg-blue-500'
    },
    {
      name: 'Phone Screening',
      count: 42,
      percentage: 65,
      color: 'bg-yellow-500'
    },
    {
      name: 'Technical Interview',
      count: 28,
      percentage: 45,
      color: 'bg-orange-500'
    },
    {
      name: 'Final Interview',
      count: 18,
      percentage: 30,
      color: 'bg-purple-500'
    },
    {
      name: 'Offer Extended',
      count: 12,
      percentage: 20,
      color: 'bg-green-500'
    }
  ]
};
</script>