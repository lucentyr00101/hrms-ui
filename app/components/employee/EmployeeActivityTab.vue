<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:history" class="w-5 h-5 text-primary" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Timeline</h3>
          </div>
          <USelectMenu
            v-model="selectedFilter"
            :options="filterOptions"
            placeholder="Filter activities"
            @change="filterActivities"
          />
        </div>
      </template>

      <div v-if="filteredActivities.length === 0" class="text-center py-8">
        <UIcon name="i-material-symbols:timeline" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities found</h4>
        <p class="text-gray-500 dark:text-gray-400">Activities will appear here as they occur.</p>
      </div>

      <div v-else class="relative">
        <!-- Timeline line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"/>
        
        <!-- Timeline items -->
        <div class="space-y-6">
          <div
            v-for="activity in filteredActivities"
            :key="activity.id"
            class="relative flex items-start space-x-4"
          >
            <!-- Timeline dot -->
            <div class="relative flex items-center justify-center">
              <div 
                class="w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 z-10"
                :class="getActivityColor(activity.type)"
              />
            </div>

            <!-- Activity content -->
            <div class="flex-1 min-w-0 pb-6">
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <div 
                    class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    :class="getActivityBgColor(activity.type)"
                  >
                    <UIcon :name="getActivityIcon(activity.type)" class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ activity.title }}
                      </h4>
                      <UBadge 
                        :label="formatActivityType(activity.type)"
                        :color="getActivityBadgeColor(activity.type)"
                        size="xs"
                      />
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{ activity.description }}
                    </p>
                    <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <div class="flex items-center space-x-1">
                        <UIcon name="i-material-symbols:calendar-today" class="w-3 h-3" />
                        <span>{{ formatDate(activity.date) }}</span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <UIcon name="i-material-symbols:schedule" class="w-3 h-3" />
                        <span>{{ activity.time }}</span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <UIcon name="i-material-symbols:person" class="w-3 h-3" />
                        <span>{{ activity.user }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Activity actions -->
                <UDropdown :items="getActivityActions(activity)">
                  <UButton variant="ghost" size="xs" class="rounded-full">
                    <UIcon name="i-material-symbols:more-vert" class="w-4 h-4" />
                  </UButton>
                </UDropdown>
              </div>

              <!-- Activity details (expandable) -->
              <div 
                v-if="expandedActivities.includes(activity.id)"
                class="mt-4 ml-13 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Activity ID</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ activity.id }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Type</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ formatActivityType(activity.type) }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Date & Time</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ formatDateTime(activity.date, activity.time) }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 dark:text-gray-400">Initiated By</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ activity.user }}</p>
                  </div>
                  <div class="md:col-span-2">
                    <p class="text-gray-500 dark:text-gray-400">Description</p>
                    <p class="font-medium text-gray-900 dark:text-white">{{ activity.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Activity Statistics -->
    <UCard>
      <template #header>
        <div class="flex items-center space-x-2">
          <UIcon name="i-material-symbols:analytics" class="w-5 h-5 text-primary" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activity Statistics</h3>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          v-for="(stat, type) in activityStats"
          :key="type"
          class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center"
            :class="getActivityBgColor(type)"
          >
            <UIcon :name="getActivityIcon(type)" class="w-5 h-5 text-white" />
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatActivityType(type) }}</p>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { ActivityItem } from '~/types';

interface Props {
  employeeId: string;
  activities: ActivityItem[];
}

const props = defineProps<Props>();

// Reactive state
const selectedFilter = ref('');
const filteredActivities = ref<ActivityItem[]>([]);
const expandedActivities = ref<string[]>([]);
const activityStats = ref<Record<string, number>>({});

// Filter options
const filterOptions = [
  { label: 'All Activities', value: '' },
  { label: 'Hiring', value: 'hire' },
  { label: 'Promotions', value: 'promotion' },
  { label: 'Leave', value: 'leave' },
  { label: 'Documents', value: 'document' },
  { label: 'Reviews', value: 'review' },
  { label: 'Updates', value: 'update' }
];

// Initialize
filteredActivities.value = [...props.activities].sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Calculate statistics
const calculateStats = () => {
  const stats: Record<string, number> = {};
  props.activities.forEach(activity => {
    stats[activity.type] = (stats[activity.type] || 0) + 1;
  });
  activityStats.value = stats;
};

calculateStats();

// Filter activities
const filterActivities = () => {
  if (!selectedFilter.value) {
    filteredActivities.value = [...props.activities].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else {
    filteredActivities.value = props.activities
      .filter(activity => activity.type === selectedFilter.value)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
};

// Activity actions
const getActivityActions = (activity: ActivityItem) => [
  [{
    label: expandedActivities.value.includes(activity.id) ? 'Collapse' : 'Expand',
    icon: expandedActivities.value.includes(activity.id) ? 'i-material-symbols:expand-less' : 'i-material-symbols:expand-more',
    click: () => toggleActivityExpansion(activity.id)
  }],
  [{
    label: 'Copy Details',
    icon: 'i-material-symbols:content-copy',
    click: () => copyActivityDetails(activity)
  }]
];

const toggleActivityExpansion = (activityId: string) => {
  const index = expandedActivities.value.indexOf(activityId);
  if (index > -1) {
    expandedActivities.value.splice(index, 1);
  } else {
    expandedActivities.value.push(activityId);
  }
};

const copyActivityDetails = (activity: ActivityItem) => {
  const details = `
Activity: ${activity.title}
Type: ${formatActivityType(activity.type)}
Date: ${formatDateTime(activity.date, activity.time)}
Description: ${activity.description}
User: ${activity.user}
  `.trim();
  
  navigator.clipboard.writeText(details).then(() => {
    console.log('Activity details copied to clipboard');
  });
};

// Utility functions
const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    hire: 'i-material-symbols:person-add',
    promotion: 'i-material-symbols:trending-up',
    leave: 'i-material-symbols:time-to-leave',
    document: 'i-material-symbols:description',
    review: 'i-material-symbols:rate-review',
    update: 'i-material-symbols:update'
  };
  return icons[type] || 'i-material-symbols:event';
};

const getActivityColor = (type: string) => {
  const colors: Record<string, string> = {
    hire: 'bg-green-500',
    promotion: 'bg-blue-500',
    leave: 'bg-yellow-500',
    document: 'bg-purple-500',
    review: 'bg-indigo-500',
    update: 'bg-gray-500'
  };
  return colors[type] || 'bg-gray-500';
};

const getActivityBgColor = (type: string) => {
  return getActivityColor(type);
};

const getActivityBadgeColor = (type: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  const colors: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
    hire: 'success',
    promotion: 'info',
    leave: 'warning',
    document: 'secondary',
    review: 'primary',
    update: 'neutral'
  };
  return colors[type] || 'neutral';
};

const formatActivityType = (type: string) => {
  const types: Record<string, string> = {
    hire: 'Hiring',
    promotion: 'Promotion',
    leave: 'Leave',
    document: 'Document',
    review: 'Review',
    update: 'Update'
  };
  return types[type] || type;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (dateString: string, time: string) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })} at ${time}`;
};

// Watch for prop changes
watch(() => props.activities, (newActivities) => {
  filteredActivities.value = [...newActivities].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  calculateStats();
}, { immediate: true });
</script>