<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        Filters
      </h3>
      <UButton
        v-if="hasActiveFilters"
        variant="ghost"
        size="sm"
        @click="clearAllFilters"
      >
        Clear All
      </UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Position Filter -->
      <UFormGroup label="Position">
        <USelectMenu
          v-model="localFilters.position"
          :options="positionOptions"
          placeholder="All Positions"
          value-attribute="value"
          option-attribute="label"
        />
      </UFormGroup>

      <!-- Department Filter -->
      <UFormGroup label="Department">
        <USelectMenu
          v-model="localFilters.department"
          :options="departmentOptions"
          placeholder="All Departments"
          value-attribute="value"
          option-attribute="label"
        />
      </UFormGroup>

      <!-- Interview Stage Filter -->
      <UFormGroup label="Interview Stage">
        <USelectMenu
          v-model="localFilters.stage"
          :options="stageOptions"
          placeholder="All Stages"
          value-attribute="value"
          option-attribute="label"
        />
      </UFormGroup>

      <!-- Status Filter -->
      <UFormGroup label="Status">
        <USelectMenu
          v-model="localFilters.status"
          :options="statusOptions"
          placeholder="All Statuses"
          value-attribute="value"
          option-attribute="label"
        />
      </UFormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CandidateFilters, InterviewStage, CandidateStatus } from '~/types';

interface Props {
  filters: CandidateFilters;
  uniquePositions: string[];
  uniqueDepartments: string[];
  uniqueStages: InterviewStage[];
  uniqueStatuses: CandidateStatus[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filters': [filters: CandidateFilters];
  'clear': [];
}>();

// Local reactive copy of filters
const localFilters = ref<CandidateFilters>({ ...props.filters });

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters };
}, { deep: true });

// Watch for local changes and emit
watch(localFilters, (newFilters) => {
  emit('update:filters', { ...newFilters });
}, { deep: true });

// Computed options for select menus
const positionOptions = computed(() => [
  { label: 'All Positions', value: undefined },
  ...props.uniquePositions.map(position => ({
    label: position,
    value: position
  }))
]);

const departmentOptions = computed(() => [
  { label: 'All Departments', value: undefined },
  ...props.uniqueDepartments.map(department => ({
    label: department,
    value: department
  }))
]);

const stageOptions = computed(() => [
  { label: 'All Stages', value: undefined },
  ...props.uniqueStages.map(stage => ({
    label: getStageLabel(stage),
    value: stage
  }))
]);

const statusOptions = computed(() => [
  { label: 'All Statuses', value: undefined },
  ...props.uniqueStatuses.map(status => ({
    label: getStatusLabel(status),
    value: status
  }))
]);

const hasActiveFilters = computed(() => 
  localFilters.value.position || 
  localFilters.value.department || 
  localFilters.value.stage || 
  localFilters.value.status
);

const clearAllFilters = () => {
  localFilters.value = {};
  emit('clear');
};

// Helper functions for labels
const getStageLabel = (stage: InterviewStage): string => {
  const labels: Record<InterviewStage, string> = {
    'applied': 'Applied',
    'screening': 'Screening',
    'technical': 'Technical',
    'final': 'Final Interview',
    'offer': 'Offer Extended',
    'hired': 'Hired',
    'rejected': 'Rejected'
  };
  return labels[stage];
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