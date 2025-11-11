<template>
  <UModal v-model:open="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ isEditing ? 'Edit Interview Schedule' : 'Schedule New Interview' }}
      </h3>
    </template>

    <template #content>
      <UCard class="shadow-lg">
        <div class="space-y-8">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm uppercase tracking-wide text-primary-600 dark:text-primary-300 font-semibold">
                {{ isEditing ? 'Update details' : 'Quick scheduling' }}
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                Confirm the essentials below so candidates receive a clear, modern interview invite.
              </p>
            </div>
            <UBadge
              :color="isEditing ? 'orange' : 'primary'"
              variant="soft"
              class="w-fit self-start sm:self-auto"
            >
              <span class="flex items-center gap-2">
                <UIcon :name="isEditing ? 'i-material-symbols:edit' : 'i-material-symbols:add-task'" class="h-4 w-4" />
                {{ isEditing ? 'Editing existing slot' : 'New interview' }}
              </span>
            </UBadge>
          </div>

          <UForm
            :schema="interviewSchema"
            :state="formState"
            @submit="handleSubmit"
            class="space-y-10"
          >
            <!-- Candidate Selection -->
            <section class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="rounded-full bg-primary/10 text-primary p-2">
                  <UIcon name="i-material-symbols:badge" class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Candidate overview</p>
                  <p class="text-xs text-gray-500">Select who you are meeting with so invites route correctly.</p>
                </div>
              </div>

              <UFormField
                label="Candidate"
                name="candidateId"
                required
                class="w-full"
              >
                <USelectMenu
                  v-model="formState.candidateId"
                  :options="candidateOptions"
                  placeholder="Search name or role"
                  searchable
                  :loading="loadingCandidates"
                  class="w-full"
                />
              </UFormField>
            </section>

            <!-- Date and Time -->
            <section class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="rounded-full bg-primary/10 text-primary p-2">
                  <UIcon name="i-material-symbols:calendar-month" class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Schedule</p>
                  <p class="text-xs text-gray-500">Share the exact date and timeframe for the discussion.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4">
                <UFormField label="Date" name="date" required class="min-w-0 w-full">
                  <UInput
                    v-model="formState.date"
                    type="date"
                    :min="minDate"
                    class="w-full md:w-full"
                  />
                </UFormField>

                <UFormField label="Start Time" name="startTime" required class="w-full">
                  <UInput
                    v-model="formState.startTime"
                    type="time"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="End Time" name="endTime" required class="w-full">
                  <UInput
                    v-model="formState.endTime"
                    type="time"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </section>

            <!-- Interview Details -->
            <section class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="rounded-full bg-primary/10 text-primary p-2">
                  <UIcon name="i-material-symbols:groups-2" class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Interview format</p>
                  <p class="text-xs text-gray-500">Clarify the interview type and who will run it.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <UFormField label="Interview Type" name="interviewType" required class="min-w-0">
                  <USelectMenu
                    v-model="formState.interviewType"
                    :options="interviewTypeOptions"
                    placeholder="Select interview type"
                    class="w-full"
                  />
                </UFormField>

                <UFormField label="Interviewer" name="interviewer" required class="min-w-0">
                  <USelectMenu
                    v-model="formState.interviewer"
                    :options="interviewerOptions"
                    placeholder="Select interviewer"
                    searchable
                    class="w-full"
                  />
                </UFormField>
              </div>
            </section>

            <!-- Location & Notes -->
            <section class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="rounded-full bg-primary/10 text-primary p-2">
                  <UIcon name="i-material-symbols:explore" class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">Access details</p>
                  <p class="text-xs text-gray-500">Share how candidates should join and any prep notes.</p>
                </div>
              </div>

              <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 space-y-5 bg-gray-50/60 dark:bg-gray-900/40">
                <div class="flex flex-wrap gap-3">
                  <UButton
                    v-for="option in locationOptions"
                    :key="option.value"
                    type="button"
                    size="sm"
                    :color="locationType === option.value ? 'primary' : 'neutral'"
                    :variant="locationType === option.value ? 'solid' : 'soft'"
                    @click="locationType = option.value"
                  >
                    {{ option.label }}
                  </UButton>
                </div>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <Transition name="fade" mode="out-in">
                    <UFormField
                      v-if="locationType === 'in-person'"
                      key="in-person"
                      label="Physical Location"
                      name="location"
                      required
                      class="min-w-0"
                    >
                      <UInput
                        v-model="formState.location"
                        placeholder="Conference Room A, Building 1"
                        class="w-full"
                      />
                    </UFormField>
                    <UFormField
                      v-else
                      key="remote"
                      label="Meeting Link"
                      name="meetingLink"
                      required
                      class="min-w-0"
                    >
                      <UInput
                        v-model="formState.meetingLink"
                        placeholder="https://meet.google.com/abc-defg-hij"
                        class="w-full"
                      />
                    </UFormField>
                  </Transition>

                  <UFormField
                    label="Notes"
                    name="notes"
                    class="md:col-span-2"
                  >
                    <UTextarea
                      v-model="formState.notes"
                      placeholder="Share panel details, preparation steps, or quick reminders."
                      rows="4"
                      class="w-full"
                    />
                  </UFormField>
                </div>
              </div>

              <UAlert
                v-if="hasTimeConflict"
                icon="i-material-symbols:warning"
                color="yellow"
                variant="soft"
                title="Scheduling conflict"
              >
                There is already an interview scheduled at this time. Please choose a different slot.
              </UAlert>
            </section>

            <!-- Form Actions -->
            <div class="flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-end">
              <UButton
                type="button"
                color="neutral"
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
      </UCard>
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
const locationOptions = [
  { label: 'In-person', value: 'in-person' as const },
  { label: 'Remote', value: 'remote' as const }
];

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
  const endHour = hours + 1;
  return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
