<template>
  <div class="p-4 bg-gray-100 rounded">
    <h3>🧪 BULLETPROOF TEST EmployeeCardView</h3>
    <p><strong>Received:</strong> {{ employees?.length || 0 }} employees</p>
    <p><strong>Array check:</strong> {{ Array.isArray(employees) }}</p>
    
    <div class="mt-2">
      <h4 class="font-bold">DIRECT ACCESS TEST:</h4>
      <div v-if="employees && employees[0]" class="p-2 bg-white border rounded">
        First employee: {{ employees[0].firstName }} {{ employees[0].lastName }}
      </div>
      <div v-else class="text-red-500">Cannot access employees[0]</div>
    </div>

    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="(employee, idx) in (employees || [])" :key="`test-${idx}-${employee?.id || 'unknown'}`">
        <div class="p-4 border border-gray-300 rounded bg-white">
          <h4 class="font-bold text-lg">{{ employee?.firstName || 'N/A' }} {{ employee?.lastName || 'N/A' }}</h4>
          <p class="text-sm text-gray-600">{{ employee?.position || 'N/A' }}</p>
          <p class="text-sm text-gray-600">{{ employee?.department || 'N/A' }}</p>
          <p class="text-xs text-gray-500">ID: {{ employee?.id || 'N/A' }}</p>
          <p class="text-xs text-gray-500">EmpID: {{ employee?.employeeId || 'N/A' }}</p>
        </div>
      </template>
    </div>
    
    <div class="mt-2 text-xs text-gray-500">
      Loop executed {{ employees?.length || 0 }} times
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';

interface Props {
  employees: Employee[];
}

const props = defineProps<Props>();

console.log('🧪 BULLETPROOF TEST EmployeeCardView received employees:', props.employees?.length || 0);
console.log('🧪 Raw employees data:', props.employees);
console.log('🧪 First employee:', props.employees?.[0]);

// Try to trigger reactivity
watch(() => props.employees, (newVal) => {
  console.log('🧪 Watch triggered - employees changed to:', newVal?.length);
}, { immediate: true, deep: true });
</script>