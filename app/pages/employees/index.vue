<template>
  <div class="space-y-6">
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

    <EmployeeFilters
      :view-mode="viewMode"
      :search-query="searchQuery"
      :department="departmentFilter"
      :status="statusFilter"
      @search="handleSearch"
      @filter-change="handleFilterChange"
      @view-change="handleViewChange"
      @add-employee="navigateTo('/employees/onboarding')"
    />

    <div v-if="allFilteredEmployees.length > 0">
      <EmployeeCardView
        v-if="viewMode === 'card'"
        :employees="filteredEmployees"
        @view-profile="(emp) => navigateTo(`/employees/${emp.id}`)"
        @edit-employee="(emp) => navigateTo(`/employees/edit/${emp.id}`)"
        @archive-employee="handleArchiveEmployee"
      />

      <EmployeeTableView
        v-else
        :employees="filteredEmployees"
        @view-profile="(emp: Employee) => navigateTo(`/employees/${emp.id}`)"
        @edit-employee="(emp: Employee) => navigateTo(`/employees/edit/${emp.id}`)"
        @archive-employee="handleArchiveEmployee"
      />

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
        />
      </div>
    </div>

    <EmptyState
      v-else
      icon="i-material-symbols:person-off"
      :title="hasFilters ? 'No employees found' : 'No employees yet'"
      :description="hasFilters ? 'Try adjusting your search query or filters.' : 'Get started by adding your first employee.'"
    >
      <template #actions>
        <UButton
          v-if="hasFilters"
          color="neutral"
          variant="outline"
          @click="clearFilters"
        >
          Clear Filters
        </UButton>
        <UButton 
          color="primary"
          icon="i-material-symbols:person-add"
          @click="navigateTo('/employees/onboarding')"
        >
          Add Employee
        </UButton>
      </template>
    </EmptyState>

    <EmployeeOffboardingModal 
      v-if="selectedEmployeeForArchive"
      v-model:open="showOffboardingModal"
      :employee="selectedEmployeeForArchive"
      @archived="handleEmployeeArchived"
    />
  </div>
</template>

<script setup lang="ts">
import { useEmployees } from '~/composables/useEmployees'
import EmployeeCardView from "~/components/employees/EmployeeCardView.vue"
import type { Employee } from '~/types'

definePageMeta({
  title: 'Employees'
})

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
  clearFilters,
} = useEmployees()

const showOffboardingModal = ref(false)
const selectedEmployeeForArchive = ref<Employee | null>(null)

const handleArchiveEmployee = (employee: Employee): void => {
  selectedEmployeeForArchive.value = employee
  showOffboardingModal.value = true
}

const handleEmployeeArchived = (): void => {
  showOffboardingModal.value = false
  selectedEmployeeForArchive.value = null
}
</script>
