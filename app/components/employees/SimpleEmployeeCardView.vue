<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- Debug info -->
    <div class="col-span-full p-2 bg-green-100 rounded text-xs">
      🔍 SimpleEmployeeCardView: Received {{ employees?.length || 0 }} employees
    </div>
    
    <!-- Simple card implementation without UCard -->
    <div
      v-for="employee in employees"
      :key="employee.id"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      <!-- Header -->
      <div class="relative">
        <div class="h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-lg"></div>
        <div class="absolute -bottom-6 left-6">
          <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-lg ring-4 ring-white dark:ring-gray-800">
            {{ employee.firstName[0] }}{{ employee.lastName[0] }}
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 pt-8">
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
              ID: {{ employee.employeeId }}
            </p>
          </div>

          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs">🏢</span>
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ employee.department }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs">📧</span>
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ employee.email }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs">📞</span>
              <span class="text-sm text-gray-600 dark:text-gray-300">
                {{ employee.phone }}
              </span>
            </div>
          </div>

          <!-- Status Badge -->
          <div class="flex items-center">
            <span 
              class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-green-100 text-green-800': employee.status === 'active',
                'bg-red-100 text-red-800': employee.status === 'inactive',
                'bg-yellow-100 text-yellow-800': employee.status === 'on-leave'
              }"
            >
              {{ employee.status === 'on-leave' ? 'On Leave' : employee.status.charAt(0).toUpperCase() + employee.status.slice(1) }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-4 flex gap-2">
          <button
            class="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-3 rounded-md transition-colors"
            @click="$emit('view-profile', employee)"
          >
            View Profile
          </button>
          <button
            class="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
            @click="$emit('edit-employee', employee)"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';

interface Props {
  employees: Employee[];
}

const props = defineProps<Props>();

console.log('🔍 SimpleEmployeeCardView: Received props:', props.employees?.length || 0, 'employees');

defineEmits<{
  'view-profile': [employee: Employee];
  'edit-employee': [employee: Employee];
  'archive-employee': [employee: Employee];
}>();
</script>