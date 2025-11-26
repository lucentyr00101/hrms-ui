<template>
  <UCard class="shadow-md hover:shadow-lg transition-shadow duration-200">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <slot name="header-actions"/>
      </div>
    </template>

    <slot/>

    <template v-if="$slots.footer" #footer>
      <slot name="footer"/>
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
