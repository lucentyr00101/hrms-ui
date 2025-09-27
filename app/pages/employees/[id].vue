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
            <!-- Info Tab -->
            <div v-if="item.key === 'info'" class="py-4">
              <EmployeeInfoTab 
                :employee="employee"
                :is-edit-mode="isEditMode"
                :form-state="formState"
                @update:form-state="updateFormState"
              />
            </div>

            <!-- Documents Tab -->
            <div v-else-if="item.key === 'documents'" class="py-4">
              <EmployeeDocumentsTab 
                :employee-id="employee.id"
                :documents="employeeDocuments"
              />
            </div>

            <!-- Activity Tab -->
            <div v-else-if="item.key === 'activity'" class="py-4">
              <EmployeeActivityTab 
                :employee-id="employee.id"
                :activities="employeeActivities"
              />
            </div>
          </template>
        </UTabs>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Employee, EmployeeDocument, ActivityItem } from '~/constants/EMPLOYEE_DATA';
import { DUMMY_EMPLOYEES, DUMMY_EMPLOYEE_DOCUMENTS, DUMMY_EMPLOYEE_ACTIVITIES } from '~/constants/EMPLOYEE_DATA';
import { employeeInfoSchema, type EmployeeInfoSchema } from '~/schemas/employee';

// Get employee ID from route
const route = useRoute();
const employeeId = route.params.id as string;

// Reactive state
const pending = ref(false);
const error = ref(false);
const employee = ref<Employee | null>(null);
const employeeDocuments = ref<EmployeeDocument[]>([]);
const employeeActivities = ref<ActivityItem[]>([]);
const isEditMode = ref(false);
const saving = ref(false);
const formState = ref<EmployeeInfoSchema | null>(null);

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
    employeeDocuments.value = DUMMY_EMPLOYEE_DOCUMENTS[employeeId] || [];
    employeeActivities.value = DUMMY_EMPLOYEE_ACTIVITIES[employeeId] || [];
    
    // Initialize form state
    initializeFormState();
  } catch (err) {
    error.value = true;
  } finally {
    pending.value = false;
  }
};

// Initialize form state for editing
const initializeFormState = () => {
  if (employee.value) {
    formState.value = {
      firstName: employee.value.firstName,
      lastName: employee.value.lastName,
      email: employee.value.email,
      phone: employee.value.phone,
      position: employee.value.position,
      department: employee.value.department,
      manager: employee.value.manager || '',
      employeeId: employee.value.employeeId,
      dateOfBirth: employee.value.dateOfBirth || '',
      street: employee.value.address?.street || '',
      city: employee.value.address?.city || '',
      state: employee.value.address?.state || '',
      zipCode: employee.value.address?.zipCode || '',
      country: employee.value.address?.country || '',
      salary: employee.value.salary || 0,
      employmentType: employee.value.employmentType || 'fullTime',
      workLocation: employee.value.workLocation || 'office',
    };
  }
};

// Toggle edit mode
const toggleEditMode = () => {
  isEditMode.value = true;
  initializeFormState();
};

// Cancel edit
const cancelEdit = () => {
  isEditMode.value = false;
  initializeFormState();
};

// Handle save
const handleSave = async () => {
  if (!formState.value || !employee.value) return;
  
  saving.value = true;
  try {
    // Validate form
    await employeeInfoSchema.validate(formState.value);
    
    // Simulate API save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update employee data
    employee.value = {
      ...employee.value,
      firstName: formState.value.firstName,
      lastName: formState.value.lastName,
      email: formState.value.email,
      phone: formState.value.phone,
      position: formState.value.position,
      department: formState.value.department,
      manager: formState.value.manager,
      employeeId: formState.value.employeeId,
      dateOfBirth: formState.value.dateOfBirth,
      address: {
        street: formState.value.street,
        city: formState.value.city,
        state: formState.value.state,
        zipCode: formState.value.zipCode,
        country: formState.value.country
      },
      salary: formState.value.salary,
      employmentType: formState.value.employmentType,
      workLocation: formState.value.workLocation
    };
    
    isEditMode.value = false;
    
    // Show success notification
    console.log('Employee profile updated successfully');
  } catch (err) {
    console.error('Failed to update employee:', err);
  } finally {
    saving.value = false;
  }
};

// Update form state
const updateFormState = (newState: Partial<EmployeeInfoSchema>) => {
  if (formState.value) {
    formState.value = { ...formState.value, ...newState };
  }
};

// Utility functions
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'green';
    case 'inactive': return 'red';
    case 'on-leave': return 'yellow';
    default: return 'gray';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'on-leave': return 'On Leave';
    default: return status;
  }
};

// Load data on mount
onMounted(() => {
  loadEmployeeData();
});
</script>