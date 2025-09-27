<template>
  <DashboardWidget title="My Requests">
    <div class="space-y-4">
      <!-- Status Summary -->
      <div class="grid grid-cols-3 gap-2">
        <div class="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ requestCounts.pending }}</div>
          <p class="text-xs text-yellow-700 dark:text-yellow-300">Pending</p>
        </div>
        <div class="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ requestCounts.approved }}</div>
          <p class="text-xs text-green-700 dark:text-green-300">Approved</p>
        </div>
        <div class="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div class="text-lg font-bold text-red-600 dark:text-red-400">{{ requestCounts.rejected }}</div>
          <p class="text-xs text-red-700 dark:text-red-300">Rejected</p>
        </div>
      </div>

      <!-- Recent Requests -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Requests</h4>
        <div 
          v-for="request in recentRequests.slice(0, 4)" 
          :key="request.id"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div 
              class="w-3 h-3 rounded-full" 
              :class="getStatusColor(request.status)"
            ></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ request.type }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ request.description }}</div>
            </div>
          </div>
          <div class="text-xs text-gray-400">{{ request.date }}</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex space-x-2">
        <button class="flex-1 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
          New Request
        </button>
        <button class="flex-1 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          View All
        </button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
interface Request {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

const recentRequests: Request[] = [
  {
    id: '1',
    type: 'Leave Request',
    description: 'Vacation Leave - 3 days',
    status: 'approved',
    date: '2024-01-10'
  },
  {
    id: '2',
    type: 'Equipment Request',
    description: 'New laptop for development',
    status: 'pending',
    date: '2024-01-08'
  },
  {
    id: '3',
    type: 'Training Request',
    description: 'React Advanced Workshop',
    status: 'approved',
    date: '2024-01-05'
  },
  {
    id: '4',
    type: 'Remote Work',
    description: 'Work from home - 2 days/week',
    status: 'pending',
    date: '2024-01-03'
  }
];

const requestCounts = computed(() => ({
  pending: recentRequests.filter(r => r.status === 'pending').length,
  approved: recentRequests.filter(r => r.status === 'approved').length,
  rejected: recentRequests.filter(r => r.status === 'rejected').length
}));

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500';
    case 'approved': return 'bg-green-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};
</script>