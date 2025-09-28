<template>
  <div class="p-4 bg-green-50 border border-green-300 rounded">
    <h3>🔍 BULLETPROOF DEBUG SimpleEmployeeCardView</h3>
    <p><strong>Props received:</strong> {{ employees?.length || 0 }} employees</p>
    <p><strong>Type check:</strong> {{ Array.isArray(employees) ? 'Array' : typeof employees }}</p>
    <p><strong>First employee exists:</strong> {{ !!employees?.[0] }}</p>
    <p><strong>First employee ID:</strong> {{ employees?.[0]?.id }}</p>
    <p><strong>First employee name:</strong> {{ employees?.[0]?.firstName }} {{ employees?.[0]?.lastName }}</p>
    
    <div class="mt-4 p-2 bg-yellow-100 rounded">
      <h4>RAW DATA DUMP:</h4>
      <pre class="text-xs">{{ JSON.stringify(employees?.[0], null, 2) }}</pre>
    </div>

    <div class="mt-4">
      <h4>MANUAL LOOP TEST:</h4>
      <div v-if="employees && employees.length > 0">
        <div v-for="(employee, index) in employees" :key="`emp-${index}`" class="p-2 mb-2 bg-blue-100 border rounded">
          <strong>Employee {{ index + 1 }}:</strong> 
          {{ employee?.firstName || 'NO_FIRST_NAME' }} 
          {{ employee?.lastName || 'NO_LAST_NAME' }} - 
          {{ employee?.position || 'NO_POSITION' }}
          (ID: {{ employee?.id || 'NO_ID' }})
        </div>
      </div>
      <div v-else class="text-red-500">
        ❌ No employees to loop through
      </div>
    </div>

    <div class="mt-4">
      <h4>ALTERNATIVE LOOP (with force key):</h4>
      <template v-for="(employee, index) in (employees || [])" :key="`force-${employee?.id || index}`">
        <div class="p-2 mb-1 bg-purple-100 border rounded text-sm">
          Index {{ index }}: {{ employee?.firstName }} {{ employee?.lastName }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';

interface Props {
  employees: Employee[];
}

const props = defineProps<Props>();

console.log('🔍 BULLETPROOF SimpleEmployeeCardView:');
console.log('  - employees prop:', props.employees);
console.log('  - employees length:', props.employees?.length);
console.log('  - is array:', Array.isArray(props.employees));
console.log('  - first employee:', props.employees?.[0]);
console.log('  - employees raw:', JSON.stringify(props.employees));

defineEmits<{
  'view-profile': [employee: Employee];
  'edit-employee': [employee: Employee];
  'archive-employee': [employee: Employee];
}>();
</script>