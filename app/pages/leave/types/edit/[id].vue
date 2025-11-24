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
          Edit Leave Type
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Update leave type configuration
        </p>
      </div>
    </div>

    <div v-if="!leaveType" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">Leave type not found</p>
      <UButton color="primary" class="mt-4" @click="handleCancel">
        Back to List
      </UButton>
    </div>

    <LeaveTypeForm
      v-else
      :mode="'edit'"
      :initial-data="leaveType"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useLeaveTypes } from '~/composables/useLeaveTypes';
import type { LeaveTypeFormData } from '~/types';
import LeaveTypeForm from '~/components/leave/LeaveTypeForm.vue';

const route = useRoute();
const toast = useToast();
const { getLeaveTypeById, updateLeaveType } = useLeaveTypes();

const leaveTypeId = route.params.id as string;
const leaveType = getLeaveTypeById(leaveTypeId);

const handleSubmit = (data: LeaveTypeFormData) => {
  const updated = updateLeaveType(leaveTypeId, data);
  if (updated) {
    toast.add({
      title: 'Success',
      description: 'Leave type updated successfully',
      color: 'success'
    });
    navigateTo('/leave/types');
  } else {
    toast.add({
      title: 'Error',
      description: 'Failed to update leave type',
      color: 'error'
    });
  }
};

const handleCancel = () => {
  navigateTo('/leave/types');
};

definePageMeta({
  title: 'Edit Leave Type'
});
</script>
