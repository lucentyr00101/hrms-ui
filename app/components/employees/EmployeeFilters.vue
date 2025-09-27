<template>
  <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
    <!-- Search bar -->
    <div class="flex-1 min-w-0 max-w-md">
      <UInput
        v-model="searchQuery"
        size="lg"
        placeholder="Search employees..."
        :trailing-icon="searchQuery ? undefined : 'i-material-symbols:search'"
        @input="handleSearchInput"
        @keyup.enter="handleSearchSubmit"
      >
        <template v-if="searchQuery" #trailing>
          <UButton
            color="gray"
            variant="ghost"
            size="xs"
            icon="i-material-symbols:close"
            @click="clearSearch"
          />
        </template>
      </UInput>
    </div>

    <!-- Filters and actions -->
    <div class="flex gap-3 items-center flex-wrap">
      <!-- Department filter -->
      <USelectMenu
        v-model="selectedDepartment"
        :options="departmentOptions"
        placeholder="Department"
        size="lg"
        class="min-w-40"
        @change="$emit('filter-change', { department: selectedDepartment, status: selectedStatus })"
      />

      <!-- Status filter -->
      <USelectMenu
        v-model="selectedStatus"
        :options="statusOptions"
        placeholder="Status"
        size="lg"
        class="min-w-32"
        @change="$emit('filter-change', { department: selectedDepartment, status: selectedStatus })"
      />

      <!-- View toggle -->
      <div class="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <UButton
          :variant="viewMode === 'card' ? 'solid' : 'ghost'"
          color="primary"
          size="sm"
          icon="i-material-symbols:grid-view"
          @click="$emit('view-change', 'card')"
          class="rounded-md"
        />
        <UButton
          :variant="viewMode === 'table' ? 'solid' : 'ghost'"
          color="primary"
          size="sm"
          icon="i-material-symbols:table-rows"
          @click="$emit('view-change', 'table')"
          class="rounded-md"
        />
      </div>

      <!-- Add Employee button -->
      <UButton
        color="primary"
        size="lg"
        icon="i-material-symbols:person-add"
        @click="$emit('add-employee')"
      >
        Add Employee
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEPARTMENTS, EMPLOYEE_STATUSES } from '~/constants/EMPLOYEE_DATA';

interface Props {
  viewMode: 'card' | 'table';
}

defineProps<Props>();

const emit = defineEmits<{
  'search': [query: string];
  'filter-change': [filters: { department?: string; status?: string }];
  'view-change': [mode: 'card' | 'table'];
  'add-employee': [];
}>();

const searchQuery = ref('');
const selectedDepartment = ref<string | undefined>(undefined);
const selectedStatus = ref<string | undefined>(undefined);

const departmentOptions = computed(() => [
  { label: 'All Departments', value: undefined },
  ...DEPARTMENTS.map(dept => ({ label: dept, value: dept }))
]);

const statusOptions = computed(() => [
  { label: 'All Statuses', value: undefined },
  ...EMPLOYEE_STATUSES.map(status => ({ 
    label: status === 'on-leave' ? 'On Leave' : status.charAt(0).toUpperCase() + status.slice(1), 
    value: status 
  }))
]);

const clearSearch = () => {
  searchQuery.value = '';
  emit('search', '');
};

// Better search handling with debounce
let searchTimeout: NodeJS.Timeout | null = null;

const handleSearchInput = () => {
  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  // Debounce search by 300ms for better performance
  searchTimeout = setTimeout(() => {
    emit('search', searchQuery.value);
  }, 300);
};

const handleSearchSubmit = () => {
  // Immediate search on Enter key
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  emit('search', searchQuery.value);
};
</script>