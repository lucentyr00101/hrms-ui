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

      <!-- TEST: Inline v-for directly in page -->
      <div class="p-4 bg-orange-100 rounded">
        <h3>🧪 INLINE TEST: Direct v-for in page template ({{ filteredEmployees.length }} employees)</h3>
        <div class="mt-2">
          <div v-for="employee in filteredEmployees" :key="employee.id" class="p-2 border mb-2 bg-white rounded">
            <strong>{{ employee.firstName }} {{ employee.lastName }}</strong> - {{ employee.position }}
            <br>
            <small>ID: {{ employee.id }} | Dept: {{ employee.department }}</small>
          </div>
        </div>
        <div v-if="!filteredEmployees || filteredEmployees.length === 0" class="text-red-500">
          No employees to display inline
        </div>
      </div>

      <!-- Employee Directory Content -->
      <div v-if="allFilteredEmployees.length > 0" class="border-2 border-green-500 p-4 rounded">
        <h3>✅ This section should show when employees.length > 0</h3>
        
        <!-- Card View -->
        <div v-if="viewMode === 'card'" class="border border-blue-500 p-2 rounded mb-4">
          <h4>🃏 Card View Section ({{ filteredEmployees.length }} employees)</h4>
          
          <!-- WORKING Implementation - Only render when mounted -->
          <div v-if="isMounted" class="mb-4 p-4 border border-green-500 rounded">
            <h5>✅ WORKING Implementation (isMounted: {{ isMounted }}):</h5>
            <WorkingEmployeeCards
              :employees="filteredEmployees"
              @view-profile="handleViewProfile"
              @edit-employee="handleEditEmployee"
              @archive-employee="handleArchiveEmployee"
            />
          </div>
          <div v-else class="mb-4 p-4 border border-gray-300 rounded">
            <div class="flex items-center justify-center py-8">
              <div class="text-center">
                <div class="w-8 h-8 animate-spin border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p class="text-gray-600">Loading employees...</p>
              </div>
            </div>
          </div>
          
          <!-- MINIMAL TEST - Absolutely basic -->
          <div class="mb-4 p-4 border border-red-500 rounded">
            <h5>🔬 MINIMAL TEST (isMounted: {{ isMounted }}):</h5>
            <div v-if="isMounted">
              <MinimalEmployeeTest :employees="filteredEmployees" />
            </div>
            <div v-else class="text-gray-500">Waiting for mount...</div>
          </div>
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

// Fix the hydration mismatch by using a mounted flag
const isMounted = ref(false);
const employees = ref<Employee[]>([]);
const viewMode = ref<'card' | 'table'>('card');
const currentPage = ref(1);
const itemsPerPage = ref(6);

// Use onMounted to avoid hydration mismatch
onMounted(() => {
  console.log('🔥 MOUNTED: Setting employees data and mounted flag');
  employees.value = DUMMY_EMPLOYEES;
  isMounted.value = true; // This is the key fix!
  console.log('🔥 MOUNTED: employees.value.length =', employees.value.length);
});

// Simple computed properties - but only return data if mounted
const allFilteredEmployees = computed(() => {
  if (!isMounted.value) {
    console.log('🔥 COMPUTED allFilteredEmployees: Not mounted yet, returning empty');
    return [];
  }
  console.log('🔥 COMPUTED allFilteredEmployees running, length:', employees.value.length);
  return employees.value;
});

const filteredEmployees = computed(() => {
  if (!isMounted.value) {
    console.log('🔥 COMPUTED filteredEmployees: Not mounted yet, returning empty');
    return [];
  }
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
