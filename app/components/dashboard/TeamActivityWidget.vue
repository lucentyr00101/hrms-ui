<template>
  <DashboardWidget title="Team Activity">
    <div class="space-y-4">
      <!-- Team Summary -->
      <div class="grid grid-cols-3 gap-2">
        <div class="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ teamStats.present }}</div>
          <p class="text-xs text-green-700 dark:text-green-300">Present</p>
        </div>
        <div class="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div class="text-lg font-bold text-yellow-600 dark:text-yellow-400">{{ teamStats.onLeave }}</div>
          <p class="text-xs text-yellow-700 dark:text-yellow-300">On Leave</p>
        </div>
        <div class="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ teamStats.remote }}</div>
          <p class="text-xs text-blue-700 dark:text-blue-300">Remote</p>
        </div>
      </div>

      <!-- Team Members Activity -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Activity</h4>
        <div 
          v-for="member in teamActivity.slice(0, 5)" 
          :key="member.id"
          class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
            <span class="text-xs text-white font-medium">{{ member.initials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ member.activity }}</div>
          </div>
          <div class="text-xs text-gray-400">{{ member.time }}</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="flex space-x-2">
        <button class="flex-1 px-3 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
          View All
        </button>
        <button class="flex-1 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
          Send Message
        </button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
interface TeamMember {
  id: string;
  name: string;
  initials: string;
  activity: string;
  time: string;
}

const teamStats = {
  present: 8,
  onLeave: 2,
  remote: 3
};

const teamActivity: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    initials: 'AJ',
    activity: 'Completed project milestone',
    time: '2h ago'
  },
  {
    id: '2',
    name: 'Bob Smith',
    initials: 'BS',
    activity: 'Started work on feature branch',
    time: '3h ago'
  },
  {
    id: '3',
    name: 'Carol Davis',
    initials: 'CD',
    activity: 'Submitted expense report',
    time: '4h ago'
  },
  {
    id: '4',
    name: 'David Wilson',
    initials: 'DW',
    activity: 'Attended team meeting',
    time: '5h ago'
  },
  {
    id: '5',
    name: 'Emma Brown',
    initials: 'EB',
    activity: 'Updated project documentation',
    time: '6h ago'
  }
];
</script>