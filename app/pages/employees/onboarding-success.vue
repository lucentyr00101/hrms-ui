<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
    <div class="max-w-2xl mx-auto px-4 text-center">
      <!-- Success Icon -->
      <div class="mb-8">
        <div class="mx-auto flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900">
          <UIcon name="i-material-symbols:check-circle" class="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <!-- Success Message -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Onboarding Complete!
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          <span class="font-semibold text-primary">{{ employeeName }}</span> has been successfully added to your organization.
        </p>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div class="flex items-center justify-center space-x-4">
            <div class="text-sm text-gray-500 dark:text-gray-400">Employee ID:</div>
            <div class="text-lg font-mono font-semibold text-primary bg-primary/10 px-3 py-1 rounded">
              {{ mockEmployeeId }}
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Card -->
      <UCard class="mb-8 text-left">
        <template #header>
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:task-alt" class="w-5 h-5 text-primary" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Onboarding Summary</h3>
          </div>
        </template>

        <div class="space-y-4">
          <!-- Completed Tasks -->
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">Completed Tasks</h4>
            <div class="space-y-2">
              <div v-for="task in completedTasks" :key="task" class="flex items-center space-x-2">
                <UIcon name="i-material-symbols:check" class="w-4 h-4 text-green-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ task }}</span>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 class="font-medium text-gray-900 dark:text-white mb-3">Next Steps</h4>
            <div class="space-y-2">
              <div v-for="step in nextSteps" :key="step" class="flex items-center space-x-2">
                <UIcon name="i-material-symbols:radio-button-unchecked" class="w-4 h-4 text-blue-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton 
          color="primary" 
          size="lg"
          @click="viewEmployee"
        >
          <UIcon name="i-material-symbols:person" class="w-4 h-4 mr-2" />
          View Employee Profile
        </UButton>
        <UButton 
          color="gray" 
          variant="outline" 
          size="lg"
          @click="addAnother"
        >
          <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
          Add Another Employee
        </UButton>
        <UButton 
          color="gray" 
          variant="outline" 
          size="lg"
          @click="backToEmployees"
        >
          <UIcon name="i-material-symbols:people" class="w-4 h-4 mr-2" />
          Back to Employees
        </UButton>
      </div>

      <!-- Additional Information -->
      <div class="mt-12 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
          An email notification has been sent to the HR team and the employee's manager.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center text-sm">
          <div class="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            <UIcon name="i-material-symbols:schedule" class="w-4 h-4" />
            <span>Completed at {{ completedTime }}</span>
          </div>
          <div class="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            <UIcon name="i-material-symbols:person" class="w-4 h-4" />
            <span>Processed by Admin User</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Onboarding Complete'
});

// Get query parameters
const route = useRoute();
const employeeName = route.query.name as string || 'New Employee';
const employeeId = route.query.employeeId as string || 'EMP###';

// Generate a mock employee ID for demo purposes if not provided
const mockEmployeeId = computed(() => {
  if (employeeId === 'EMP###') {
    return `EMP${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  }
  return employeeId;
});

// Current timestamp
const completedTime = new Date().toLocaleString();

// Completed tasks list
const completedTasks = [
  'Personal information collected and verified',
  'Employment details configured',
  'Required documents checklist completed',
  'Employee profile created in system',
  'Department notification sent',
  'Manager assignment completed',
  'System access credentials generated'
];

// Next steps for HR
const nextSteps = [
  'Set up workspace and equipment',
  'Schedule orientation meeting',
  'Provide system access credentials',
  'Add to relevant team channels',
  'Schedule first one-on-one with manager',
  'Complete background check verification'
];

// Navigation methods
const viewEmployee = () => {
  // For demo purposes, navigate to the first employee
  navigateTo('/employees/1');
};

const addAnother = () => {
  navigateTo('/employees/onboarding');
};

const backToEmployees = () => {
  navigateTo('/employees');
};

// Auto-redirect after 30 seconds (commented out for demo purposes)
// onMounted(() => {
//   setTimeout(() => {
//     if (confirm('Would you like to return to the employees list?')) {
//       backToEmployees();
//     }
//   }, 30000);
// });
</script>