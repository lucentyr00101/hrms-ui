<template>
  <div class="space-y-6">
    <!-- Personal Information Section -->
    <UCard>
      <template #header>
        <div class="flex items-center space-x-2">
          <UIcon name="i-material-symbols:person" class="w-5 h-5 text-primary" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
        </div>
      </template>

      <UForm v-if="isEditMode && formState" :schema="employeeInfoSchema" :state="formState" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="First Name" name="firstName">
            <UInput 
              v-model="formState.firstName" 
              @input="handleFormUpdate('firstName', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Last Name" name="lastName">
            <UInput 
              v-model="formState.lastName"
              @input="handleFormUpdate('lastName', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput 
              v-model="formState.email"
              type="email"
              @input="handleFormUpdate('email', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Phone" name="phone">
            <UInput 
              v-model="formState.phone"
              @input="handleFormUpdate('phone', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Date of Birth" name="dateOfBirth">
            <UInput 
              v-model="formState.dateOfBirth"
              type="date"
              @input="handleFormUpdate('dateOfBirth', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Employee ID" name="employeeId">
            <UInput 
              v-model="formState.employeeId"
              @input="handleFormUpdate('employeeId', $event.target.value)"
            />
          </UFormField>
        </div>
      </UForm>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">First Name</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.firstName }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Last Name</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.lastName }}</p>
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
          <p class="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(employee.dateOfBirth) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Employee ID</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.employeeId }}</p>
        </div>
      </div>
    </UCard>

    <!-- Address Information Section -->
    <UCard>
      <template #header>
        <div class="flex items-center space-x-2">
          <UIcon name="i-material-symbols:location-on" class="w-5 h-5 text-primary" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Address Information</h3>
        </div>
      </template>

      <UForm v-if="isEditMode && formState" :schema="employeeInfoSchema" :state="formState" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="Street Address" name="street" class="md:col-span-2">
            <UInput 
              v-model="formState.street"
              @input="handleFormUpdate('street', $event.target.value)"
            />
          </UFormField>
          <UFormField label="City" name="city">
            <UInput 
              v-model="formState.city"
              @input="handleFormUpdate('city', $event.target.value)"
            />
          </UFormField>
          <UFormField label="State" name="state">
            <UInput 
              v-model="formState.state"
              @input="handleFormUpdate('state', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Zip Code" name="zipCode">
            <UInput 
              v-model="formState.zipCode"
              @input="handleFormUpdate('zipCode', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Country" name="country">
            <UInput 
              v-model="formState.country"
              @input="handleFormUpdate('country', $event.target.value)"
            />
          </UFormField>
        </div>
      </UForm>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">Street Address</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address.street }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">City</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address.city }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">State</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address.state }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Zip Code</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address.zipCode }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Country</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address.country }}</p>
        </div>
      </div>
    </UCard>

    <!-- Job Information Section -->
    <UCard>
      <template #header>
        <div class="flex items-center space-x-2">
          <UIcon name="i-material-symbols:work" class="w-5 h-5 text-primary" />
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Job Information</h3>
        </div>
      </template>

      <UForm v-if="isEditMode && formState" :schema="employeeInfoSchema" :state="formState" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="Position" name="position">
            <UInput 
              v-model="formState.position"
              @input="handleFormUpdate('position', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Department" name="department">
            <USelectMenu
              v-model="formState.department"
              :options="departmentOptions"
              @change="handleFormUpdate('department', $event)"
            />
          </UFormField>
          <UFormField label="Manager" name="manager">
            <UInput 
              v-model="formState.manager"
              @input="handleFormUpdate('manager', $event.target.value)"
            />
          </UFormField>
          <UFormField label="Employment Type" name="employmentType">
            <USelectMenu
              v-model="formState.employmentType"
              :options="employmentTypeOptions"
              @change="handleFormUpdate('employmentType', $event)"
            />
          </UFormField>
          <UFormField label="Work Location" name="workLocation">
            <USelectMenu
              v-model="formState.workLocation"
              :options="workLocationOptions"
              @change="handleFormUpdate('workLocation', $event)"
            />
          </UFormField>
          <UFormField label="Salary" name="salary">
            <UInput 
              v-model="formState.salary"
              type="number"
              @input="handleFormUpdate('salary', Number($event.target.value))"
            />
          </UFormField>
        </div>
      </UForm>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Position</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.position }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Department</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.department }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manager</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.manager }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Employment Type</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatEmploymentType(employee.employmentType) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Work Location</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatWorkLocation(employee.workLocation) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Salary</p>
          <p class="font-medium text-gray-900 dark:text-white">${{ employee.salary.toLocaleString() }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Hire Date</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(employee.hireDate) }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(employee.startDate) }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/constants/EMPLOYEE_DATA';
import type { EmployeeInfoSchema } from '~/schemas/employee';
import { employeeInfoSchema } from '~/schemas/employee';

interface Props {
  employee: Employee;
  isEditMode: boolean;
  formState: EmployeeInfoSchema | null;
}

interface Emits {
  (e: 'update:form-state', value: Partial<EmployeeInfoSchema>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Select options
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

const employmentTypeOptions = [
  { label: 'Full Time', value: 'fullTime' },
  { label: 'Part Time', value: 'partTime' },
  { label: 'Contractor', value: 'contractor' }
];

const workLocationOptions = [
  { label: 'Office', value: 'office' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' }
];

// Handle form updates
const handleFormUpdate = (field: keyof EmployeeInfoSchema, value: any) => {
  emit('update:form-state', { [field]: value });
};

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatEmploymentType = (type: string) => {
  const types: Record<string, string> = {
    fullTime: 'Full Time',
    partTime: 'Part Time',
    contractor: 'Contractor'
  };
  return types[type] || type;
};

const formatWorkLocation = (location: string) => {
  const locations: Record<string, string> = {
    office: 'Office',
    remote: 'Remote',
    hybrid: 'Hybrid'
  };
  return locations[location] || location;
};
</script>