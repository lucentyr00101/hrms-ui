<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-purple-600 mb-4">
      Employee Profile: {{ employeeId }}
    </h1>
    
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Employee Details</h2>
          <UButton @click="navigateTo('/employees')" variant="outline">
            ← Back to Employees
          </UButton>
        </div>
      </template>

      <div v-if="pending" class="text-center py-8">
        <div class="w-8 h-8 animate-spin border-4 border-gray-200 border-t-purple-500 rounded-full mx-auto"></div>
        <p class="mt-2">Loading employee data...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        ❌ Employee not found
      </div>

      <div v-else-if="employee" class="space-y-4">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-xl font-bold text-white">
              {{ employee.firstName[0] }}{{ employee.lastName[0] }}
            </span>
          </div>
          <div>
            <h3 class="text-2xl font-bold">{{ employee.firstName }} {{ employee.lastName }}</h3>
            <p class="text-gray-600">{{ employee.position }} • {{ employee.department }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <p class="text-sm text-gray-500">Employee ID</p>
            <p class="font-semibold">{{ employee.employeeId }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="font-semibold">{{ employee.email }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Phone</p>
            <p class="font-semibold">{{ employee.phone }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Status</p>
            <UBadge 
              :color="getStatusColor(employee.status)"
              :label="formatStatus(employee.status)"
            />
          </div>
        </div>

        <UTabs :items="tabs" class="mt-8">
          <template #item="{ item }">
            <div class="py-4">
              <h4 class="text-lg font-semibold mb-4">{{ item.label }}</h4>
              <p v-if="item.key === 'info'">
                This is where the employee information will be displayed and edited.
              </p>
              <p v-else-if="item.key === 'documents'">
                This is where employee documents will be managed.
              </p>
              <p v-else-if="item.key === 'activity'">
                This is where the activity timeline will be displayed.
              </p>
            </div>
          </template>
        </UTabs>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/constants/EMPLOYEE_DATA';
import { DUMMY_EMPLOYEES } from '~/constants/EMPLOYEE_DATA';

// Get employee ID from route
const route = useRoute();
const employeeId = route.params.id as string;

// Reactive state
const pending = ref(false);
const error = ref(false);
const employee = ref<Employee | null>(null);

// Tabs configuration
const tabs = [
  {
    key: 'info',
    label: 'Information'
  },
  {
    key: 'documents',
    label: 'Documents'
  },
  {
    key: 'activity',
    label: 'Activity'
  }
];

// Load employee data
const loadEmployeeData = async () => {
  pending.value = true;
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundEmployee = DUMMY_EMPLOYEES.find(emp => emp.id === employeeId);
    if (!foundEmployee) {
      error.value = true;
      return;
    }
    
    employee.value = foundEmployee;
  } catch (err) {
    error.value = true;
  } finally {
    pending.value = false;
  }
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

// Load data on mount
onMounted(() => {
  loadEmployeeData();
});
</script>