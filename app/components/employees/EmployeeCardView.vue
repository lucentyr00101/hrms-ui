<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- Debug info -->
    <div class="col-span-full p-2 bg-pink-100 rounded text-xs">
      🔍 EmployeeCardView: Received {{ employees?.length || 0 }} employees
    </div>
    
    <UCard
      v-for="employee in employees"
      :key="employee.id"
      class="hover:shadow-lg transition-shadow duration-200"
      :ui="{ 
        body: { padding: 'p-6' },
        header: { padding: 'p-0' },
        footer: { padding: 'p-0' }
      }"
    >
      <template #header>
        <div class="relative">
          <div class="h-20 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-lg"></div>
          <div class="absolute -bottom-6 left-6">
            <UAvatar
              :alt="`${employee.firstName} ${employee.lastName}`"
              :text="`${employee.firstName[0]}${employee.lastName[0]}`"
              size="xl"
              class="ring-4 ring-white dark:ring-gray-800"
            />
          </div>
        </div>
      </template>

      <div class="pt-4">
        <!-- Employee Info -->
        <div class="space-y-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ employee.firstName }} {{ employee.lastName }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ employee.position }}
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              {{ employee.employeeId }}
            </p>
          </div>

          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <UIcon name="i-material-symbols:business" class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ employee.department }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-material-symbols:mail" class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-300 truncate">
                {{ employee.email }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-material-symbols:calendar-today" class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ formatDate(employee.startDate) }}
              </span>
            </div>
          </div>

          <!-- Status Badge -->
          <div class="flex justify-between items-center pt-2">
            <span 
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusClasses(employee.status)
              ]"
            >
              {{ getStatusLabel(employee.status) }}
            </span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
          <UButton
            size="sm"
            color="primary"
            variant="ghost"
            @click="$emit('view-profile', employee)"
          >
            View Profile
          </UButton>
          
          <div class="flex gap-1">
            <UButton
              size="sm"
              color="gray"
              variant="ghost"
              @click="$emit('edit-employee', employee)"
            >
              Edit
            </UButton>
            <UButton
              size="sm"
              color="red"
              variant="ghost"
              @click="$emit('archive-employee', employee)"
            >
              Archive
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';

interface Props {
  employees: Employee[];
}

const props = defineProps<Props>();

console.log('🔍 EmployeeCardView: Received props:', props.employees?.length || 0, 'employees');
console.log('🔍 EmployeeCardView: First employee:', props.employees?.[0]);

const _emit = defineEmits<{
  'view-profile': [employee: Employee];
  'edit-employee': [employee: Employee];
  'archive-employee': [employee: Employee];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
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