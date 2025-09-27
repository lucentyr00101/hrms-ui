<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <!-- Custom Table Implementation -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Employee
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Position
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Department
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Contact
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Start Date
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <!-- Employee Info -->
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <UAvatar
                  :alt="`${employee.firstName} ${employee.lastName}`"
                  :text="`${employee.firstName[0]}${employee.lastName[0]}`"
                  size="sm"
                  class="mr-3"
                />
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ employee.firstName }} {{ employee.lastName }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ employee.employeeId }}
                  </div>
                </div>
              </div>
            </td>
            
            <!-- Position -->
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">
                {{ employee.position }}
              </div>
            </td>
            
            <!-- Department -->
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">
                {{ employee.department }}
              </div>
            </td>
            
            <!-- Contact -->
            <td class="px-4 py-4 whitespace-nowrap">
              <div>
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ employee.email }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ employee.phone }}
                </div>
              </div>
            </td>
            
            <!-- Status -->
            <td class="px-4 py-4 whitespace-nowrap">
              <span 
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getStatusClasses(employee.status)
                ]"
              >
                {{ getStatusLabel(employee.status) }}
              </span>
            </td>
            
            <!-- Start Date -->
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-white">
                {{ formatDate(employee.startDate) }}
              </div>
            </td>
            
            <!-- Actions -->
            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex space-x-2">
                <UButton
                  size="xs"
                  color="primary"
                  variant="ghost"
                  @click="$emit('view-profile', employee)"
                >
                  View
                </UButton>
                <UButton
                  size="xs"
                  color="gray"
                  variant="ghost"
                  @click="$emit('edit-employee', employee)"
                >
                  Edit
                </UButton>
                <UButton
                  size="xs"
                  color="red"
                  variant="ghost"
                  @click="$emit('archive-employee', employee)"
                >
                  Archive
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state (if needed) -->
    <div
      v-if="employees.length === 0"
      class="text-center py-12"
    >
      <UIcon name="i-material-symbols:emoji-people" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No employees found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Try adjusting your search or filters.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/constants/EMPLOYEE_DATA';

interface Props {
  employees: Employee[];
}

defineProps<Props>();

const emit = defineEmits<{
  'view-profile': [employee: Employee];
  'edit-employee': [employee: Employee];
  'archive-employee': [employee: Employee];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short',
    day: 'numeric'
  });
};

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100';
    case 'inactive':
      return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
    case 'on-leave':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'inactive':
      return 'Inactive';
    case 'on-leave':
      return 'On Leave';
    default:
      return status;
  }
};
</script>