<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Interview Schedule
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage interview slots and schedule candidates
        </p>
      </div>
      
      <div class="flex items-center space-x-3">
        <UButton
          icon="i-material-symbols:filter-list"
          variant="outline"
          @click="showFilters = !showFilters"
        >
          Filters
        </UButton>
        
        <UButton
          icon="i-material-symbols:add"
          color="primary"
          @click="openScheduleForm"
        >
          New Interview
        </UButton>
      </div>
    </div>

    <!-- Filters Panel -->
    <UCard
      v-if="showFilters"
      class="mb-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <UFormGroup label="Interviewer">
          <USelectMenu
            v-model="filters.interviewer"
            :options="interviewerOptions"
            placeholder="All interviewers"
            clearable
          />
        </UFormGroup>
        
        <UFormGroup label="Status">
          <USelectMenu
            v-model="filters.status"
            :options="statusOptions"
            placeholder="All statuses"
            clearable
          />
        </UFormGroup>
        
        <UFormGroup label="Interview Type">
          <USelectMenu
            v-model="filters.interviewType"
            :options="interviewTypeOptions"
            placeholder="All types"
            clearable
          />
        </UFormGroup>
        
        <div class="flex items-end">
          <UButton
            icon="i-material-symbols:clear"
            variant="outline"
            size="sm"
            @click="clearFilters"
          >
            Clear Filters
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Calendar Component -->
    <InterviewCalendar
      :events="calendarEvents"
      @create-interview="openScheduleForm"
      @event-click="handleEventClick"
      @date-select="handleDateSelect"
      @create-event-at="handleCreateEventAt"
    />

    <!-- Interview Schedule Form Modal -->
    <InterviewScheduleFormModal
      v-model="showScheduleForm"
      :editing-slot="editingSlot"
      :initial-date="selectedDate"
      :initial-time="selectedTime"
      @submit="handleCreateInterview"
      @update="handleUpdateInterview"
    />

    <!-- Interview Slot Details Modal -->
    <InterviewSlotDetails
      v-model="showSlotDetails"
      :slot="selectedSlot"
      @edit="handleEditSlot"
      @delete="handleDeleteSlot"
      @assign-candidate="handleAssignCandidate"
      @mark-completed="handleMarkCompleted"
      @cancel="handleCancelInterview"
    />

    <!-- Success Toast -->
    <div ref="toastContainer" />
  </div>
</template>

<script setup lang="ts">
import type { InterviewScheduleForm, InterviewSlot, CalendarEvent, InterviewFilters } from '~/types';
import InterviewCalendar from '~/components/interview/InterviewCalendar.vue';
import InterviewScheduleFormModal from '~/components/interview/InterviewScheduleForm.vue';
import InterviewSlotDetails from '~/components/interview/InterviewSlotDetails.vue';

// Composables
const { 
  interviewSlots, 
  isLoading, 
  createSlot, 
  updateSlot, 
  deleteSlot,
  slotsToCalendarEvents,
  getFilteredSlots
} = useInterviewSlots();

const toast = useToast();

// Reactive state
const showScheduleForm = ref(false);
const showSlotDetails = ref(false);
const showFilters = ref(false);
const editingSlot = ref<InterviewSlot | null>(null);
const selectedSlot = ref<InterviewSlot | null>(null);
const selectedDate = ref('');
const selectedTime = ref('09:00');

// Filters
const filters = reactive<InterviewFilters>({
  interviewer: '',
  status: undefined,
  interviewType: undefined
});

// Filter options
const interviewerOptions = [
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Mike Chen', value: 'Mike Chen' },
  { label: 'David Brown', value: 'David Brown' },
  { label: 'Lisa Wang', value: 'Lisa Wang' },
  { label: 'Jennifer Martinez', value: 'Jennifer Martinez' },
  { label: 'Robert Kim', value: 'Robert Kim' }
];

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Rescheduled', value: 'rescheduled' }
];

const interviewTypeOptions = [
  { label: 'Screening', value: 'screening' },
  { label: 'Technical', value: 'technical' },
  { label: 'Behavioral', value: 'behavioral' },
  { label: 'Final', value: 'final' },
  { label: 'Panel', value: 'panel' }
];

// Computed
const filteredSlots = computed(() => {
  return getFilteredSlots(filters);
});

const calendarEvents = computed(() => {
  return slotsToCalendarEvents(filteredSlots.value);
});

// Methods
const openScheduleForm = () => {
  editingSlot.value = null;
  showScheduleForm.value = true;
};

const handleEventClick = (event: CalendarEvent) => {
  selectedSlot.value = event.data;
  showSlotDetails.value = true;
};

const handleDateSelect = (date: string) => {
  selectedDate.value = date;
};

const handleCreateEventAt = (date: string, hour: number) => {
  selectedDate.value = date;
  selectedTime.value = `${hour.toString().padStart(2, '0')}:00`;
  openScheduleForm();
};

const handleCreateInterview = async (formData: InterviewScheduleForm) => {
  try {
    await createSlot(formData);
    toast.add({
      title: 'Interview Scheduled',
      description: 'The interview has been successfully scheduled.',
      color: 'success'
    });
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to schedule the interview. Please try again.',
      color: 'error'
    });
  }
};

const handleUpdateInterview = async (id: string, updates: Partial<InterviewSlot>) => {
  try {
    await updateSlot(id, updates);
    toast.add({
      title: 'Interview Updated',
      description: 'The interview has been successfully updated.',
      color: 'success'
    });
    selectedSlot.value = null;
    showSlotDetails.value = false;
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update the interview. Please try again.',
      color: 'error'
    });
  }
};

const handleEditSlot = (slot: InterviewSlot) => {
  editingSlot.value = slot;
  showSlotDetails.value = false;
  showScheduleForm.value = true;
};

const handleDeleteSlot = async (slot: InterviewSlot) => {
  if (confirm('Are you sure you want to delete this interview slot?')) {
    try {
      await deleteSlot(slot.id);
      toast.add({
        title: 'Interview Deleted',
        description: 'The interview slot has been deleted.',
        color: 'success'
      });
      showSlotDetails.value = false;
      selectedSlot.value = null;
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to delete the interview slot. Please try again.',
        color: 'error'
      });
    }
  }
};

const handleAssignCandidate = (slot: InterviewSlot) => {
  editingSlot.value = slot;
  showSlotDetails.value = false;
  showScheduleForm.value = true;
};

const handleMarkCompleted = async (slot: InterviewSlot) => {
  try {
    await updateSlot(slot.id, { status: 'completed' });
    toast.add({
      title: 'Interview Completed',
      description: 'The interview has been marked as completed.',
      color: 'success'
    });
    showSlotDetails.value = false;
    selectedSlot.value = null;
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update the interview status. Please try again.',
      color: 'error'
    });
  }
};

const handleCancelInterview = async (slot: InterviewSlot) => {
  if (confirm('Are you sure you want to cancel this interview?')) {
    try {
      await updateSlot(slot.id, { status: 'cancelled' });
      toast.add({
        title: 'Interview Cancelled',
        description: 'The interview has been cancelled.',
        color: 'warning'
      });
      showSlotDetails.value = false;
      selectedSlot.value = null;
    } catch (error) {
      toast.add({
        title: 'Error',
        description: 'Failed to cancel the interview. Please try again.',
        color: 'error'
      });
    }
  }
};

const clearFilters = () => {
  filters.interviewer = '';
  filters.status = undefined;
  filters.interviewType = undefined;
};

// Page metadata
definePageMeta({
  title: 'Interview Schedule'
});
</script>