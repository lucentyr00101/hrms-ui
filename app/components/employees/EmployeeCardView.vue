<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    
    <UCard
      v-for="employee in employees"
      :key="employee.id"
      class="hover:shadow-lg transition-shadow duration-200"
      :ui="{ 
        body: 'p-6',
        header: 'p-0',
        footer: 'p-0'
      }"
    >
      <template #header>
        <div class="relative">
          <div class="h-20 bg-gradient-to-r from-primary-400 to-primary-600 rounded-t-lg" />
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
              color="neutral"
              variant="ghost"
              @click="$emit('edit-employee', employee)"
            >
              Edit
            </UButton>
            <UButton
              size="sm"
              color="error"
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
import { getEmployeeStatusClasses, getEmployeeStatusLabel } from '~/composables/useEmployees';
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

const getStatusClasses = getEmployeeStatusClasses;
const getStatusLabel = getEmployeeStatusLabel;
</script>