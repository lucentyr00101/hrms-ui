<template>
  <DashboardWidget title="Upcoming Reviews">
    <div class="space-y-4">
      <!-- Summary -->
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ reviews.thisWeek.length }}</div>
          <p class="text-xs text-orange-700 dark:text-orange-300">This Week</p>
        </div>
        <div class="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ reviews.overdue.length }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Overdue</p>
        </div>
      </div>

      <!-- Upcoming Reviews List -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">This Week</h4>
        <div 
          v-for="review in reviews.thisWeek.slice(0, 3)" 
          :key="review.id"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
              <span class="text-xs text-white font-medium">{{ review.employee.initials }}</span>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ review.employee.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ review.type }} • {{ review.date }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span 
              class="px-2 py-1 text-xs rounded-full"
              :class="getPriorityColor(review.priority)"
            >
              {{ review.priority }}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex space-x-2">
        <button class="flex-1 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
          Schedule Review
        </button>
        <button class="flex-1 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          View Calendar
        </button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const reviews = {
  thisWeek: [
    {
      id: '1',
      employee: { name: 'Alice Johnson', initials: 'AJ' },
      type: 'Quarterly Review',
      date: 'Jan 18',
      priority: 'high'
    },
    {
      id: '2',
      employee: { name: 'Bob Smith', initials: 'BS' },
      type: 'Performance Check-in',
      date: 'Jan 19',
      priority: 'medium'
    },
    {
      id: '3',
      employee: { name: 'Carol Davis', initials: 'CD' },
      type: 'Annual Review',
      date: 'Jan 20',
      priority: 'high'
    }
  ],
  overdue: [
    {
      id: '4',
      employee: { name: 'David Wilson', initials: 'DW' },
      type: 'Mid-year Review',
      daysOverdue: 5
    }
  ]
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};
</script>