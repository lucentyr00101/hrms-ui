<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Employee Onboarding
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Welcome! Let's get your new team member set up in the system.
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
        <div v-if="currentStep === 1" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="First Name" required>
              <UInput 
                v-model="formData.firstName" 
                placeholder="Enter first name"
                :error="getFieldError('firstName')"
              />
            </UFormGroup>
            <UFormGroup label="Last Name" required>
              <UInput 
                v-model="formData.lastName" 
                placeholder="Enter last name"
                :error="getFieldError('lastName')"
              />
            </UFormGroup>
            <UFormGroup label="Email Address" required>
              <UInput 
                v-model="formData.email" 
                type="email"
                placeholder="Enter email address"
                :error="getFieldError('email')"
              />
            </UFormGroup>
            <UFormGroup label="Phone Number" required>
              <UInput 
                v-model="formData.phone" 
                placeholder="Enter phone number"
                :error="getFieldError('phone')"
              />
            </UFormGroup>
            <UFormGroup label="Date of Birth" required>
              <UInput 
                v-model="formData.dateOfBirth" 
                type="date"
                :error="getFieldError('dateOfBirth')"
              />
            </UFormGroup>
            <UFormGroup label="Employee ID" required>
              <UInput 
                v-model="formData.employeeId" 
                placeholder="Enter employee ID"
                :error="getFieldError('employeeId')"
              />
            </UFormGroup>
          </div>

          <!-- Address Section -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Address Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormGroup label="Street Address" required class="md:col-span-2">
                <UInput 
                  v-model="formData.street" 
                  placeholder="Enter street address"
                  :error="getFieldError('street')"
                />
              </UFormGroup>
              <UFormGroup label="City" required>
                <UInput 
                  v-model="formData.city" 
                  placeholder="Enter city"
                  :error="getFieldError('city')"
                />
              </UFormGroup>
              <UFormGroup label="State" required>
                <UInput 
                  v-model="formData.state" 
                  placeholder="Enter state"
                  :error="getFieldError('state')"
                />
              </UFormGroup>
              <UFormGroup label="Zip Code" required>
                <UInput 
                  v-model="formData.zipCode" 
                  placeholder="Enter zip code"
                  :error="getFieldError('zipCode')"
                />
              </UFormGroup>
              <UFormGroup label="Country" required>
                <UInput 
                  v-model="formData.country" 
                  placeholder="Enter country"
                  :error="getFieldError('country')"
                />
              </UFormGroup>
            </div>
          </div>
        </div>

        <!-- Step 2: Employment Details -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Position" required>
              <UInput 
                v-model="formData.position" 
                placeholder="Enter position/job title"
                :error="getFieldError('position')"
              />
            </UFormGroup>
            <UFormGroup label="Department" required>
              <USelectMenu 
                v-model="formData.department"
                :options="departmentOptions"
                placeholder="Select department"
                :error="getFieldError('department')"
              />
            </UFormGroup>
            <UFormGroup label="Manager" required>
              <UInput 
                v-model="formData.manager" 
                placeholder="Enter manager name"
                :error="getFieldError('manager')"
              />
            </UFormGroup>
            <UFormGroup label="Salary" required>
              <UInput 
                v-model.number="formData.salary" 
                type="number"
                placeholder="Enter annual salary"
                :error="getFieldError('salary')"
              />
            </UFormGroup>
            <UFormGroup label="Employment Type" required>
              <USelectMenu 
                v-model="formData.employmentType"
                :options="employmentTypeOptions"
                placeholder="Select employment type"
                :error="getFieldError('employmentType')"
              />
            </UFormGroup>
            <UFormGroup label="Work Location" required>
              <USelectMenu 
                v-model="formData.workLocation"
                :options="workLocationOptions"
                placeholder="Select work location"
                :error="getFieldError('workLocation')"
              />
            </UFormGroup>
          </div>
        </div>

        <!-- Step 3: Documents & Verification -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="text-center py-8">
            <UIcon name="i-material-symbols:description" class="w-16 h-16 mx-auto text-primary mb-4" />
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Document Upload</h4>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Upload required documents for the new employee
            </p>
            
            <!-- Checklist of required documents -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-left">
              <h5 class="font-medium text-gray-900 dark:text-white mb-4">Required Documents Checklist:</h5>
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
        <div v-if="currentStep === 4" class="space-y-6">
          <div class="text-center mb-6">
            <UIcon name="i-material-symbols:fact-check" class="w-16 h-16 mx-auto text-primary mb-4" />
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Review & Confirm</h4>
            <p class="text-gray-500 dark:text-gray-400">
              Please review the information below before submitting
            </p>
          </div>

          <!-- Personal Information Review -->
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

          <!-- Employment Details Review -->
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
          color="gray" 
          variant="outline"
          @click="previousStep"
        >
          <UIcon name="i-material-symbols:arrow-back" class="w-4 h-4 mr-2" />
          Previous
        </UButton>
        <div v-else></div>

        <div class="flex space-x-3">
          <UButton 
            color="gray" 
            variant="outline" 
            @click="cancelOnboarding"
          >
            Cancel
          </UButton>
          <UButton 
            v-if="currentStep < totalSteps"
            color="primary"
            @click="nextStep"
            :disabled="!canProceed"
          >
            Next
            <UIcon name="i-material-symbols:arrow-forward" class="w-4 h-4 ml-2" />
          </UButton>
          <UButton 
            v-else
            color="primary"
            @click="submitOnboarding"
            :loading="isSubmitting"
          >
            <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
            Complete Onboarding
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { employeeInfoSchema } from '~/schemas/employee';
import { DEPARTMENTS } from '~/constants/EMPLOYEE_DATA';

// Page meta
definePageMeta({
  title: 'Employee Onboarding'
});

// Reactive state
const currentStep = ref(1);
const totalSteps = 4;
const isSubmitting = ref(false);
const errors = ref<Record<string, string>>({});

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  employeeId: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  position: '',
  department: '',
  manager: '',
  salary: 0,
  employmentType: '',
  workLocation: ''
});

// Document checklist
const documentChecklist = ref({
  identification: false,
  contract: false,
  taxForms: false,
  emergencyContact: false
});

// Step configuration
const steps = [
  { 
    key: 'personal', 
    title: 'Personal Information', 
    description: 'Basic personal and contact details',
    icon: 'i-material-symbols:person'
  },
  { 
    key: 'employment', 
    title: 'Employment Details', 
    description: 'Job position and work information',
    icon: 'i-material-symbols:work'
  },
  { 
    key: 'documents', 
    title: 'Documents & Verification', 
    description: 'Required documents and verification',
    icon: 'i-material-symbols:description'
  },
  { 
    key: 'review', 
    title: 'Review & Confirmation', 
    description: 'Review all information before submitting',
    icon: 'i-material-symbols:fact-check'
  }
];

// Required documents
const requiredDocuments = [
  { key: 'identification', label: 'Government ID / Passport' },
  { key: 'contract', label: 'Signed Employment Contract' },
  { key: 'taxForms', label: 'Tax Forms (W-4, etc.)' },
  { key: 'emergencyContact', label: 'Emergency Contact Information' }
];

// Select options
const departmentOptions = DEPARTMENTS.map(dept => ({ label: dept, value: dept }));

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

// Computed properties
const canProceed = computed(() => {
  try {
    if (currentStep.value === 1) {
      // Validate personal information fields
      const personalFields = {
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        email: formData.value.email,
        phone: formData.value.phone,
        dateOfBirth: formData.value.dateOfBirth,
        employeeId: formData.value.employeeId,
        street: formData.value.street,
        city: formData.value.city,
        state: formData.value.state,
        zipCode: formData.value.zipCode,
        country: formData.value.country
      };
      
      return Object.values(personalFields).every(value => value && value.toString().trim() !== '');
    } else if (currentStep.value === 2) {
      // Validate employment fields
      const employmentFields = {
        position: formData.value.position,
        department: formData.value.department,
        manager: formData.value.manager,
        salary: formData.value.salary,
        employmentType: formData.value.employmentType,
        workLocation: formData.value.workLocation
      };
      
      return Object.values(employmentFields).every(value => 
        value !== null && value !== undefined && value.toString().trim() !== ''
      ) && formData.value.salary > 0;
    } else if (currentStep.value === 3) {
      // Check if all required documents are marked as completed
      return Object.values(documentChecklist.value).every(checked => checked);
    }
    
    return true;
  } catch (error) {
    return false;
  }
});

// Methods
const getCurrentStep = () => steps[currentStep.value - 1];

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

const getFieldError = (field: string) => {
  return errors.value[field] || '';
};

const getEmploymentTypeLabel = (value: string) => {
  const option = employmentTypeOptions.find(opt => opt.value === value);
  return option?.label || value;
};

const validateCurrentStep = async () => {
  errors.value = {};
  
  try {
    if (currentStep.value === 1 || currentStep.value === 2) {
      await employeeInfoSchema.validate(formData.value, { abortEarly: false });
    }
    return true;
  } catch (error: any) {
    if (error.inner) {
      error.inner.forEach((err: any) => {
        errors.value[err.path] = err.message;
      });
    }
    return false;
  }
};

const nextStep = async () => {
  const isValid = await validateCurrentStep();
  if (isValid && currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const cancelOnboarding = () => {
  if (confirm('Are you sure you want to cancel the onboarding process? All entered data will be lost.')) {
    navigateTo('/employees');
  }
};

const submitOnboarding = async () => {
  isSubmitting.value = true;
  
  try {
    // Validate all data
    await employeeInfoSchema.validate(formData.value);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success page
    navigateTo({
      path: '/employees/onboarding/success',
      query: { 
        name: `${formData.value.firstName} ${formData.value.lastName}`,
        employeeId: formData.value.employeeId
      }
    });
  } catch (error) {
    console.error('Onboarding submission failed:', error);
    // Handle error - could show a toast notification
  } finally {
    isSubmitting.value = false;
  }
};
</script>