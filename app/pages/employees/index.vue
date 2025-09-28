<template>
  <div>
    <div class="space-y-6">
      <div class="p-4 bg-blue-100 rounded">
        <h2>🐛 DEBUG INFO:</h2>
        <p>Total employees: {{ employees.length }}</p>
        <p>All filtered: {{ allFilteredEmployees.length }}</p>
        <p>Filtered employees: {{ filteredEmployees.length }}</p>
        <p>View mode: {{ viewMode }}</p>
        <p>Current page: {{ currentPage }}</p>
        <p>Total pages: {{ totalPages }}</p>
      </div>

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

      <!-- TEST: Simple employee list -->
      <div class="p-4 bg-yellow-100 rounded">
        <h3>🧪 TEST: Direct Employee List ({{ filteredEmployees.length }} employees)</h3>
        <div v-for="emp in filteredEmployees" :key="emp.id" class="p-2 border mb-2">
          {{ emp.firstName }} {{ emp.lastName }} - {{ emp.position }}
        </div>
      </div>

      <!-- Employee Directory Content -->
      <div v-if="allFilteredEmployees.length > 0" class="border-2 border-green-500 p-4 rounded">
        <h3>✅ This section should show when employees.length > 0</h3>
        
        <!-- Card View -->
        <div v-if="viewMode === 'card'" class="border border-blue-500 p-2 rounded mb-4">
          <h4>🃏 Card View Section ({{ filteredEmployees.length }} employees)</h4>
          <TestEmployeeCardView :employees="filteredEmployees" />
          <!-- Original component for comparison -->
          <!-- <EmployeeCardView
            :employees="filteredEmployees"
            @view-profile="handleViewProfile"
            @edit-employee="handleEditEmployee"
            @archive-employee="handleArchiveEmployee"
          /> -->
        </div>

        <!-- Table View -->
        <div v-else class="border border-purple-500 p-2 rounded mb-4">
          <h4>📊 Table View Section</h4>
          <EmployeeTableView
            :employees="filteredEmployees"
            @view-profile="handleViewProfile"
            @edit-employee="handleEditEmployee"
            @archive-employee="handleArchiveEmployee"
          />
        </div>

        <EmployeesPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :items-per-page="itemsPerPage"
          :total-items="allFilteredEmployees.length"
          @page-change="handlePageChange"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="border-2 border-red-500 p-4 rounded">
        <h3>❌ Empty State (showing because allFilteredEmployees.length = {{ allFilteredEmployees.length }})</h3>
        <EmployeesEmptyState
          :has-filters-applied="hasFilters"
          @clear-filters="clearFilters"
          @add-employee="handleAddEmployee"
        />
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
import type { Employee } from '~/types';
import { DUMMY_EMPLOYEES } from '~/constants/EMPLOYEE_DATA';

console.log('🔥 SCRIPT SETUP RUNNING');
console.log('🔥 DUMMY_EMPLOYEES imported:', DUMMY_EMPLOYEES.length);

// Initialize with nextTick to ensure reactivity
const employees = ref<Employee[]>([]);
const viewMode = ref<'card' | 'table'>('card');
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Force reactive assignment
nextTick(() => {
  console.log('🔥 NEXTTICK: Setting employees data');
  employees.value = [...DUMMY_EMPLOYEES];
  console.log('🔥 NEXTTICK: employees.value.length =', employees.value.length);
});

// Immediate assignment as well
employees.value = DUMMY_EMPLOYEES;
console.log('🔥 IMMEDIATE: employees.value.length =', employees.value.length);

// Simple computed properties
const allFilteredEmployees = computed(() => {
  console.log('🔥 COMPUTED allFilteredEmployees running, length:', employees.value.length);
  return employees.value;
});

const filteredEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  const result = allFilteredEmployees.value.slice(start, end);
  console.log('🔥 COMPUTED filteredEmployees running, result length:', result.length);
  return result;
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
