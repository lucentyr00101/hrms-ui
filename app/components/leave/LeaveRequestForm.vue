<template>
  <UForm 
    :schema="leaveRequestSchema" 
    :state="formState" 
    class="space-y-6"
    @submit="handleSubmit"
  >
    <!-- Leave Type Selection -->
    <UFormField label="Leave Type" name="leaveTypeId" required>
      <USelect
        v-model="formState.leaveTypeId"
        :options="availableLeaveTypes"
        placeholder="Select leave type"
        option-attribute="label"
        value-attribute="value"
        class="min-w-full"
      >
        <template #trailing>
          <span v-if="selectedBalance" class="text-xs text-gray-500">
            {{ selectedBalance.available }} days left
          </span>
        </template>
      </USelect>
    </UFormField>

    <!-- Date Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormField label="Start Date" name="startDate" required :error="startDateError">
        <UInput 
          v-model="formState.startDate" 
          type="date" 
          :min="minDate"
          class="min-w-full"
          @change="validateDates"
        />
      </UFormField>

      <UFormField label="End Date" name="endDate" required :error="endDateError">
        <UInput 
          v-model="formState.endDate" 
          type="date"
          :min="formState.startDate || minDate"
          class="min-w-full"
          @change="validateDates"
        />
      </UFormField>
    </div>

    <!-- Days Summary -->
    <div v-if="totalDays > 0" class="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-material-symbols:calendar-today" class="w-5 h-5 text-primary-600" />
          <span class="font-medium text-gray-900 dark:text-white">
            Total Leave Days
          </span>
        </div>
        <span class="text-2xl font-bold text-primary-600">
          {{ totalDays }} {{ totalDays === 1 ? 'day' : 'days' }}
        </span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ formattedDateRange }}
        <span class="text-gray-400">(weekends excluded)</span>
      </p>
    </div>

    <!-- Date Range Validation Error -->
    <UAlert 
      v-if="dateRangeError" 
      color="error" 
      icon="i-material-symbols:error"
      :title="dateRangeError"
    />

    <!-- Reason -->
    <UFormField label="Reason (Optional)" name="reason">
      <UTextarea 
        v-model="formState.reason" 
        placeholder="Briefly describe the reason for your leave..."
        :rows="3"
        class="min-w-full"
      />
    </UFormField>

    <!-- File Upload -->
    <UFormField label="Supporting Documents (Optional)" name="files">
      <template #help>
        Accepted formats: PDF, JPEG, PNG, DOC, DOCX. Max 5MB per file, 20MB total.
      </template>

      <div class="space-y-3">
        <!-- Upload Area -->
        <div 
          v-if="uploadedFiles.length < 5"
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
          :class="{ 'border-primary-500 bg-primary-50 dark:bg-primary-900/20': isDragging }"
          @click="triggerFileInput"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <UIcon name="i-material-symbols:cloud-upload" class="w-10 h-10 mx-auto text-gray-400" />
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium text-primary-600">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 mt-1">
            Max {{ 5 - uploadedFiles.length }} more file(s)
          </p>
        </div>

        <input 
          ref="fileInput"
          type="file"
          multiple
          :accept="acceptedFileTypes"
          class="hidden"
          @change="handleFileSelect"
        >

        <!-- Uploaded Files List -->
        <div v-if="uploadedFiles.length > 0" class="space-y-2">
          <div 
            v-for="(uploadedFile, index) in uploadedFiles" 
            :key="index"
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <UIcon 
              :name="getFileIcon(uploadedFile.file.type)" 
              class="w-8 h-8 text-gray-500"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ uploadedFile.file.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatFileSize(uploadedFile.file.size) }}
              </p>
              <!-- Progress bar -->
              <div v-if="uploadedFile.progress < 100 && !uploadedFile.error" class="mt-1">
                <UProgress :value="uploadedFile.progress" size="xs" color="primary" />
              </div>
              <!-- Error message -->
              <p v-if="uploadedFile.error" class="text-xs text-red-500 mt-1">
                {{ uploadedFile.error }}
              </p>
            </div>
            <UButton
              color="error"
              variant="ghost"
              icon="i-material-symbols:close"
              size="xs"
              @click="removeFile(index)"
            />
          </div>
        </div>

        <!-- Total Size Warning -->
        <UAlert 
          v-if="totalSizeError" 
          color="warning" 
          icon="i-material-symbols:warning"
          :title="totalSizeError"
        />
      </div>
    </UFormField>

    <!-- Form Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <UButton 
        color="neutral" 
        variant="outline" 
        @click="emit('cancel')"
      >
        Cancel
      </UButton>
      <UButton 
        type="submit" 
        color="primary"
        :loading="isSubmitting"
        :disabled="!isFormValid"
      >
        Submit Request
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import { leaveRequestSchema } from '~/schemas/leave-request';
import { useLeaveRequest } from '~/composables/useLeaveRequest';
import { FILE_UPLOAD_CONFIG } from '~/constants/leave-request';
import type { LeaveRequestSubmission } from '~/types';

const emit = defineEmits<{
  cancel: [];
  submit: [submission: LeaveRequestSubmission];
}>();

const {
  availableLeaveTypes,
  getLeaveBalance,
  isSubmitting,
  uploadedFiles,
  validateStartDate,
  validateEndDate,
  validateDateRange,
  validateTotalSize,
  addFile,
  removeFile,
  calculateWeekdays,
  formatDate,
  submitLeaveRequest,
  clearFiles
} = useLeaveRequest();

// Form state
const formState = reactive({
  leaveTypeId: '',
  startDate: '',
  endDate: '',
  reason: '',
  files: [] as File[]
});

// UI state
const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

// Validation errors
const startDateError = ref<string | undefined>();
const endDateError = ref<string | undefined>();
const dateRangeError = ref<string | undefined>();
const totalSizeError = ref<string | undefined>();

// Computed values
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const selectedBalance = computed(() => {
  if (!formState.leaveTypeId) return null;
  return getLeaveBalance(formState.leaveTypeId);
});

const totalDays = computed(() => {
  if (!formState.startDate || !formState.endDate) return 0;
  const start = new Date(formState.startDate);
  const end = new Date(formState.endDate);
  if (end < start) return 0;
  return calculateWeekdays(start, end);
});

const formattedDateRange = computed(() => {
  if (!formState.startDate || !formState.endDate) return '';
  return `${formatDate(formState.startDate)} - ${formatDate(formState.endDate)}`;
});

const acceptedFileTypes = computed(() => FILE_UPLOAD_CONFIG.acceptedTypes.join(','));

const isFormValid = computed(() => {
  return (
    formState.leaveTypeId &&
    formState.startDate &&
    formState.endDate &&
    !startDateError.value &&
    !endDateError.value &&
    !dateRangeError.value &&
    totalDays.value > 0
  );
});

// Validate dates
const validateDates = () => {
  // Validate start date
  const startValidation = validateStartDate(formState.startDate);
  startDateError.value = startValidation.error;

  // Validate end date
  const endValidation = validateEndDate(formState.startDate, formState.endDate);
  endDateError.value = endValidation.error;

  // Validate date range if both dates are valid
  if (startValidation.isValid && endValidation.isValid && formState.leaveTypeId) {
    const rangeValidation = validateDateRange(
      formState.leaveTypeId,
      formState.startDate,
      formState.endDate
    );
    dateRangeError.value = rangeValidation.error;
  } else {
    dateRangeError.value = undefined;
  }
};

// Watch for changes that require revalidation
watch(() => formState.leaveTypeId, validateDates);
watch(() => formState.startDate, validateDates);
watch(() => formState.endDate, validateDates);

// Watch uploaded files for total size validation
watch(uploadedFiles, (files) => {
  const validFiles = files.filter(f => !f.error).map(f => f.file);
  const validation = validateTotalSize(validFiles);
  totalSizeError.value = validation.error;
}, { deep: true });

// File handling
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    for (const file of Array.from(input.files)) {
      await addFile(file);
    }
  }
  // Reset input
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleDrop = async (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files) {
    for (const file of Array.from(files)) {
      await addFile(file);
    }
  }
};

const getFileIcon = (mimeType: string): string => {
  if (mimeType === 'application/pdf') return 'i-material-symbols:picture-as-pdf';
  if (mimeType.startsWith('image/')) return 'i-material-symbols:image';
  if (mimeType.includes('word')) return 'i-material-symbols:description';
  return 'i-material-symbols:attach-file';
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// Submit handler
const handleSubmit = async () => {
  if (!isFormValid.value) return;

  try {
    const submission = await submitLeaveRequest(
      formState.leaveTypeId,
      formState.startDate,
      formState.endDate,
      formState.reason
    );

    emit('submit', submission);
  } catch (error) {
    console.error('Failed to submit leave request:', error);
  }
};

// Reset form
const resetForm = () => {
  formState.leaveTypeId = '';
  formState.startDate = '';
  formState.endDate = '';
  formState.reason = '';
  formState.files = [];
  clearFiles();
  startDateError.value = undefined;
  endDateError.value = undefined;
  dateRangeError.value = undefined;
  totalSizeError.value = undefined;
};

defineExpose({ resetForm });
</script>
