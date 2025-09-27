<template>
  <DashboardWidget title="Team Performance">
    <div class="space-y-4">
      <!-- Performance Summary -->
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ performance.average }}%</div>
          <p class="text-xs text-green-700 dark:text-green-300">Avg Performance</p>
        </div>
        <div class="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ performance.goals }}%</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Goals Met</p>
        </div>
      </div>

      <!-- Team Members Performance -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Team Performance</h4>
        <div 
          v-for="member in performance.members" 
          :key="member.id"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
              <span class="text-xs text-white font-medium">{{ member.initials }}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ member.role }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getPerformanceColor(member.score)"
                :style="`width: ${member.score}%`"
              ></div>
            </div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ member.score }}%</span>
          </div>
        </div>
      </div>

      <!-- Trend -->
      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-center space-x-2 text-sm">
          <UIcon name="i-material-symbols:trending-up" class="w-4 h-4 text-green-500" />
          <span class="text-green-600 dark:text-green-400 font-medium">+8%</span>
          <span class="text-gray-500 dark:text-gray-400">vs last quarter</span>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const performance = {
  average: 87,
  goals: 92,
  members: [
    {
      id: '1',
      name: 'Alice Johnson',
      initials: 'AJ',
      role: 'Senior Developer',
      score: 94
    },
    {
      id: '2',
      name: 'Bob Smith',
      initials: 'BS',
      role: 'Developer',
      score: 88
    },
    {
      id: '3',
      name: 'Carol Davis',
      initials: 'CD',
      role: 'Designer',
      score: 91
    },
    {
      id: '4',
      name: 'David Wilson',
      initials: 'DW',
      role: 'QA Engineer',
      score: 76
    }
  ]
};

const getPerformanceColor = (score: number) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-blue-500';
  if (score >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};
</script>