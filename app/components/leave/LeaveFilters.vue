<template>
  <UCard>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <UButton
          v-if="hasActiveFilters"
          size="xs"
          color="gray"
          variant="ghost"
          @click="clearAllFilters"
        >
          Clear All
        </UButton>
      </div>

      <!-- Leave Type Filter -->
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Leave Type
        </label>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="type in leaveTypes"
            :key="type.id"
            size="sm"
            :color="isTypeSelected(type.id) ? 'primary' : 'gray'"
            :variant="isTypeSelected(type.id) ? 'solid' : 'soft'"
            @click="toggleLeaveType(type.id)"
          >
            <UIcon :name="type.icon" class="w-4 h-4 mr-1" />
            {{ type.label }}
          </UButton>
        </div>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Status
        </label>
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="status in statuses"
            :key="status"
            size="sm"
            :color="isStatusSelected(status) ? 'primary' : 'gray'"
            :variant="isStatusSelected(status) ? 'solid' : 'soft'"
            @click="toggleStatus(status)"
          >
            {{ status }}
          </UButton>
        </div>
      </div>

      <!-- Date Range Filter -->
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Date Range
        </label>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <UInput
              v-model="startDate"
              type="date"
              size="sm"
              placeholder="Start Date"
            />
          </div>
          <div>
            <UInput
              v-model="endDate"
              type="date"
              size="sm"
              placeholder="End Date"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          <UButton
            v-for="quickDate in quickDateRanges"
            :key="quickDate.label"
            size="xs"
            color="gray"
            variant="soft"
            @click="setQuickDateRange(quickDate.value)"
          >
            {{ quickDate.label }}
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useLeaveData } from '~/composables/useLeaveData';

const { leaveTypes, filters, updateFilters, clearFilters } = useLeaveData();

const statuses = ['All', 'Approved', 'Pending', 'Rejected'];

const quickDateRanges = [
  { label: 'This Month', value: 'this-month' },
  { label: 'Next Month', value: 'next-month' },
  { label: 'This Quarter', value: 'this-quarter' },
  { label: 'This Year', value: 'this-year' }
];

const startDate = ref<string>('');
const endDate = ref<string>('');

const hasActiveFilters = computed(() => {
  return filters.value.leaveTypes.length > 0 || 
         filters.value.statuses.length > 0 ||
         filters.value.dateRange.start !== null ||
         filters.value.dateRange.end !== null;
});

const isTypeSelected = (typeId: string) => {
  return filters.value.leaveTypes.includes(
    leaveTypes.value.find(t => t.id === typeId)?.label || ''
  );
};

const isStatusSelected = (status: string) => {
  if (status === 'All') {
    return filters.value.statuses.length === 0;
  }
  return filters.value.statuses.includes(status);
};

const toggleLeaveType = (typeId: string) => {
  const typeLabel = leaveTypes.value.find(t => t.id === typeId)?.label || '';
  const currentTypes = [...filters.value.leaveTypes];
  
  if (currentTypes.includes(typeLabel)) {
    updateFilters({
      leaveTypes: currentTypes.filter(t => t !== typeLabel)
    });
  } else {
    updateFilters({
      leaveTypes: [...currentTypes, typeLabel]
    });
  }
};

const toggleStatus = (status: string) => {
  if (status === 'All') {
    updateFilters({ statuses: [] });
  } else {
    const currentStatuses = [...filters.value.statuses];
    
    if (currentStatuses.includes(status)) {
      updateFilters({
        statuses: currentStatuses.filter(s => s !== status)
      });
    } else {
      updateFilters({
        statuses: [...currentStatuses, status]
      });
    }
  }
};

const setQuickDateRange = (range: string) => {
  const now = new Date();
  let start = new Date();
  let end = new Date();

  switch (range) {
    case 'this-month':
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case 'next-month':
      start = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      end = new Date(now.getFullYear(), now.getMonth() + 2, 0);
      break;
    case 'this-quarter':
      const quarter = Math.floor(now.getMonth() / 3);
      start = new Date(now.getFullYear(), quarter * 3, 1);
      end = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
      break;
    case 'this-year':
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
      break;
  }

  startDate.value = start.toISOString().split('T')[0];
  endDate.value = end.toISOString().split('T')[0];
  
  updateFilters({
    dateRange: {
      start: startDate.value,
      end: endDate.value
    }
  });
};

const clearAllFilters = () => {
  clearFilters();
  startDate.value = '';
  endDate.value = '';
};

// Watch for manual date changes
watch([startDate, endDate], () => {
  if (startDate.value && endDate.value) {
    updateFilters({
      dateRange: {
        start: startDate.value,
        end: endDate.value
      }
    });
  } else if (!startDate.value && !endDate.value) {
    updateFilters({
      dateRange: {
        start: null,
        end: null
      }
    });
  }
});
</script>
