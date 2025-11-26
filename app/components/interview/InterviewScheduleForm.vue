<template>
  <UModal v-model:open="isOpen" class="sm:max-w-2xl">
    <template #content>
      <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ isEditing ? 'Edit Interview' : 'Schedule New Interview' }}
        </h3>
        <UButton
          icon="i-material-symbols:close"
          variant="ghost"
          size="sm"
          @click="closeModal"
        />
      </div>

      <UForm
        :schema="interviewSchema"
        :state="formState"
        class="space-y-6"
        @submit="handleSubmit"
      >
        <!-- Candidate Selection -->
        <UFormGroup
          label="Candidate"
          name="candidateId"
          required
        >
          <USelectMenu
            v-model="formState.candidateId"
            :options="candidateOptions"
            placeholder="Select a candidate"
            searchable
            :loading="loadingCandidates"
          />
        </UFormGroup>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UFormGroup
            label="Date"
            name="date"
            required
          >
            <UInput
              v-model="formState.date"
              type="date"
              :min="minDate"
            />
          </UFormGroup>

          <UFormGroup
            label="Start Time"
            name="startTime"
            required
          >
            <UInput
              v-model="formState.startTime"
              type="time"
            />
          </UFormGroup>

          <UFormGroup
            label="End Time"
            name="endTime"
            required
          >
            <UInput
              v-model="formState.endTime"
              type="time"
            />
          </UFormGroup>
        </div>

        <!-- Interview Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormGroup
            label="Interview Type"
            name="interviewType"
            required
          >
            <USelectMenu
              v-model="formState.interviewType"
              :options="interviewTypeOptions"
              placeholder="Select interview type"
            />
          </UFormGroup>

          <UFormGroup
            label="Interviewer"
            name="interviewer"
            required
          >
            <USelectMenu
              v-model="formState.interviewer"
              :options="interviewerOptions"
              placeholder="Select interviewer"
              searchable
            />
          </UFormGroup>
        </div>

        <!-- Location Options -->
        <UFormGroup label="Location">
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <URadio
                v-model="locationType"
                value="in-person"
                label="In-person"
              />
              <URadio
                v-model="locationType"
                value="remote"
                label="Remote"
              />
            </div>

            <UInput
              v-if="locationType === 'in-person'"
              v-model="formState.location"
              placeholder="Conference Room A, Building 1"
            />

            <UInput
              v-if="locationType === 'remote'"
              v-model="formState.meetingLink"
              placeholder="https://meet.google.com/abc-defg-hij"
            />
          </div>
        </UFormGroup>

        <!-- Notes -->
        <UFormGroup
          label="Notes"
          name="notes"
        >
          <UTextarea
            v-model="formState.notes"
            placeholder="Additional notes or instructions for the interview..."
            :rows="3"
          />
        </UFormGroup>

        <!-- Conflict Warning -->
        <UAlert
          v-if="hasTimeConflict"
          icon="i-material-symbols:warning"
          color="warning"
          variant="soft"
          title="Scheduling Conflict"
          description="There is already an interview scheduled at this time. Please choose a different time slot."
        />

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <UButton
            variant="ghost"
            @click="closeModal"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            :loading="isSubmitting"
            :disabled="hasTimeConflict"
          >
            {{ isEditing ? 'Update Interview' : 'Schedule Interview' }}
          </UButton>
        </div>
      </UForm>
    </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { InterviewScheduleForm, InterviewSlot } from '~/types';
import { interviewScheduleSchema } from '~/schemas/interview';

interface Props {
  modelValue: boolean;
  editingSlot?: InterviewSlot | null;
  initialDate?: string;
  initialTime?: string;
}

const props = withDefaults(defineProps<Props>(), {
  editingSlot: null,
  initialDate: '',
  initialTime: '09:00'
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'submit': [data: InterviewScheduleForm];
  'update': [id: string, data: Partial<InterviewSlot>];
}>();

// Composables
const { hasConflict } = useInterviewSlots();
const { candidates } = useCandidates();

// Reactive state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const isEditing = computed(() => Boolean(props.editingSlot));
const isSubmitting = ref(false);
const loadingCandidates = ref(false);
const locationType = ref<'in-person' | 'remote'>('in-person');

// Form state
const formState = reactive<InterviewScheduleForm>({
  candidateId: '',
  date: '',
  startTime: '',
  endTime: '',
  interviewer: '',
  interviewType: 'screening',
  location: '',
  notes: '',
  meetingLink: ''
});

// Validation schema
const interviewSchema = interviewScheduleSchema;

// Computed properties
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const candidateOptions = computed(() => {
  return candidates.value.map(candidate => ({
    label: `${candidate.firstName} ${candidate.lastName} - ${candidate.position}`,
    value: candidate.id
  }));
});

const interviewTypeOptions = [
  { label: 'Screening', value: 'screening' },
  { label: 'Technical', value: 'technical' },
  { label: 'Behavioral', value: 'behavioral' },
  { label: 'Final', value: 'final' },
  { label: 'Panel', value: 'panel' }
];

const interviewerOptions = [
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Mike Chen', value: 'Mike Chen' },
  { label: 'David Brown', value: 'David Brown' },
  { label: 'Lisa Wang', value: 'Lisa Wang' },
  { label: 'Jennifer Martinez', value: 'Jennifer Martinez' },
  { label: 'Robert Kim', value: 'Robert Kim' }
];

const hasTimeConflict = computed(() => {
  if (!formState.date || !formState.startTime || !formState.endTime) {
    return false;
  }
  
  const excludeId = props.editingSlot?.id;
  return hasConflict(formState.date, formState.startTime, formState.endTime, excludeId);
});

// Methods
const getDefaultEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endHour = (hours ?? 0) + 1;
  return `${endHour.toString().padStart(2, '0')}:${(minutes ?? 0).toString().padStart(2, '0')}`;
};

const resetForm = () => {
  Object.assign(formState, {
    candidateId: '',
    date: props.initialDate || '',
    startTime: props.initialTime || '09:00',
    endTime: getDefaultEndTime(props.initialTime || '09:00'),
    interviewer: '',
    interviewType: 'screening',
    location: '',
    notes: '',
    meetingLink: ''
  });
  
  locationType.value = 'in-person';
};

const populateFormFromSlot = (slot: InterviewSlot) => {
  Object.assign(formState, {
    candidateId: slot.candidateId || '',
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    interviewer: slot.interviewer,
    interviewType: slot.interviewType,
    location: slot.location || '',
    notes: slot.notes || '',
    meetingLink: slot.meetingLink || ''
  });
  
  locationType.value = slot.meetingLink ? 'remote' : 'in-person';
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  try {
    const submitData = { ...formState };
    
    // Clear location or meetingLink based on location type
    if (locationType.value === 'remote') {
      submitData.location = '';
    } else {
      submitData.meetingLink = '';
    }
    
    if (isEditing.value && props.editingSlot) {
      emit('update', props.editingSlot.id, submitData);
    } else {
      emit('submit', submitData);
    }
    
    closeModal();
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  emit('update:modelValue', false);
  setTimeout(() => {
    if (!props.editingSlot) {
      resetForm();
    }
  }, 300);
};

// Watchers
watch(() => props.editingSlot, (slot) => {
  if (slot) {
    populateFormFromSlot(slot);
  } else {
    resetForm();
  }
}, { immediate: true });

watch(() => props.initialDate, (date) => {
  if (date && !props.editingSlot) {
    formState.date = date;
  }
});

watch(() => props.initialTime, (time) => {
  if (time && !props.editingSlot) {
    formState.startTime = time;
    formState.endTime = getDefaultEndTime(time);
  }
});

// Initialize form
onMounted(() => {
  if (props.editingSlot) {
    populateFormFromSlot(props.editingSlot);
  } else {
    resetForm();
  }
});
</script>