<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <UButton
        color="primary"
        size="lg"
        block
        icon="i-material-symbols:add-circle"
        @click="openLeaveRequestModal"
      >
        Request Leave
      </UButton>

      <UButton
        color="neutral"
        variant="soft"
        size="lg"
        block
        icon="i-material-symbols:history"
      >
        View Leave History
      </UButton>

      <UButton
        color="neutral"
        variant="soft"
        size="lg"
        block
        icon="i-material-symbols:download"
      >
        Download Summary
      </UButton>

      <UButton
        color="neutral"
        variant="soft"
        size="lg"
        block
        icon="i-material-symbols:description"
      >
        Leave Policy
      </UButton>
    </div>

    <!-- Leave Request Modal -->
    <UModal v-model:open="isLeaveRequestModalOpen" :dismiss="false">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
            <UIcon 
              name="i-material-symbols:add-circle" 
              class="w-5 h-5 text-primary-600 dark:text-primary-400"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Request Leave
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Submit a new leave request
            </p>
          </div>
        </div>
      </template>

      <template #content>
        <UCard>
          <LeaveRequestForm 
            ref="leaveRequestFormRef"
            @cancel="closeLeaveRequestModal" 
            @submit="handleLeaveRequestSubmit"
          />
        </UCard>
      </template>
    </UModal>

    <!-- Confirmation Modal -->
    <LeaveRequestConfirmationModal
      v-model:open="isConfirmationModalOpen"
      :submission="lastSubmission"
      @close="handleConfirmationClose"
      @submit-another="handleSubmitAnother"
    />
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LeaveRequestSubmission } from '~/types';

const isLeaveRequestModalOpen = ref(false);
const isConfirmationModalOpen = ref(false);
const lastSubmission = ref<LeaveRequestSubmission | null>(null);
const leaveRequestFormRef = ref<{ resetForm: () => void } | null>(null);

const openLeaveRequestModal = () => {
  isLeaveRequestModalOpen.value = true;
};

const closeLeaveRequestModal = () => {
  isLeaveRequestModalOpen.value = false;
};

const handleLeaveRequestSubmit = (submission: LeaveRequestSubmission) => {
  lastSubmission.value = submission;
  isLeaveRequestModalOpen.value = false;
  isConfirmationModalOpen.value = true;
};

const handleConfirmationClose = () => {
  isConfirmationModalOpen.value = false;
};

const handleSubmitAnother = () => {
  isConfirmationModalOpen.value = false;
  leaveRequestFormRef.value?.resetForm();
  isLeaveRequestModalOpen.value = true;
};
</script>
