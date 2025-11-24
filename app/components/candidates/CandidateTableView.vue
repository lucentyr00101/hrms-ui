<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <!-- Table Header with Sort Controls -->
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          Candidates ({{ candidates.length }})
        </h3>
        <div class="flex items-center space-x-4">
          <UFormGroup label="Sort by">
            <USelectMenu
              v-model="localSortOptions.field"
              :options="sortFieldOptions"
              value-attribute="value"
              option-attribute="label"
              size="sm"
            />
          </UFormGroup>
          <UButton
            :icon="localSortOptions.direction === 'asc' ? 'i-material-symbols:arrow-upward' : 'i-material-symbols:arrow-downward'"
            variant="outline"
            size="sm"
            @click="toggleSortDirection"
          >
            {{ localSortOptions.direction === 'asc' ? 'Ascending' : 'Descending' }}
          </UButton>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Candidate
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Position
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Interview Stage
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Applied Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Experience
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr 
            v-for="candidate in candidates" 
            :key="candidate.id" 
            class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            @click="viewProfile(candidate)"
          >
            <!-- Candidate Info -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <UAvatar
                  :alt="`${candidate.firstName} ${candidate.lastName}`"
                  size="sm"
                  class="mr-3"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ candidate.firstName }} {{ candidate.lastName }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ candidate.email }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Position -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">
                {{ candidate.position }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ candidate.department }}
              </div>
            </td>

            <!-- Interview Stage -->
            <td class="px-6 py-4 whitespace-nowrap">
              <UBadge
                :color="getStageColor(candidate.interviewStage)"
                :label="getStageLabel(candidate.interviewStage)"
                size="sm"
                variant="subtle"
              />
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <UBadge
                :color="getStatusColor(candidate.status)"
                :label="getStatusLabel(candidate.status)"
                size="sm"
              />
            </td>

            <!-- Applied Date -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ formatDate(candidate.applicationDate) }}
            </td>

            <!-- Experience -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ candidate.experience }} year{{ candidate.experience !== 1 ? 's' : '' }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center space-x-2">
                <UButton
                  icon="i-material-symbols:visibility"
                  size="sm"
                  variant="ghost"
                  @click.stop="viewProfile(candidate)"
                />
                <UButton
                  v-if="candidate.resumeUrl"
                  icon="i-material-symbols:description"
                  size="sm"
                  variant="ghost"
                  @click.stop="viewResume(candidate)"
                />
                <UDropdown
                  :items="getActionItems(candidate)"
                  :popper="{ placement: 'left-start' }"
                >
                  <UButton
                    icon="i-material-symbols:more-vert"
                    size="sm"
                    variant="ghost"
                    @click.stop
                  />
                </UDropdown>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div 
      v-if="candidates.length === 0"
      class="text-center py-12"
    >
      <UIcon name="i-material-symbols:person-search" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No candidates found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Try adjusting your search query or filters.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Candidate, CandidateSortOptions, InterviewStage, CandidateStatus } from '~/types';

interface Props {
  candidates: Candidate[];
  sortOptions: CandidateSortOptions;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:sortOptions': [options: CandidateSortOptions];
  'view-profile': [candidate: Candidate];
  'view-resume': [candidate: Candidate];
  'schedule-interview': [candidate: Candidate];
  'move-to-next-stage': [candidate: Candidate];
  'reject-candidate': [candidate: Candidate];
}>();

// Local sort options
const localSortOptions = ref<CandidateSortOptions>({ ...props.sortOptions });

// Watch for external changes
watch(() => props.sortOptions, (newOptions) => {
  localSortOptions.value = { ...newOptions };
}, { deep: true });

// Watch for local changes and emit
watch(localSortOptions, (newOptions) => {
  emit('update:sortOptions', { ...newOptions });
}, { deep: true });

// Sort field options
const sortFieldOptions = [
  { label: 'Application Date', value: 'applicationDate' },
  { label: 'Name', value: 'firstName' },
  { label: 'Position', value: 'position' },
  { label: 'Interview Stage', value: 'interviewStage' }
];

// Methods
const toggleSortDirection = () => {
  localSortOptions.value.direction = localSortOptions.value.direction === 'asc' ? 'desc' : 'asc';
};

const viewProfile = (candidate: Candidate) => {
  emit('view-profile', candidate);
};

const viewResume = (candidate: Candidate) => {
  emit('view-resume', candidate);
};

const getActionItems = (candidate: Candidate) => {
  const items = [];
  
  if (candidate.status === 'active' || candidate.status === 'scheduled') {
    items.push({
      label: 'Schedule Interview',
      icon: 'i-material-symbols:calendar-add-on',
      click: () => emit('schedule-interview', candidate)
    });
  }
  
  if (candidate.interviewStage !== 'hired' && candidate.interviewStage !== 'rejected') {
    items.push({
      label: 'Move to Next Stage',
      icon: 'i-material-symbols:arrow-forward',
      click: () => emit('move-to-next-stage', candidate)
    });
  }
  
  if (candidate.status !== 'rejected' && candidate.status !== 'hired') {
    items.push({
      label: 'Reject Candidate',
      icon: 'i-material-symbols:person-remove',
      click: () => emit('reject-candidate', candidate)
    });
  }
  
  return [items];
};

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short',
    day: 'numeric'
  });
};

const getStageColor = (stage: InterviewStage): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  const colors: Record<InterviewStage, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
    'applied': 'neutral',
    'screening': 'info',
    'technical': 'warning',
    'final': 'secondary',
    'offer': 'primary',
    'hired': 'success',
    'rejected': 'error'
  };
  return colors[stage];
};

const getStageLabel = (stage: InterviewStage): string => {
  const labels: Record<InterviewStage, string> = {
    'applied': 'Applied',
    'screening': 'Screening',
    'technical': 'Technical',
    'final': 'Final',
    'offer': 'Offer',
    'hired': 'Hired',
    'rejected': 'Rejected'
  };
  return labels[stage];
};

const getStatusColor = (status: CandidateStatus): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  const colors: Record<CandidateStatus, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
    'active': 'info',
    'scheduled': 'warning',
    'completed': 'success',
    'rejected': 'error',
    'withdrawn': 'neutral',
    'hired': 'success'
  };
  return colors[status];
};

const getStatusLabel = (status: CandidateStatus): string => {
  const labels: Record<CandidateStatus, string> = {
    'active': 'Active',
    'scheduled': 'Scheduled',
    'completed': 'Completed',
    'rejected': 'Rejected',
    'withdrawn': 'Withdrawn',
    'hired': 'Hired'
  };
  return labels[status];
};
</script>