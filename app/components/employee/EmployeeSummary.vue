<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-4">
      <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span class="text-xl font-bold text-white">
          {{ initials }}
        </span>
      </div>
      <div>
        <h3 class="text-2xl font-bold">{{ employee.firstName }} {{ employee.lastName }}</h3>
        <p class="text-gray-600">{{ employee.position }} • {{ employee.department }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <p class="text-sm text-gray-500">Employee ID</p>
        <p class="font-semibold">{{ employee.employeeId }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Email</p>
        <p class="font-semibold">{{ employee.email }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Phone</p>
        <p class="font-semibold">{{ employee.phone }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-500">Status</p>
        <UBadge 
          :color="getStatusColor(employee.status)"
          :label="formatStatus(employee.status)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';

interface Props {
  employee: Employee;
}

const props = defineProps<Props>();

const initials = computed(() => 
  `${props.employee.firstName[0]}${props.employee.lastName[0]}`
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'green';
    case 'inactive': return 'red';
    case 'on-leave': return 'yellow';
    default: return 'gray';
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'on-leave': return 'On Leave';
    default: return status;
  }
};
</script>