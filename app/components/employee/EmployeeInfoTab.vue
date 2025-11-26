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
            <UInput v-model="firstName" />
          </UFormField>
          <UFormField label="Last Name" name="lastName">
            <UInput v-model="lastName" />
          </UFormField>
          <UFormField label="Email" name="email">
            <UInput
              v-model="email"
              type="email"
            />
          </UFormField>
          <UFormField label="Phone" name="phone">
            <UInput v-model="phone" />
          </UFormField>
          <UFormField label="Position" name="position">
            <UInput v-model="position" />
          </UFormField>
          <UFormField label="Department" name="department">
            <USelectMenu
              v-model="department"
              :options="departmentOptions"
              placeholder="Select department"
            />
          </UFormField>
          <UFormField label="Date of Birth" name="dateOfBirth">
            <UInput 
              v-model="dateOfBirth"
              type="date"
            />
          </UFormField>
          <UFormField label="Employee ID" name="employeeId">
            <UInput v-model="employeeId" />
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
          <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(employee.dateOfBirth ?? '') }}</p>
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
            <UInput v-model="street" />
          </UFormField>
          <UFormField label="City" name="city">
            <UInput v-model="city" />
          </UFormField>
          <UFormField label="State" name="state">
            <UInput v-model="state" />
          </UFormField>
          <UFormField label="Zip Code" name="zipCode">
            <UInput v-model="zipCode" />
          </UFormField>
          <UFormField label="Country" name="country">
            <UInput v-model="country" />
          </UFormField>
        </div>
      </UForm>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="md:col-span-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">Street Address</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address?.street }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">City</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address?.city }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">State</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address?.state }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Zip Code</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address?.zipCode }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Country</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ employee.address?.country }}</p>
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
            <UInput v-model="position" />
          </UFormField>
          <UFormField label="Department" name="department">
            <USelectMenu
              v-model="department"
              :options="departmentOptions"
            />
          </UFormField>
          <UFormField label="Manager" name="manager">
            <UInput v-model="manager" />
          </UFormField>
          <UFormField label="Employment Type" name="employmentType">
            <USelectMenu
              v-model="employmentType"
              :options="employmentTypeOptions"
            />
          </UFormField>
          <UFormField label="Work Location" name="workLocation">
            <USelectMenu
              v-model="workLocation"
              :options="workLocationOptions"
            />
          </UFormField>
          <UFormField label="Salary" name="salary">
            <UInput 
              v-model="salary"
              type="number"
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
          <p class="font-medium text-gray-900 dark:text-white">{{ formatEmploymentType(employee.employmentType ?? '') }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Work Location</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatWorkLocation(employee.workLocation ?? '') }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Salary</p>
          <p class="font-medium text-gray-900 dark:text-white">${{ (employee.salary ?? 0).toLocaleString() }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Hire Date</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(employee.hireDate ?? '') }}</p>
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
import type { Employee } from '~/types';
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

const _props = defineProps<Props>();
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
const handleFormUpdate = (field: keyof EmployeeInfoSchema, value: string | number) => {
  emit('update:form-state', { [field]: value });
};

// Create computed properties for form fields to avoid prop mutations
const firstName = computed({
  get: () => _props.formState?.firstName || '',
  set: (value) => handleFormUpdate('firstName', value)
});

const lastName = computed({
  get: () => _props.formState?.lastName || '',
  set: (value) => handleFormUpdate('lastName', value)
});

const email = computed({
  get: () => _props.formState?.email || '',
  set: (value) => handleFormUpdate('email', value)
});

const phone = computed({
  get: () => _props.formState?.phone || '',
  set: (value) => handleFormUpdate('phone', value)
});

const position = computed({
  get: () => _props.formState?.position || '',
  set: (value) => handleFormUpdate('position', value)
});

const department = computed({
  get: () => _props.formState?.department || '',
  set: (value) => handleFormUpdate('department', value)
});

const manager = computed({
  get: () => _props.formState?.manager || '',
  set: (value) => handleFormUpdate('manager', value)
});

const employeeId = computed({
  get: () => _props.formState?.employeeId || '',
  set: (value) => handleFormUpdate('employeeId', value)
});

const dateOfBirth = computed({
  get: () => _props.formState?.dateOfBirth || '',
  set: (value) => handleFormUpdate('dateOfBirth', value)
});

const street = computed({
  get: () => _props.formState?.street || '',
  set: (value) => handleFormUpdate('street', value)
});

const city = computed({
  get: () => _props.formState?.city || '',
  set: (value) => handleFormUpdate('city', value)
});

const state = computed({
  get: () => _props.formState?.state || '',
  set: (value) => handleFormUpdate('state', value)
});

const zipCode = computed({
  get: () => _props.formState?.zipCode || '',
  set: (value) => handleFormUpdate('zipCode', value)
});

const country = computed({
  get: () => _props.formState?.country || '',
  set: (value) => handleFormUpdate('country', value)
});

const salary = computed({
  get: () => _props.formState?.salary || 0,
  set: (value) => handleFormUpdate('salary', Number(value))
});

const employmentType = computed({
  get: () => _props.formState?.employmentType || 'fullTime',
  set: (value) => handleFormUpdate('employmentType', value)
});

const workLocation = computed({
  get: () => _props.formState?.workLocation || 'office',
  set: (value) => handleFormUpdate('workLocation', value)
});

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