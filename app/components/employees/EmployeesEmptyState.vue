<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div class="text-center py-12">
      <UIcon 
        name="i-material-symbols:emoji-people" 
        class="w-16 h-16 mx-auto text-gray-400 mb-4" 
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ description }}
      </p>
      <div class="flex justify-center gap-3">
        <UButton
          v-if="showClearFilters"
          color="neutral"
          variant="outline"
          @click="$emit('clearFilters')"
        >
          Clear Filters
        </UButton>
        <UButton 
          color="primary"
          @click="$emit('addEmployee')"
        >
          <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
          Add Employee
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hasFiltersApplied: boolean;
}

const props = defineProps<Props>();

const _emit = defineEmits<{
  clearFilters: [];
  addEmployee: [];
}>();

const title = computed(() => 
  props.hasFiltersApplied 
    ? 'No employees match your criteria' 
    : 'No employees found'
);

const description = computed(() => 
  props.hasFiltersApplied 
    ? 'Try adjusting your search query or filters.' 
    : 'Get started by adding your first employee.'
);

const showClearFilters = computed(() => props.hasFiltersApplied);
</script>