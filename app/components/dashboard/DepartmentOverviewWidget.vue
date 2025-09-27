<template>
  <DashboardWidget title="Department Overview">
    <div class="space-y-4">
      <!-- Department Grid -->
      <div class="grid grid-cols-2 gap-3">
        <div 
          v-for="dept in departments.slice(0, 4)" 
          :key="dept.name"
          class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ dept.name }}</h4>
            <div 
              class="w-3 h-3 rounded-full"
              :class="dept.statusColor"
            ></div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div class="flex justify-between">
              <span>Employees:</span>
              <span class="font-medium">{{ dept.employees }}</span>
            </div>
            <div class="flex justify-between">
              <span>On Leave:</span>
              <span class="font-medium">{{ dept.onLeave }}</span>
            </div>
            <div class="flex justify-between">
              <span>Vacancies:</span>
              <span class="font-medium">{{ dept.vacancies }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <div class="text-lg font-bold text-gray-900 dark:text-white">{{ totalEmployees }}</div>
            <p class="text-xs text-gray-500 dark:text-gray-400">Total Staff</p>
          </div>
          <div>
            <div class="text-lg font-bold text-orange-600 dark:text-orange-400">{{ totalOnLeave }}</div>
            <p class="text-xs text-gray-500 dark:text-gray-400">On Leave</p>
          </div>
          <div>
            <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ totalVacancies }}</div>
            <p class="text-xs text-gray-500 dark:text-gray-400">Open Roles</p>
          </div>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const departments = [
  {
    name: 'Engineering',
    employees: 45,
    onLeave: 3,
    vacancies: 2,
    statusColor: 'bg-green-500'
  },
  {
    name: 'Sales',
    employees: 32,
    onLeave: 1,
    vacancies: 4,
    statusColor: 'bg-blue-500'
  },
  {
    name: 'Marketing',
    employees: 18,
    onLeave: 2,
    vacancies: 1,
    statusColor: 'bg-yellow-500'
  },
  {
    name: 'HR',
    employees: 8,
    onLeave: 0,
    vacancies: 1,
    statusColor: 'bg-purple-500'
  },
  {
    name: 'Finance',
    employees: 12,
    onLeave: 1,
    vacancies: 0,
    statusColor: 'bg-green-500'
  },
  {
    name: 'Operations',
    employees: 25,
    onLeave: 2,
    vacancies: 2,
    statusColor: 'bg-orange-500'
  }
];

const totalEmployees = computed(() => departments.reduce((sum, dept) => sum + dept.employees, 0));
const totalOnLeave = computed(() => departments.reduce((sum, dept) => sum + dept.onLeave, 0));
const totalVacancies = computed(() => departments.reduce((sum, dept) => sum + dept.vacancies, 0));
</script>