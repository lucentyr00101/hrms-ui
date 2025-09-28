<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <div class="text-sm text-gray-500 dark:text-gray-400">
      {{ employeeCount }} {{ employeeCount === 1 ? 'employee' : 'employees' }} found
      {{ showPageInfo ? `(Page ${currentPage} of ${totalPages})` : '' }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  employeeCount: number;
  currentPage?: number;
  totalPages?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Employees',
  description: 'Manage your organization\'s employees and their information.',
  currentPage: 1,
  totalPages: 1,
});

const showPageInfo = computed(() => props.totalPages > 1);
</script>