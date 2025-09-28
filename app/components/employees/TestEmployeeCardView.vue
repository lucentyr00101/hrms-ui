<template>
  <div class="p-4 bg-gray-100 rounded">
    <h3>🧪 TEST EmployeeCardView</h3>
    <p>Received {{ employees.length }} employees</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="p-4 border border-gray-300 rounded bg-white"
      >
        <h4 class="font-bold">{{ employee.firstName }} {{ employee.lastName }}</h4>
        <p class="text-sm text-gray-600">{{ employee.position }}</p>
        <p class="text-sm text-gray-600">{{ employee.department }}</p>
        <p class="text-xs text-gray-500">ID: {{ employee.id }}</p>
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

console.log('🧪 TEST EmployeeCardView received employees:', props.employees.length);
</script>