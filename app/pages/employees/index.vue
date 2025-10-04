<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Employees
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your organization's employees and their information.
        </p>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ allFilteredEmployees.length }} {{ allFilteredEmployees.length === 1 ? 'employee' : 'employees' }} found
        {{ totalPages > 1 ? `(Page ${currentPage} of ${totalPages})` : '' }}
      </div>
    </div>

    <!-- Filters and Search -->
    <EmployeeFilters
          :view-mode="viewMode"
          :search-query="searchQuery"
          :department="departmentFilter"
          :status="statusFilter"
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

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
          {{ Math.min(currentPage * itemsPerPage, allFilteredEmployees.length) }} 
          of {{ allFilteredEmployees.length }} employees
        </div>
        
        <UPagination
          v-model="currentPage"
          :page-count="totalPages"
          :total="allFilteredEmployees.length"
          class="flex items-center gap-1"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-else
      class="text-center py-12"
    >
      <UIcon name="i-material-symbols:person-off" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ hasFilters ? 'No employees found' : 'No employees yet' }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ searchQuery || hasFilters 
          ? 'Try adjusting your search query or filters.' 
          : 'Get started by adding your first employee.' 
        }}
      </p>
      <div class="flex justify-center gap-3">
        <UButton
          v-if="searchQuery || hasFilters"
          color="neutral"
          variant="outline"
          @click="resetFilters"
        >
          Clear Filters
        </UButton>
        <UButton 
          color="primary"
          @click="handleAddEmployee"
        >
          <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
          Add Employee
        </UButton>
      </div>
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
import EmployeeFilters from '~/components/employees/EmployeeFilters.vue';
import EmployeeCardView from '~/components/employees/EmployeeCardView.vue';
import EmployeeTableView from '~/components/employees/EmployeeTableView.vue';
import EmployeeOffboardingModal from '~/components/employees/EmployeeOffboardingModal.vue';
import { useEmployees } from '~/composables/useEmployees';
import type { Employee } from '~/types';

const {
  viewMode,
  searchQuery,
  departmentFilter,
  statusFilter,
  allFilteredEmployees,
  filteredEmployees,
  totalPages,
  hasFilters,
  currentPage,
  itemsPerPage,
  handleSearch,
  handleFilterChange,
  handleViewChange,
  clearFilters: resetFilters,
} = useEmployees();

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
