<template>
  <LeaveCard title="Leave Calendar">
    <template #header-actions>
      <div class="flex items-center space-x-2">
        <UButton
          size="xs"
          variant="ghost"
          color="neutral"
          @click="goToToday"
        >
          Today
        </UButton>
        <div class="flex">
          <UButton
            variant="ghost"
            color="neutral"
            size="xs"
            icon="i-material-symbols:chevron-left"
            @click="previousMonth"
          />
          <UButton
            variant="ghost"
            color="neutral"
            size="xs"
            icon="i-material-symbols:chevron-right"
            @click="nextMonth"
          />
        </div>
      </div>
    </template>

    <div class="space-y-4">
      <!-- Month/Year Display -->
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ currentMonthYear }}
        </h3>
      </div>

      <!-- Calendar Grid -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <!-- Day Headers -->
        <div class="grid grid-cols-7 bg-gray-100 dark:bg-gray-800">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center py-2 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 divide-x divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            :class="getDayClass(day)"
            class="min-h-24 p-1 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            @click="handleDayClick(day)"
          >
            <!-- Day Number -->
            <div
              :class="[
                'text-xs font-medium mb-1',
                day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600',
                day.isToday ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
              ]"
            >
              {{ day.date.getDate() }}
            </div>

            <!-- Leave Markers -->
            <div class="space-y-1">
              <!-- Public Holiday -->
              <div
                v-if="day.holiday"
                class="text-xs px-1 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded truncate"
                :title="day.holiday.name"
              >
                <UIcon name="i-material-symbols:event" class="w-3 h-3 inline" />
                {{ day.holiday.name }}
              </div>

              <!-- Leaves -->
              <div
                v-for="leave in day.leaves"
                :key="leave.id"
                :class="getLeaveClass(leave)"
                class="text-xs px-1 py-0.5 rounded truncate cursor-pointer"
                :title="`${leave.type} - ${leave.reason}`"
                @click.stop="viewLeaveDetails(leave)"
              >
                <UIcon :name="getLeaveIcon(leave)" class="w-3 h-3 inline" />
                {{ leave.type }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-4 text-xs pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-green-500 rounded"></div>
          <span class="text-gray-600 dark:text-gray-400">Approved</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-amber-500 rounded bg-stripes"></div>
          <span class="text-gray-600 dark:text-gray-400">Pending</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-red-500 rounded opacity-50"></div>
          <span class="text-gray-600 dark:text-gray-400">Rejected</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <span class="text-gray-600 dark:text-gray-400">Public Holiday</span>
        </div>
      </div>
    </div>
  </LeaveCard>

  <!-- Leave Details Modal -->
  <UModal v-model="showLeaveModal">
    <UCard v-if="selectedLeave">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Leave Details</h3>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-material-symbols:close"
            size="xs"
            @click="showLeaveModal = false"
          />
        </div>
      </template>

      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <div class="mt-1">
            <UBadge :color="getStatusColor(selectedLeave.status)" size="sm">
              {{ selectedLeave.type }}
            </UBadge>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <div class="mt-1">
            <UBadge :color="getStatusColor(selectedLeave.status)" size="sm">
              {{ selectedLeave.status }}
            </UBadge>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
          <p class="mt-1 text-gray-900 dark:text-white">
            {{ formatDateRange(selectedLeave.startDate, selectedLeave.endDate) }}
            ({{ selectedLeave.duration }} {{ selectedLeave.duration === 1 ? 'day' : 'days' }})
          </p>
        </div>

        <div v-if="selectedLeave.isHalfDay">
          <UBadge color="info" size="xs">Half Day</UBadge>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
          <p class="mt-1 text-gray-900 dark:text-white">{{ selectedLeave.reason }}</p>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { useLeaveData } from '~/composables/useLeaveData';
import type { CalendarLeave } from '~/types/leave';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  leaves: CalendarLeave[];
  holiday: any;
}

const { filteredLeaves, publicHolidays } = useLeaveData();

const currentDate = ref(new Date());
const showLeaveModal = ref(false);
const selectedLeave = ref<CalendarLeave | null>(null);

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  const days: CalendarDay[] = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    
    days.push({
      date: new Date(current),
      isCurrentMonth: current.getMonth() === month,
      isToday: dateStr === new Date().toISOString().split('T')[0],
      leaves: filteredLeaves.value.filter(leave => {
        const leaveStart = new Date(leave.startDate);
        const leaveEnd = new Date(leave.endDate);
        return current >= leaveStart && current <= leaveEnd;
      }),
      holiday: publicHolidays.value.find(h => h.date === dateStr)
    });
    
    current.setDate(current.getDate() + 1);
  }
  
  return days;
});

const getDayClass = (day: CalendarDay) => {
  const classes = [];
  
  if (!day.isCurrentMonth) {
    classes.push('bg-gray-50 dark:bg-gray-900');
  }
  
  if (day.isToday) {
    classes.push('border-2 border-primary');
  }
  
  return classes.join(' ');
};

const getLeaveClass = (leave: CalendarLeave) => {
  const leaveType = leave.type.toLowerCase();
  
  let bgColor = 'bg-gray-500';
  if (leaveType.includes('annual')) bgColor = 'bg-green-500';
  else if (leaveType.includes('sick')) bgColor = 'bg-amber-500';
  else if (leaveType.includes('personal')) bgColor = 'bg-blue-500';
  
  const classes = [bgColor, 'text-white'];
  
  if (leave.status === 'Pending') {
    classes.push('bg-stripes');
  } else if (leave.status === 'Rejected') {
    classes.push('opacity-50 line-through');
  }
  
  if (leave.isHalfDay) {
    classes.push('border-l-4 border-white');
  }
  
  return classes.join(' ');
};

const getLeaveIcon = (leave: CalendarLeave) => {
  if (leave.isHalfDay) return 'i-material-symbols:schedule';
  return 'i-material-symbols:event';
};

const getStatusColor = (status: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  switch (status) {
    case 'Approved': return 'success';
    case 'Pending': return 'warning';
    case 'Rejected': return 'error';
    default: return 'neutral';
  }
};

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const goToToday = () => {
  currentDate.value = new Date();
};

const handleDayClick = (day: CalendarDay) => {
  if (day.leaves.length === 1 && day.leaves[0]) {
    viewLeaveDetails(day.leaves[0]);
  }
};

const viewLeaveDetails = (leave: CalendarLeave) => {
  selectedLeave.value = leave;
  showLeaveModal.value = true;
};

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  };
  
  if (startDate === endDate) {
    return start.toLocaleDateString('en-US', formatOptions);
  }
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
};
</script>

<style scoped>
.bg-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(255, 255, 255, 0.3) 5px,
    rgba(255, 255, 255, 0.3) 10px
  );
}
</style>
