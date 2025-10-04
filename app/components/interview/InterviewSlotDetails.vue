<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-lg' }">
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Interview Details
        </h3>
        <UButton
          icon="i-material-symbols:close"
          variant="ghost"
          size="sm"
          @click="closeModal"
        />
      </div>

      <div v-if="slot" class="space-y-6">
        <!-- Status Badge -->
        <div class="flex items-center justify-between">
          <UBadge
            :color="getStatusColor(slot.status)"
            :label="getStatusLabel(slot.status)"
            size="lg"
          />
          <UDropdown :items="actionItems">
            <UButton
              icon="i-material-symbols:more-vert"
              variant="ghost"
              size="sm"
            />
          </UDropdown>
        </div>

        <!-- Candidate Information -->
        <div v-if="slot.candidateId" class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Candidate
          </h4>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <UIcon name="i-material-symbols:person" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ slot.candidateName }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ slot.position }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Slot Info -->
        <div v-else class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Available Slot
          </h4>
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <UIcon name="i-material-symbols:event-available" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  Open Interview Slot
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Ready for candidate assignment
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interview Details -->
        <div class="space-y-4">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Interview Details
          </h4>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Date
              </label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">
                {{ formatDate(slot.date) }}
              </p>
            </div>
            
            <div>
              <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Time
              </label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">
                {{ formatTime(slot.startTime) }} - {{ formatTime(slot.endTime) }}
              </p>
            </div>
            
            <div>
              <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Type
              </label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">
                {{ getInterviewTypeLabel(slot.interviewType) }}
              </p>
            </div>
            
            <div>
              <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Interviewer
              </label>
              <p class="mt-1 text-sm text-gray-900 dark:text-white">
                {{ slot.interviewer }}
              </p>
            </div>
          </div>
        </div>

        <!-- Location/Meeting Link -->
        <div v-if="slot.location || slot.meetingLink" class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            {{ slot.meetingLink ? 'Meeting Link' : 'Location' }}
          </h4>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div class="flex items-center space-x-3">
              <UIcon 
                :name="slot.meetingLink ? 'i-material-symbols:videocam' : 'i-material-symbols:location-on'"
                class="w-5 h-5 text-gray-600 dark:text-gray-400"
              />
              <div class="flex-1">
                <p v-if="slot.location" class="text-sm text-gray-900 dark:text-white">
                  {{ slot.location }}
                </p>
                <a 
                  v-if="slot.meetingLink"
                  :href="slot.meetingLink"
                  target="_blank"
                  class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {{ slot.meetingLink }}
                </a>
              </div>
              <UButton
                v-if="slot.meetingLink"
                icon="i-material-symbols:open-in-new"
                variant="ghost"
                size="sm"
                @click="openMeetingLink"
              />
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="slot.notes" class="space-y-3">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Notes
          </h4>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
              {{ slot.notes }}
            </p>
          </div>
        </div>

        <!-- Timestamps -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div>
              <span class="font-medium">Created:</span>
              {{ formatDateTime(slot.createdAt) }}
            </div>
            <div>
              <span class="font-medium">Updated:</span>
              {{ formatDateTime(slot.updatedAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import type { InterviewSlot, InterviewStatus, InterviewType } from '~/types';

interface Props {
  modelValue: boolean;
  slot: InterviewSlot | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'edit': [slot: InterviewSlot];
  'delete': [slot: InterviewSlot];
  'assign-candidate': [slot: InterviewSlot];
  'mark-completed': [slot: InterviewSlot];
  'cancel': [slot: InterviewSlot];
}>();

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const actionItems = computed(() => {
  if (!props.slot) return [];
  
  const items = [];
  
  items.push([
    {
      label: 'Edit Interview',
      icon: 'i-material-symbols:edit',
      click: () => emit('edit', props.slot!)
    }
  ]);
  
  if (!props.slot.candidateId) {
    items.push([
      {
        label: 'Assign Candidate',
        icon: 'i-material-symbols:person-add',
        click: () => emit('assign-candidate', props.slot!)
      }
    ]);
  }
  
  if (props.slot.status === 'scheduled') {
    items.push([
      {
        label: 'Mark as Completed',
        icon: 'i-material-symbols:check-circle',
        click: () => emit('mark-completed', props.slot!)
      },
      {
        label: 'Cancel Interview',
        icon: 'i-material-symbols:cancel',
        click: () => emit('cancel', props.slot!)
      }
    ]);
  }
  
  items.push([
    {
      label: 'Delete Slot',
      icon: 'i-material-symbols:delete',
      click: () => emit('delete', props.slot!)
    }
  ]);
  
  return items;
});

// Methods
const closeModal = () => {
  emit('update:modelValue', false);
};

const getStatusColor = (status: InterviewStatus): string => {
  const colors = {
    pending: 'gray',
    scheduled: 'blue',
    completed: 'green',
    cancelled: 'red',
    rejected: 'red',
    rescheduled: 'yellow'
  };
  return colors[status] || 'gray';
};

const getStatusLabel = (status: InterviewStatus): string => {
  const labels = {
    pending: 'Pending',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    rescheduled: 'Rescheduled'
  };
  return labels[status] || status;
};

const getInterviewTypeLabel = (type: InterviewType): string => {
  const labels = {
    screening: 'Screening',
    technical: 'Technical',
    behavioral: 'Behavioral',
    final: 'Final Interview',
    panel: 'Panel Interview'
  };
  return labels[type] || type;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatTime = (timeStr: string): string => {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const formatDateTime = (dateTimeStr: string): string => {
  const date = new Date(dateTimeStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

const openMeetingLink = () => {
  if (props.slot?.meetingLink) {
    window.open(props.slot.meetingLink, '_blank');
  }
};
</script>