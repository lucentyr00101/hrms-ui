<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <UIcon name="i-material-symbols:progress-activity" class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-6">
      <UCard>
        <div class="text-center py-8">
          <UIcon name="i-material-symbols:error" class="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Employee Not Found</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">The employee you're looking for doesn't exist.</p>
          <UButton @click="navigateTo('/employees')">
            <UIcon name="i-material-symbols:arrow-back" class="w-4 h-4 mr-2" />
            Back to Employees
          </UButton>
        </div>
      </UCard>
    </div>

    <!-- Employee Profile -->
    <div v-else-if="employee" class="p-4 sm:p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <UButton 
            variant="ghost" 
            @click="navigateTo('/employees')"
            :ui="{ base: 'hover:bg-gray-100 dark:hover:bg-gray-800' }"
          >
            <UIcon name="i-material-symbols:arrow-back" class="w-5 h-5" />
          </UButton>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ employee.firstName }} {{ employee.lastName }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ employee.position }} • {{ employee.department }}
            </p>
          </div>
        </div>
        <UButton 
          v-if="!isEditMode" 
          @click="toggleEditMode"
          color="primary"
        >
          <UIcon name="i-material-symbols:edit" class="w-4 h-4 mr-2" />
          Edit Profile
        </UButton>
        <div v-else class="flex space-x-2">
          <UButton 
            @click="handleSave"
            color="primary"
            :loading="saving"
          >
            <UIcon name="i-material-symbols:save" class="w-4 h-4 mr-2" />
            Save Changes
          </UButton>
          <UButton 
            @click="cancelEdit"
            variant="ghost"
          >
            <UIcon name="i-material-symbols:close" class="w-4 h-4 mr-2" />
            Cancel
          </UButton>
        </div>
      </div>

      <!-- Profile Header Card -->
      <UCard>
        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <div class="flex-shrink-0">
            <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-white">
                {{ employee.firstName[0] }}{{ employee.lastName[0] }}
              </span>
            </div>
          </div>
          <div class="flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ employee.employeeId }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ employee.email }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ employee.phone }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <UBadge 
                  :color="getStatusColor(employee.status)"
                  :label="formatStatus(employee.status)"
                />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Tabbed Content -->
      <UTabs :items="tabs" class="w-full">
        <template #item="{ item }">
          <!-- Info Tab -->
          <div v-if="item.key === 'info'" class="space-y-6">
            <EmployeeInfoTab 
              :employee="employee"
              :is-edit-mode="isEditMode"
              :form-state="formState"
              @update:form-state="updateFormState"
            />
          </div>

          <!-- Documents Tab -->
          <div v-else-if="item.key === 'documents'" class="space-y-6">
            <EmployeeDocumentsTab 
              :employee-id="employee.id"
              :documents="employeeDocuments"
            />
          </div>

          <!-- Activity Tab -->
          <div v-else-if="item.key === 'activity'" class="space-y-6">
            <EmployeeActivityTab 
              :employee-id="employee.id"
              :activities="employeeActivities"
            />
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee, EmployeeDocument, ActivityItem } from '~/constants/EMPLOYEE_DATA';
import { DUMMY_EMPLOYEES, DUMMY_EMPLOYEE_DOCUMENTS, DUMMY_EMPLOYEE_ACTIVITIES } from '~/constants/EMPLOYEE_DATA';
import { employeeInfoSchema, type EmployeeInfoSchema } from '~/schemas/employee';
import EmployeeInfoTab from '~/components/employee/EmployeeInfoTab.vue';
import EmployeeDocumentsTab from '~/components/employee/EmployeeDocumentsTab.vue';
import EmployeeActivityTab from '~/components/employee/EmployeeActivityTab.vue';

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
    label: 'Information',
    icon: 'i-material-symbols:person'
  },
  {
    key: 'documents',
    label: 'Documents',
    icon: 'i-material-symbols:description'
  },
  {
    key: 'activity',
    label: 'Activity',
    icon: 'i-material-symbols:history'
  }
];

// Load employee data (simulating async API call)
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
      manager: employee.value.manager,
      employeeId: employee.value.employeeId,
      dateOfBirth: employee.value.dateOfBirth,
      street: employee.value.address.street,
      city: employee.value.address.city,
      state: employee.value.address.state,
      zipCode: employee.value.address.zipCode,
      country: employee.value.address.country,
      salary: employee.value.salary,
      employmentType: employee.value.employmentType,
      workLocation: employee.value.workLocation,
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
    // In a real app, you'd use a toast notification
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