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
import { useEmployees } from '~/composables/useEmployees';

// Use the employees composable
const {
  viewMode,
  allFilteredEmployees,
  filteredEmployees,
  totalPages,
  hasFilters,
  currentPage,
  itemsPerPage,
  handleSearch,
  handleFilterChange,
  handleViewChange,
  handlePageChange,
  clearFilters,
} = useEmployees();

// Debug: Log the employees data
console.log('🐛 DEBUG: allFilteredEmployees.value.length:', allFilteredEmployees.value.length);
console.log('🐛 DEBUG: filteredEmployees.value:', filteredEmployees.value);
console.log('🐛 DEBUG: viewMode.value:', viewMode.value);

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
