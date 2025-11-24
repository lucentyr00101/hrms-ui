<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center gap-4">
      <UButton
        icon="i-material-symbols:arrow-back"
        color="neutral"
        variant="ghost"
        @click="handleCancel"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Create Leave Type
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Configure a new leave type for your organization
        </p>
      </div>
    </div>

    <LeaveTypeForm
      :mode="'create'"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useLeaveTypes } from '~/composables/useLeaveTypes';
import type { LeaveTypeFormData } from '~/types';
import LeaveTypeForm from '~/components/leave/LeaveTypeForm.vue';

const toast = useToast();
const { createLeaveType } = useLeaveTypes();

const handleSubmit = (data: LeaveTypeFormData) => {
  createLeaveType(data);
  toast.add({
    title: 'Success',
    description: 'Leave type created successfully',
    color: 'success'
  });
  navigateTo('/leave/types');
};

const handleCancel = () => {
  navigateTo('/leave/types');
};

definePageMeta({
  title: 'Create Leave Type'
});
</script>
