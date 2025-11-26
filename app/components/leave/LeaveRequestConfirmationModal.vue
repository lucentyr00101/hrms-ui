<template>
  <UModal 
    v-model:open="isOpen" 
    :dismiss="false"
    @close="handleClose"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <UIcon 
            name="i-material-symbols:check-circle" 
            class="w-6 h-6 text-green-600 dark:text-green-400"
          />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Leave Request Submitted Successfully
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Your request has been sent for approval
          </p>
        </div>
      </div>
    </template>

    <template #default>
      <div v-if="submission" class="space-y-6">
        <!-- Reference Number -->
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Reference Number</p>
          <p class="text-xl font-bold text-primary-600 dark:text-primary-400 font-mono">
            {{ submission.id }}
          </p>
        </div>

        <!-- Request Summary -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Request Summary
          </h4>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Leave Type</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ submission.leaveTypeName }}
              </p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Total Days</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ submission.totalDays }} {{ submission.totalDays === 1 ? 'day' : 'days' }}
              </p>
            </div>
            
            <div class="col-span-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">Date Range</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ formatDate(submission.startDate) }} - {{ formatDate(submission.endDate) }}
              </p>
            </div>

            <div v-if="submission.reason" class="col-span-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">Reason</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ submission.reason }}
              </p>
            </div>
          </div>
        </div>

        <!-- Attached Files -->
        <div v-if="submission.files && submission.files.length > 0" class="space-y-2">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Attached Files
          </h4>
          <div class="space-y-1">
            <div 
              v-for="(file, index) in submission.files" 
              :key="index"
              class="flex items-center gap-2 text-sm"
            >
              <UIcon name="i-material-symbols:attach-file" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-700 dark:text-gray-300">{{ file.name }}</span>
              <span class="text-gray-400 text-xs">({{ formatFileSize(file.size) }})</span>
            </div>
          </div>
        </div>

        <!-- Submission Time -->
        <p class="text-xs text-gray-400 text-center">
          Submitted on {{ formatDateTime(submission.submittedAt) }}
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        <UButton 
          color="neutral" 
          variant="outline"
          @click="handleClose"
        >
          Close
        </UButton>
        <UButton 
          color="primary"
          @click="handleSubmitAnother"
        >
          Submit Another Request
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LeaveRequestSubmission } from '~/types';

interface Props {
  open: boolean;
  submission: LeaveRequestSubmission | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  close: [];
  submitAnother: [];
}>();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const handleClose = () => {
  emit('close');
  emit('update:open', false);
};

const handleSubmitAnother = () => {
  emit('submitAnother');
  emit('update:open', false);
};
</script>
