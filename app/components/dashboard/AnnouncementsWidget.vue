<template>
  <DashboardWidget title="Announcements">
    <div class="space-y-4">
      <!-- Announcements List -->
      <div class="space-y-3">
        <div 
          v-for="announcement in announcements.slice(0, 4)" 
          :key="announcement.id"
          class="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2">
              <div 
                class="w-2 h-2 rounded-full" 
                :class="getPriorityColor(announcement.priority)"
              ></div>
              <h5 class="text-sm font-medium text-gray-900 dark:text-white">
                {{ announcement.title }}
              </h5>
            </div>
            <div class="flex items-center space-x-2">
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="getCategoryColor(announcement.category)"
              >
                {{ announcement.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {{ announcement.excerpt }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between text-xs">
            <span class="text-gray-500 dark:text-gray-400">
              {{ announcement.author }} • {{ announcement.date }}
            </span>
            <button 
              v-if="!announcement.read"
              class="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Mark as read
            </button>
          </div>
        </div>
      </div>

      <!-- View All -->
      <div class="text-center">
        <button class="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
          View All Announcements
        </button>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  author: string;
  date: string;
  read: boolean;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'New Health Insurance Benefits Available',
    excerpt: 'We are excited to announce enhanced health insurance options starting next month...',
    category: 'Benefits',
    priority: 'high',
    author: 'HR Team',
    date: '2024-01-15',
    read: false
  },
  {
    id: '2',
    title: 'Office Closure - Martin Luther King Jr. Day',
    excerpt: 'Our offices will be closed on Monday, January 17th in observance of Martin Luther King Jr. Day.',
    category: 'Holiday',
    priority: 'medium',
    author: 'Administration',
    date: '2024-01-12',
    read: true
  },
  {
    id: '3',
    title: 'Q4 Performance Reviews Due',
    excerpt: 'Reminder: All Q4 performance reviews must be completed by January 31st...',
    category: 'Performance',
    priority: 'high',
    author: 'HR Team',
    date: '2024-01-10',
    read: false
  },
  {
    id: '4',
    title: 'New Coffee Machine in Break Room',
    excerpt: 'We have installed a new premium coffee machine in the main break room. Enjoy!',
    category: 'General',
    priority: 'low',
    author: 'Facilities',
    date: '2024-01-08',
    read: true
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Benefits': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    case 'Holiday': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    case 'Performance': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
    case 'General': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};
</script>