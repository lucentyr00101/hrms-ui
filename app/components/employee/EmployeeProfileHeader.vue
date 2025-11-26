<template>
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <UButton variant="outline" @click="$emit('back')">
      ← Back to Employees
    </UButton>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Employee Details'
});

defineEmits<{
  back: [];
}>();
</script>