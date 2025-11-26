<template>
  <UCard 
    class="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <USelectMenu
          v-if="showPeriodSelector"
          v-model="selectedPeriod"
          :options="periodOptions"
          class="w-24"
          size="xs"
          @change="$emit('period-change', selectedPeriod)"
        />
      </div>
    </template>

    <div class="space-y-4">
      <slot />
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  showPeriodSelector?: boolean;
  defaultPeriod?: 'week' | 'month' | 'year';
}

const props = withDefaults(defineProps<Props>(), {
  showPeriodSelector: false,
  defaultPeriod: 'week'
});

const _emit = defineEmits<{
  'period-change': [period: string];
}>();

const selectedPeriod = ref(props.defaultPeriod);

const periodOptions = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' }
];
</script>