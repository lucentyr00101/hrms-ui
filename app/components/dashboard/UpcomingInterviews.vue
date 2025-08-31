<template>
  <DashboardWidget title="Upcoming Interviews">
    <div class="space-y-3">
      <div 
        v-for="interview in upcomingInterviews" 
        :key="interview.id"
        class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
      >
        <div class="flex-1">
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:person" class="w-4 h-4 text-blue-600" />
            <h4 class="font-medium text-gray-900 dark:text-white text-sm">
              {{ interview.candidateName }}
            </h4>
          </div>
          <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {{ interview.position }}
          </p>
          <div class="flex items-center space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <div class="flex items-center space-x-1">
              <UIcon name="i-material-symbols:calendar-today" class="w-3 h-3" />
              <span>{{ formatDate(interview.date) }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <UIcon name="i-material-symbols:schedule" class="w-3 h-3" />
              <span>{{ interview.time }}</span>
            </div>
          </div>
        </div>
        <div class="ml-2">
          <UBadge 
            :color="getStatusColor(interview.status)"
            size="xs"
            variant="soft"
          >
            {{ interview.status }}
          </UBadge>
        </div>
      </div>

      <div v-if="upcomingInterviews.length === 0" class="text-center py-6 text-gray-500 dark:text-gray-400">
        <UIcon name="i-material-symbols:event-busy" class="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p class="text-sm">No upcoming interviews</p>
      </div>

      <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/interviews"
          class="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>View all interviews</span>
          <UIcon name="i-material-symbols:arrow-forward" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { DUMMY_INTERVIEW_DATA } from '~/constants/DUMMY_DASHBOARD_DATA';

const upcomingInterviews = computed(() => {
  const today = new Date();
  return DUMMY_INTERVIEW_DATA
    .filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate >= today && interview.status === 'scheduled';
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4); // Show only next 4 interviews
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    weekday: 'short'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'blue';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
};
</script>