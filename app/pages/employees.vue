<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Employees
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your organization's employees and their information.
        </p>
      </div>
      <UButton color="primary">
        <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
        Add Employee
      </UButton>
    </div>

    <!-- Search and Filters -->
    <UCard>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div class="flex-1 max-w-md">
          <UInput 
            v-model="searchQuery"
            placeholder="Search employees..."
            @input="filterEmployees"
          >
            <template #leading>
              <UIcon name="i-material-symbols:search" class="w-4 h-4 text-gray-400" />
            </template>
          </UInput>
        </div>
        <div class="flex items-center space-x-2">
          <USelectMenu
            v-model="selectedDepartment"
            :options="departmentOptions"
            placeholder="All Departments"
            @change="filterEmployees"
          />
          <USelectMenu
            v-model="selectedStatus"
            :options="statusOptions"
            placeholder="All Status"
            @change="filterEmployees"
          />
        </div>
      </div>
    </UCard>

    <!-- Employees List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="employee in filteredEmployees"
        :key="employee.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
        @click="navigateToProfile(employee.id)"
      >
        <div class="p-6">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-lg font-bold text-white">
                {{ employee.firstName[0] }}{{ employee.lastName[0] }}
              </span>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ employee.firstName }} {{ employee.lastName }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ employee.position }}
              </p>
            </div>
            <UBadge 
              :color="getStatusColor(employee.status)"
              :label="formatStatus(employee.status)"
              size="sm"
            />
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-material-symbols:business" class="w-4 h-4 mr-2" />
              {{ employee.department }}
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-material-symbols:email" class="w-4 h-4 mr-2" />
              {{ employee.email }}
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-material-symbols:phone" class="w-4 h-4 mr-2" />
              {{ employee.phone }}
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <UIcon name="i-material-symbols:calendar-today" class="w-4 h-4 mr-2" />
              Joined {{ formatDate(employee.hireDate) }}
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">Employee ID</span>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ employee.employeeId }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredEmployees.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="text-center py-12">
        <UIcon name="i-material-symbols:emoji-people" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No employees found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ searchQuery || selectedDepartment || selectedStatus ? 'Try adjusting your filters.' : 'Get started by adding your first employee.' }}
        </p>
        <UButton v-if="!searchQuery && !selectedDepartment && !selectedStatus" color="primary">
          <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
          Add Employee
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DUMMY_EMPLOYEES, type Employee } from '~/constants/EMPLOYEE_DATA';

// Reactive state
const searchQuery = ref('');
const selectedDepartment = ref('');
const selectedStatus = ref('');
const filteredEmployees = ref<Employee[]>([...DUMMY_EMPLOYEES]);

// Filter options
const departmentOptions = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Design',
  'Product'
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'On Leave', value: 'onLeave' }
];

// Filter employees
const filterEmployees = () => {
  let filtered = [...DUMMY_EMPLOYEES];
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(employee =>
      employee.firstName.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.employeeId.toLowerCase().includes(query)
    );
  }
  
  // Department filter
  if (selectedDepartment.value) {
    filtered = filtered.filter(employee => 
      employee.department === selectedDepartment.value
    );
  }
  
  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(employee => 
      employee.status === selectedStatus.value
    );
  }
  
  filteredEmployees.value = filtered;
};

// Navigation
const navigateToProfile = (employeeId: string) => {
  navigateTo(`/employees/${employeeId}`);
};

// Utility functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'green';
    case 'inactive': return 'red';
    case 'onLeave': return 'yellow';
    default: return 'gray';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'onLeave': return 'On Leave';
    default: return status;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Initialize
onMounted(() => {
  filterEmployees();
});
</script>
