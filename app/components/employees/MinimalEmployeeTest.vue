<template>
  <div class="p-4 bg-red-50 border border-red-300 rounded">
    <h3>🔬 MINIMAL EMPLOYEE TEST</h3>
    
    <!-- Step 1: Test if template renders at all -->
    <div class="p-2 bg-blue-100 mb-2">
      ✅ Template is rendering - you can see this text
    </div>
    
    <!-- Step 2: Test basic data access -->
    <div class="p-2 bg-green-100 mb-2">
      Props test: {{ employees ? 'Props received' : 'No props' }}
      Length: {{ employees?.length ?? 'undefined' }}
    </div>
    
    <!-- Step 3: Test manual array -->
    <div class="p-2 bg-yellow-100 mb-2">
      <h4>Manual Array Test:</h4>
      <div v-for="item in ['Item 1', 'Item 2', 'Item 3']" :key="item" class="p-1 bg-white border mb-1">
        {{ item }}
      </div>
    </div>
    
    <!-- Step 4: Test with hardcoded employee -->
    <div class="p-2 bg-purple-100 mb-2">
      <h4>Hardcoded Employee Test:</h4>
      <div v-for="emp in hardcodedEmployees" :key="emp.id" class="p-2 bg-white border mb-1">
        {{ emp.name }} - {{ emp.position }}
      </div>
    </div>
    
    <!-- Step 5: Test with props but simple rendering -->
    <div class="p-2 bg-pink-100 mb-2">
      <h4>Props Test (Simple):</h4>
      <div class="text-sm">
        Raw employees count: {{ employees?.length }}
      </div>
      <template v-if="employees && employees.length > 0">
        <div v-for="(emp, idx) in employees" :key="`simple-${idx}`" class="p-1 bg-white border text-xs mb-1">
          {{ idx + 1 }}. {{ emp?.firstName || 'NO NAME' }}
        </div>
      </template>
      <div v-else class="text-red-500">
        No employees in props
      </div>
    </div>
    
    <!-- Step 6: Force re-render test -->
    <div class="p-2 bg-gray-100">
      <h4>Force Render Test:</h4>
      <button class="px-2 py-1 bg-blue-500 text-white rounded text-sm" @click="forceUpdate">
        Force Update ({{ updateCount }})
      </button>
      <div v-if="showForced" class="mt-2">
        <div v-for="(emp, idx) in employees" :key="`forced-${updateCount}-${idx}`" class="p-1 bg-white border text-xs">
          {{ emp?.firstName }} {{ emp?.lastName }}
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

// Hardcoded test data
const hardcodedEmployees = ref([
  { id: '1', name: 'Test Employee 1', position: 'Test Position 1' },
  { id: '2', name: 'Test Employee 2', position: 'Test Position 2' },
]);

// Force update mechanism
const updateCount = ref(0);
const showForced = ref(false);

const forceUpdate = () => {
  updateCount.value++;
  showForced.value = !showForced.value;
  console.log('🔬 Force update:', updateCount.value, 'employees:', props.employees?.length);
};

console.log('🔬 MinimalEmployeeTest setup');
console.log('🔬 Props:', props.employees);
console.log('🔬 Props length:', props.employees?.length);
console.log('🔬 Props type:', typeof props.employees);
console.log('🔬 Is array:', Array.isArray(props.employees));

// Watch for changes
watch(() => props.employees, (newVal) => {
  console.log('🔬 Props changed:', newVal?.length);
}, { immediate: true, deep: true });

// Also test onMounted
onMounted(() => {
  console.log('🔬 onMounted - employees:', props.employees?.length);
});
</script>