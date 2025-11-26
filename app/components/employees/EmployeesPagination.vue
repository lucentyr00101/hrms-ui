<template>
  <div v-if="totalPages > 1" class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
    <div class="text-sm text-gray-700 dark:text-gray-300">
      Showing {{ startIndex }} to {{ endIndex }} of {{ totalItems }} employees
    </div>
    
    <UPagination
      :model-value="currentPage"
      :page-count="itemsPerPage"
      :total="totalItems"
      :ui="{
        list: 'flex items-center gap-1',
        item: '!rounded-full min-w-[32px] justify-center'
      }"
      show-last
      show-first
      @update:model-value="$emit('pageChange', $event)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

const props = defineProps<Props>();

const _emit = defineEmits<{
  pageChange: [page: number];
}>();

const startIndex = computed(() => 
  (props.currentPage - 1) * props.itemsPerPage + 1
);

const endIndex = computed(() => 
  Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
);
</script>