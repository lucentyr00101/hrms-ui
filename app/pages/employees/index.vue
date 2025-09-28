<template>
  <div>
    <div class="space-y-6">
      <EmployeesPageHeader
        :employee-count="allFilteredEmployees.length"
        :current-page="currentPage"
        :total-pages="totalPages"
      />

      <EmployeeFilters
        :view-mode="viewMode"
        @search="handleSearch"
        @filter-change="handleFilterChange"
        @view-change="handleViewChange"
        @add-employee="handleAddEmployee"
      />

      <!-- Employee Directory Content -->
      <div v-if="allFilteredEmployees.length > 0">
        <!-- Card View -->
        <EmployeeCardView
          v-if="viewMode === 'card'"
          :employees="filteredEmployees"
          @view-profile="handleViewProfile"
          @edit-employee="handleEditEmployee"
          @archive-employee="handleArchiveEmployee"
        />

        <!-- Table View -->
        <EmployeeTableView
          v-else
          :employees="filteredEmployees"
          @view-profile="handleViewProfile"
          @edit-employee="handleEditEmployee"
          @archive-employee="handleArchiveEmployee"
        />

        <EmployeesPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :items-per-page="itemsPerPage"
          :total-items="allFilteredEmployees.length"
          @page-change="handlePageChange"
        />
      </div>

      <!-- Empty State -->
      <EmployeesEmptyState
        v-else
        :has-filters-applied="hasFilters"
        @clear-filters="clearFilters"
        @add-employee="handleAddEmployee"
      />
    </div>

    <!-- Offboarding Modal -->
    <EmployeeOffboardingModal 
      v-if="selectedEmployeeForArchive"
      v-model="showOffboardingModal"
      :employee="selectedEmployeeForArchive"
      @archived="handleEmployeeArchived"
    />
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';
import { DUMMY_EMPLOYEES } from '~/constants/EMPLOYEE_DATA';

// Simplified approach - directly use dummy data first
const employees = ref<Employee[]>(DUMMY_EMPLOYEES);
const viewMode = ref<'card' | 'table'>('card');
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Simple computed properties
const allFilteredEmployees = computed(() => employees.value);
const filteredEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allFilteredEmployees.value.slice(start, end);
});
const totalPages = computed(() => Math.ceil(allFilteredEmployees.value.length / itemsPerPage.value));
const hasFilters = ref(false);

// Simple handlers
const handleSearch = (query: string) => {
  console.log('Search:', query);
};
const handleFilterChange = (filters: any) => {
  console.log('Filter change:', filters);
};
const handleViewChange = (mode: 'card' | 'table') => {
  viewMode.value = mode;
};
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
const clearFilters = () => {
  console.log('Clear filters');
};

// Debug logs
console.log('🐛 DIRECT DEBUG: employees.value.length:', employees.value.length);
console.log('🐛 DIRECT DEBUG: first employee:', employees.value[0]);
console.log('🐛 DIRECT DEBUG: allFilteredEmployees.value.length:', allFilteredEmployees.value.length);
console.log('🐛 DIRECT DEBUG: filteredEmployees.value.length:', filteredEmployees.value.length);

// Navigation handlers
const handleAddEmployee = () => {
  navigateTo('/employees/onboarding');
};

const handleViewProfile = (employee: Employee) => {
  navigateTo(`/employees/${employee.id}`);
};

const handleEditEmployee = (employee: Employee) => {
  // TODO: Implement edit employee functionality
  console.log('Edit employee:', employee);
};

// Offboarding modal state
const showOffboardingModal = ref(false);
const selectedEmployeeForArchive = ref<Employee | null>(null);

const handleArchiveEmployee = (employee: Employee) => {
  selectedEmployeeForArchive.value = employee;
  showOffboardingModal.value = true;
};

const handleEmployeeArchived = (employee: Employee) => {
  console.log('Employee archived:', employee);
  showOffboardingModal.value = false;
  selectedEmployeeForArchive.value = null;
};
</script>
