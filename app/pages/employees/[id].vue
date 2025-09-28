<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-purple-600 mb-4">
      Employee Profile: {{ employeeId }}
    </h1>
    
    <UCard>
      <template #header>
        <EmployeeProfileHeader @back="navigateTo('/employees')" />
      </template>

      <div v-if="pending" class="text-center py-8">
        <div class="w-8 h-8 animate-spin border-4 border-gray-200 border-t-purple-500 rounded-full mx-auto"></div>
        <p class="mt-2">Loading employee data...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        ❌ Employee not found
      </div>

      <div v-else-if="employee" class="space-y-4">
        <EmployeeSummary :employee="employee" />

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
// Get employee ID from route
const route = useRoute();
const employeeId = route.params.id as string;

// Use employee profile composable
const {
  pending,
  error,
  employee,
  employeeDocuments,
  employeeActivities,
  isEditMode,
  formState,
  updateFormState,
} = useEmployeeProfile(employeeId);

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
</script>