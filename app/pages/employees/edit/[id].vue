<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div v-if="employee">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Edit {{ employeeName }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Keep {{ employeeName }}'s information accurate to streamline HR workflows.
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Step {{ currentStep }} of {{ totalSteps }}
            </span>
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ Math.round((currentStep / totalSteps) * 100) }}% Complete
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Step Navigation -->
        <div class="flex justify-center mb-8">
          <div class="flex space-x-4">
            <div 
              v-for="(step, index) in steps" 
              :key="step.key"
              class="flex items-center"
            >
              <div 
                class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300"
                :class="getStepStatusClass(index + 1)"
              >
                <UIcon 
                  v-if="index + 1 < currentStep" 
                  name="i-material-symbols:check" 
                  class="w-4 h-4" 
                />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div 
                v-if="index < steps.length - 1" 
                class="w-12 h-0.5 mx-2"
                :class="index + 1 < currentStep ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'"
              ></div>
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <UCard class="mb-8">
          <template #header>
            <div class="flex items-center space-x-3">
              <UIcon :name="getCurrentStepIcon()" class="w-6 h-6 text-primary" />
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ getCurrentStep().title }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getCurrentStep().description }}
                </p>
              </div>
            </div>
          </template>

          <!-- Step 1: Personal Information -->
          <UForm 
            v-if="currentStep === 1" 
            :schema="personalInfoSchema" 
            :state="formData" 
            class="space-y-6"
            @submit="handleStepSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField label="First Name" name="firstName" required>
                <UInput 
                  v-model="formData.firstName" 
                  placeholder="Enter first name"
                />
              </UFormField>
              <UFormField label="Last Name" name="lastName" required>
                <UInput 
                  v-model="formData.lastName" 
                  placeholder="Enter last name"
                />
              </UFormField>
              <UFormField label="Email Address" name="email" required>
                <UInput 
                  v-model="formData.email" 
                  type="email"
                  placeholder="Enter email address"
                />
              </UFormField>
              <UFormField label="Phone Number" name="phone" required>
                <UInput 
                  v-model="formData.phone" 
                  placeholder="Enter phone number"
                />
              </UFormField>
              <UFormField label="Date of Birth" name="dateOfBirth" required>
                <UInput 
                  v-model="formData.dateOfBirth" 
                  type="date"
                />
              </UFormField>
              <UFormField label="Employee ID" name="employeeId" required>
                <UInput 
                  v-model="formData.employeeId" 
                  placeholder="Enter employee ID"
                />
              </UFormField>
            </div>

            <!-- Address Section -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Address Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UFormField label="Street Address" name="street" required class="md:col-span-2">
                  <UInput 
                    v-model="formData.street" 
                    placeholder="Enter street address"
                  />
                </UFormField>
                <UFormField label="City" name="city" required>
                  <UInput 
                    v-model="formData.city" 
                    placeholder="Enter city"
                  />
                </UFormField>
                <UFormField label="State" name="state" required>
                  <UInput 
                    v-model="formData.state" 
                    placeholder="Enter state"
                  />
                </UFormField>
                <UFormField label="Zip Code" name="zipCode" required>
                  <UInput 
                    v-model="formData.zipCode" 
                    placeholder="Enter zip code"
                  />
                </UFormField>
                <UFormField label="Country" name="country" required>
                  <UInput 
                    v-model="formData.country" 
                    placeholder="Enter country"
                  />
                </UFormField>
              </div>
            </div>
          </UForm>

          <!-- Step 2: Employment Details -->
          <UForm 
            v-else-if="currentStep === 2" 
            :schema="employmentInfoSchema" 
            :state="formData" 
            class="space-y-6"
            @submit="handleStepSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField label="Position" name="position" required>
                <UInput 
                  v-model="formData.position" 
                  placeholder="Enter position/job title"
                />
              </UFormField>
              <UFormField label="Department" name="department" required>
                <USelect 
                  v-model="formData.department"
                  :options="departmentOptions"
                  placeholder="Select department"
                />
              </UFormField>
              <UFormField label="Manager" name="manager" required>
                <UInput 
                  v-model="formData.manager" 
                  placeholder="Enter manager name"
                />
              </UFormField>
              <UFormField label="Salary" name="salary" required>
                <UInput 
                  v-model.number="formData.salary" 
                  type="number"
                  placeholder="Enter annual salary"
                />
              </UFormField>
              <UFormField label="Employment Type" name="employmentType" required>
                <USelect 
                  v-model="formData.employmentType"
                  :options="employmentTypeOptions"
                  placeholder="Select employment type"
                />
              </UFormField>
              <UFormField label="Work Location" name="workLocation" required>
                <USelect 
                  v-model="formData.workLocation"
                  :options="workLocationOptions"
                  placeholder="Select work location"
                />
              </UFormField>
            </div>
          </UForm>

          <!-- Step 3: Documents & Verification -->
          <div v-else-if="currentStep === 3" class="space-y-6">
            <div class="text-center py-8">
              <UIcon name="i-material-symbols:description" class="w-16 h-16 mx-auto text-primary mb-4" />
              <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Document Checklist</h4>
              <p class="text-gray-500 dark:text-gray-400 mb-6">
                Confirm that required documents are still up to date.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-left">
                <h5 class="font-medium text-gray-900 dark:text-white mb-4">Required Documents:</h5>
                <div class="space-y-3">
                  <label v-for="doc in requiredDocuments" :key="doc.key" class="flex items-center">
                    <UCheckbox 
                      v-model="documentChecklist[doc.key]" 
                      :label="doc.label"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Review & Confirmation -->
          <div v-else class="space-y-6">
            <div class="text-center mb-6">
              <UIcon name="i-material-symbols:fact-check" class="w-16 h-16 mx-auto text-primary mb-4" />
              <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Review Changes</h4>
              <p class="text-gray-500 dark:text-gray-400">
                Confirm everything looks right before saving updates.
              </p>
            </div>

            <UCard>
              <template #header>
                <h5 class="font-medium text-gray-900 dark:text-white">Personal Information</h5>
              </template>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Name:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.firstName }} {{ formData.lastName }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Email:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.email }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Phone:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.phone }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Employee ID:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.employeeId }}</span>
                </div>
              </div>
            </UCard>

            <UCard>
              <template #header>
                <h5 class="font-medium text-gray-900 dark:text-white">Employment Details</h5>
              </template>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Position:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.position }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Department:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.department }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Manager:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ formData.manager }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">Employment Type:</span>
                  <span class="ml-2 text-gray-900 dark:text-white">{{ getEmploymentTypeLabel(formData.employmentType) }}</span>
                </div>
              </div>
            </UCard>
          </div>
        </UCard>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center">
          <UButton 
            v-if="currentStep > 1"
            color="neutral" 
            variant="outline"
            @click="previousStep"
          >
            <UIcon name="i-material-symbols:arrow-back" class="w-4 h-4 mr-2" />
            Previous
          </UButton>
          <div v-else></div>

          <div class="flex space-x-3">
            <UButton 
              color="neutral" 
              variant="outline" 
              @click="cancelEdit"
            >
              Cancel
            </UButton>
            <UButton 
              v-if="currentStep < totalSteps"
              color="primary"
              :disabled="!canProceed"
              @click="nextStep"
            >
              Next
              <UIcon name="i-material-symbols:arrow-forward" class="w-4 h-4 ml-2" />
            </UButton>
            <UButton 
              v-else
              color="primary"
              :loading="isSubmitting"
              :disabled="!canProceed"
              @click="submitEdit"
            >
              <UIcon name="i-material-symbols:save" class="w-4 h-4 mr-2" />
              Save Changes
            </UButton>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-16">
        <UIcon name="i-material-symbols:person-off" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Employee not found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          We couldn't find the employee you're trying to edit. They may have been removed.
        </p>
        <UButton color="primary" @click="navigateTo('/employees')">
          Back to Directory
        </UButton>
      </div>
    </div>
  </div>

  <ConfirmModal
    v-if="showCancelModal"
    :open="showCancelModal"
    title="Discard Changes?"
    message="All unsaved updates will be lost if you leave this page."
    description="This action cannot be undone"
    icon="i-material-symbols:warning"
    icon-class="text-orange-500"
    confirm-label="Discard"
    cancel-label="Continue Editing"
    confirm-color="warning"
    @confirm="confirmCancel"
    @close="showCancelModal = false"
  />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { object, string, number } from 'yup';
import { DEPARTMENTS } from '~/types/constants';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import type { EditableEmployeeFormState, Employee, EmploymentTypeOption, WorkLocationOption } from '~/types';
import { createEmptyEditableForm, employeeToEditableForm, mergeEmployeeWithEditableForm } from '~/utils/employeeForm';
import { useEmployeeDirectory } from '~/composables/useEmployeeDirectory';

type StepKey = 'personal' | 'employment' | 'documents' | 'review';
type RequiredDocumentKey = 'identification' | 'contract' | 'taxForms' | 'emergencyContact';

definePageMeta({
  title: 'Edit Employee'
});

const route = useRoute();
const toast = useToast();
const { getEmployeeById, updateEmployee } = useEmployeeDirectory();

const employeeId = computed(() => route.params.id as string);
const employee = getEmployeeById(employeeId);

const formData = reactive<EditableEmployeeFormState>(createEmptyEditableForm());
const currentStep = ref(1);
const isSubmitting = ref(false);
const showCancelModal = ref(false);

const documentChecklist = ref<Record<RequiredDocumentKey, boolean>>({
  identification: true,
  contract: true,
  taxForms: true,
  emergencyContact: true
});

const steps = [
  { 
    key: 'personal', 
    title: 'Personal Information', 
    description: 'Update personal and contact details',
    icon: 'i-material-symbols:person'
  },
  { 
    key: 'employment', 
    title: 'Employment Details', 
    description: 'Job information and assignments',
    icon: 'i-material-symbols:work'
  },
  { 
    key: 'documents', 
    title: 'Documents & Compliance', 
    description: 'Confirm required paperwork is current',
    icon: 'i-material-symbols:description'
  },
  { 
    key: 'review', 
    title: 'Review & Save', 
    description: 'Review updates before saving',
    icon: 'i-material-symbols:fact-check'
  }
] as const satisfies Array<{ key: StepKey; title: string; description: string; icon: string }>;

const requiredDocuments: Array<{ key: RequiredDocumentKey; label: string }> = [
  { key: 'identification', label: 'Government ID / Passport' },
  { key: 'contract', label: 'Employment Contract' },
  { key: 'taxForms', label: 'Tax Forms (W-4, etc.)' },
  { key: 'emergencyContact', label: 'Emergency Contact Information' }
];

const totalSteps = steps.length;

const departmentOptions = DEPARTMENTS.map(dept => ({ label: dept, value: dept }));

const employmentTypeOptions: Array<{ label: string; value: EmploymentTypeOption }> = [
  { label: 'Full Time', value: 'fullTime' },
  { label: 'Part Time', value: 'partTime' },
  { label: 'Contractor', value: 'contractor' }
];

const workLocationOptions: Array<{ label: string; value: WorkLocationOption }> = [
  { label: 'Office', value: 'office' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' }
];

const personalInfoSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email('Invalid email format').required('Email is required'),
  phone: string().required('Phone number is required'),
  dateOfBirth: string().required('Date of birth is required'),
  employeeId: string().required('Employee ID is required'),
  street: string().required('Street address is required'),
  city: string().required('City is required'),
  state: string().required('State is required'),
  zipCode: string().required('Zip code is required'),
  country: string().required('Country is required')
});

const employmentInfoSchema = object({
  position: string().required('Position is required'),
  department: string().required('Department is required'),
  manager: string().required('Manager is required'),
  salary: number().positive('Salary must be positive').required('Salary is required'),
  employmentType: string().oneOf(['fullTime', 'partTime', 'contractor'], 'Invalid employment type').required('Employment type is required'),
  workLocation: string().oneOf(['office', 'remote', 'hybrid'], 'Invalid work location').required('Work location is required')
});

const employeeName = computed(() => {
  const value = employee.value;
  if (!value) {
    return 'Employee';
  }
  return `${value.firstName} ${value.lastName}`.trim();
});

watch(employee, (value) => {
  if (value) {
    Object.assign(formData, employeeToEditableForm(value));
  }
}, { immediate: true });

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth && formData.employeeId && formData.street && formData.city && formData.state && formData.zipCode && formData.country);
  }
  if (currentStep.value === 2) {
    return !!(formData.position && formData.department && formData.manager && formData.salary > 0 && formData.employmentType && formData.workLocation);
  }
  if (currentStep.value === 3) {
    return Object.values(documentChecklist.value).every(Boolean);
  }
  return true;
});

const getCurrentStep = () => {
  const index = Math.min(Math.max(currentStep.value - 1, 0), steps.length - 1);
  return steps[index]!;
};

const getCurrentStepIcon = () => getCurrentStep().icon;

const getStepStatusClass = (stepNumber: number) => {
  if (stepNumber < currentStep.value) {
    return 'bg-primary text-white';
  } else if (stepNumber === currentStep.value) {
    return 'bg-primary text-white ring-2 ring-primary ring-opacity-50';
  } else {
    return 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
  }
};

const getEmploymentTypeLabel = (value: EmploymentTypeOption | undefined) => {
  const option = employmentTypeOptions.find(opt => opt.value === value);
  return option?.label ?? value ?? '';
};

const handleStepSubmit = async (event: FormSubmitEvent<Record<string, unknown>>) => {
  console.log('Form data validated:', event.data);
};

const nextStep = () => {
  if (canProceed.value && currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const cancelEdit = () => {
  showCancelModal.value = true;
};

const confirmCancel = () => {
  navigateTo('/employees');
};

const submitEdit = async () => {
  if (!employee.value || !canProceed.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    const updatedPayload: Employee = mergeEmployeeWithEditableForm(employee.value, formData);
    updateEmployee(employee.value.id, updatedPayload);

    toast.add({
      title: 'Employee updated',
      description: `${employeeName.value}'s profile has been refreshed.`,
      color: 'primary'
    });

    await navigateTo(`/employees/${employee.value.id}`);
  } catch (error) {
    console.error('Failed to update employee', error);
    toast.add({
      title: 'Update failed',
      description: 'Something went wrong while saving changes.',
      color: 'red'
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
