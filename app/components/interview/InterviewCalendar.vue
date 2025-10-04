<template>
  <div class="interview-calendar">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
          {{ formatHeaderDate(currentDate) }}
        </h2>
        <div class="flex items-center space-x-2">
          <UButton
            icon="i-material-symbols:chevron-left"
            variant="ghost"
            size="sm"
            @click="navigateDate(-1)"
          />
          <UButton
            icon="i-material-symbols:chevron-right"
            variant="ghost"
            size="sm"
            @click="navigateDate(1)"
          />
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <UButton
          variant="ghost"
          size="sm"
          @click="goToToday"
        >
          Today
        </UButton>
        
        <USelectMenu
          v-model="currentView"
          :options="viewOptions"
          class="w-32"
        />
        
        <UButton
          icon="i-material-symbols:add"
          color="primary"
          @click="$emit('create-interview')"
        >
          New Interview
        </UButton>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Month View -->
      <div v-if="currentView === 'month'" class="calendar-month">
        <!-- Day Headers -->
        <div class="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          <div 
            v-for="day in dayHeaders" 
            :key="day"
            class="p-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-center bg-gray-50 dark:bg-gray-700"
          >
            {{ day }}
          </div>
        </div>
        
        <!-- Calendar Days -->
        <div class="grid grid-cols-7">
          <div
            v-for="(day, index) in calendarDays"
            :key="`${day.date}-${index}`"
            class="min-h-[120px] border-r border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            :class="{
              'bg-gray-50 dark:bg-gray-900': !day.isCurrentMonth,
              'bg-blue-50 dark:bg-blue-900/20': day.isToday
            }"
            @click="selectDate(day.date)"
          >
            <div class="flex justify-between items-start mb-1">
              <span 
                class="text-sm font-medium"
                :class="{
                  'text-gray-400 dark:text-gray-600': !day.isCurrentMonth,
                  'text-blue-600 dark:text-blue-400': day.isToday,
                  'text-gray-900 dark:text-white': day.isCurrentMonth && !day.isToday
                }"
              >
                {{ day.day }}
              </span>
            </div>
            
            <!-- Interview Events -->
            <div class="space-y-1">
              <div
                v-for="event in day.events.slice(0, 3)"
                :key="event.id"
                class="text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity"
                :style="{ backgroundColor: event.color }"
                @click.stop="$emit('event-click', event)"
              >
                {{ event.title }}
              </div>
              <div
                v-if="day.events.length > 3"
                class="text-xs text-gray-500 dark:text-gray-400 cursor-pointer"
                @click.stop="$emit('show-more', day)"
              >
                +{{ day.events.length - 3 }} more
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Week View -->
      <div v-else-if="currentView === 'week'" class="calendar-week">
        <!-- Time Grid Header -->
        <div class="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
          <div class="p-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
            Time
          </div>
          <div 
            v-for="day in weekDays" 
            :key="day.date"
            class="p-3 text-sm font-medium text-center bg-gray-50 dark:bg-gray-700"
            :class="{
              'text-blue-600 dark:text-blue-400': day.isToday,
              'text-gray-700 dark:text-gray-300': !day.isToday
            }"
          >
            <div>{{ day.dayName }}</div>
            <div class="text-lg font-semibold mt-1">{{ day.day }}</div>
          </div>
        </div>
        
        <!-- Time Slots -->
        <div class="max-h-[600px] overflow-y-auto">
          <div 
            v-for="hour in timeSlots" 
            :key="hour"
            class="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700"
          >
            <div class="p-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              {{ formatHour(hour) }}
            </div>
            <div 
              v-for="day in weekDays" 
              :key="`${day.date}-${hour}`"
              class="p-1 border-r border-gray-100 dark:border-gray-700 min-h-[60px] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer relative"
              @click="createEventAt(day.date, hour)"
            >
              <!-- Events for this time slot -->
              <div
                v-for="event in getEventsForTimeSlot(day.date, hour)"
                :key="event.id"
                class="absolute inset-x-1 text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity z-10"
                :style="{ 
                  backgroundColor: event.color,
                  top: `${getEventTop(event)}px`,
                  height: `${getEventHeight(event)}px`
                }"
                @click.stop="$emit('event-click', event)"
              >
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Day View -->
      <div v-else-if="currentView === 'day'" class="calendar-day">
        <!-- Day Header -->
        <div class="border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ formatDayHeader(currentDate) }}
          </h3>
        </div>
        
        <!-- Time Slots -->
        <div class="max-h-[600px] overflow-y-auto">
          <div 
            v-for="hour in timeSlots" 
            :key="hour"
            class="flex border-b border-gray-100 dark:border-gray-700"
          >
            <div class="w-20 p-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              {{ formatHour(hour) }}
            </div>
            <div 
              class="flex-1 p-2 min-h-[80px] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer relative"
              @click="createEventAt(formatDate(currentDate), hour)"
            >
              <!-- Events for this time slot -->
              <div
                v-for="event in getEventsForTimeSlot(formatDate(currentDate), hour)"
                :key="event.id"
                class="mb-1 text-sm p-2 rounded text-white cursor-pointer hover:opacity-80 transition-opacity"
                :style="{ backgroundColor: event.color }"
                @click.stop="$emit('event-click', event)"
              >
                <div class="font-medium">{{ event.title }}</div>
                <div class="text-xs opacity-90">
                  {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '~/types';

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

interface WeekDay {
  date: string;
  day: number;
  dayName: string;
  isToday: boolean;
}

interface Props {
  events: CalendarEvent[];
  initialView?: 'month' | 'week' | 'day';
  initialDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  initialView: 'month',
  initialDate: () => new Date()
});

const emit = defineEmits<{
  'create-interview': [];
  'event-click': [event: CalendarEvent];
  'date-select': [date: string];
  'show-more': [day: CalendarDay];
  'create-event-at': [date: string, hour: number];
}>();

// Reactive state
const currentDate = ref(new Date(props.initialDate));
const currentView = ref(props.initialView);

// Constants
const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const viewOptions = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: 'Day', value: 'day' }
];
const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

// Computed properties
const calendarDays = computed((): CalendarDay[] => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days: CalendarDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const dateStr = formatDate(date);
    const dayEvents = props.events.filter(event => {
      const eventDate = formatDate(event.start);
      return eventDate === dateStr;
    });
    
    days.push({
      date: dateStr,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: formatDate(date) === formatDate(today),
      events: dayEvents
    });
  }
  
  return days;
});

const weekDays = computed((): WeekDay[] => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());
  
  const days: WeekDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    
    days.push({
      date: formatDate(date),
      day: date.getDate(),
      dayName: dayHeaders[i],
      isToday: formatDate(date) === formatDate(today)
    });
  }
  
  return days;
});

// Methods
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const formatHeaderDate = (date: Date): string => {
  if (currentView.value === 'month') {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } else if (currentView.value === 'week') {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
};

const formatDayHeader = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:00 ${ampm}`;
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const navigateDate = (direction: number) => {
  const newDate = new Date(currentDate.value);
  
  if (currentView.value === 'month') {
    newDate.setMonth(newDate.getMonth() + direction);
  } else if (currentView.value === 'week') {
    newDate.setDate(newDate.getDate() + (direction * 7));
  } else {
    newDate.setDate(newDate.getDate() + direction);
  }
  
  currentDate.value = newDate;
};

const goToToday = () => {
  currentDate.value = new Date();
};

const selectDate = (dateStr: string) => {
  currentDate.value = new Date(dateStr);
  emit('date-select', dateStr);
};

const createEventAt = (date: string, hour: number) => {
  emit('create-event-at', date, hour);
};

const getEventsForTimeSlot = (date: string, hour: number): CalendarEvent[] => {
  return props.events.filter(event => {
    const eventDate = formatDate(event.start);
    const eventHour = event.start.getHours();
    return eventDate === date && eventHour === hour;
  });
};

const getEventTop = (event: CalendarEvent): number => {
  const minutes = event.start.getMinutes();
  return (minutes / 60) * 60; // Scale to fit within the hour slot
};

const getEventHeight = (event: CalendarEvent): number => {
  const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60); // Duration in minutes
  return Math.max((duration / 60) * 60, 30); // Minimum height of 30px
};
</script>