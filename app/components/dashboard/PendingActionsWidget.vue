<template>
  <DashboardWidget title="Pending Actions">
    <div class="space-y-4">
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ pendingCount }}</div>
          <p class="text-xs text-orange-700 dark:text-orange-300">Total Pending</p>
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ urgentCount }}</div>
          <p class="text-xs text-red-700 dark:text-red-300">Urgent</p>
        </div>
      </div>

      <!-- Actions List -->
      <div class="space-y-2">
        <div 
          v-for="action in pendingActions.slice(0, 4)" 
          :key="action.id"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <div class="flex items-center space-x-3">
            <div class="w-2 h-2 rounded-full" :class="getPriorityColor(action.priority)"></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ action.title }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ action.type }}</div>
            </div>
          </div>
          <div class="text-xs text-gray-400 dark:text-gray-500">{{ action.daysAgo }}d</div>
        </div>
      </div>

      <!-- View All Button -->
      <button class="w-full mt-3 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
        View All Actions
      </button>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
interface PendingAction {
  id: string;
  title: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  daysAgo: number;
}

const pendingActions: PendingAction[] = [
  {
    id: '1',
    title: 'Review Leave Request - John Doe',
    type: 'Leave Management',
    priority: 'high',
    daysAgo: 2
  },
  {
    id: '2',
    title: 'Approve Salary Adjustment',
    type: 'Payroll',
    priority: 'medium',
    daysAgo: 1
  },
  {
    id: '3',
    title: 'Complete Employee Onboarding',
    type: 'Recruitment',
    priority: 'high',
    daysAgo: 0
  },
  {
    id: '4',
    title: 'Schedule Performance Review',
    type: 'Performance',
    priority: 'low',
    daysAgo: 3
  },
  {
    id: '5',
    title: 'Update Job Description',
    type: 'Job Management',
    priority: 'medium',
    daysAgo: 5
  }
];

const pendingCount = computed(() => pendingActions.length);
const urgentCount = computed(() => pendingActions.filter(a => a.priority === 'high').length);

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-orange-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};
</script>