import { 
  LEAVE_SUMMARY, 
  CALENDAR_LEAVES, 
  PUBLIC_HOLIDAYS, 
  LEAVE_TYPES,
  LEAVE_POLICY,
  UPCOMING_LEAVES,
  TEAM_LEAVES,
  TEAM_SUMMARY
} from '~/constants/leave-dashboard';
import type { CalendarLeave, LeaveFilters } from '~/types/leave';

export const useLeaveData = () => {
  const leaveSummary = ref(LEAVE_SUMMARY);
  const calendarLeaves = ref<CalendarLeave[]>(CALENDAR_LEAVES);
  const publicHolidays = ref(PUBLIC_HOLIDAYS);
  const leaveTypes = ref(LEAVE_TYPES);
  const leavePolicy = ref(LEAVE_POLICY);
  const upcomingLeaves = ref(UPCOMING_LEAVES);
  const teamLeaves = ref(TEAM_LEAVES);
  const teamSummary = ref(TEAM_SUMMARY);
  
  const filters = ref<LeaveFilters>({
    leaveTypes: [],
    statuses: [],
    dateRange: {
      start: null,
      end: null
    },
    viewMode: 'my-leaves'
  });

  const filteredLeaves = computed(() => {
    let leaves = [...calendarLeaves.value];

    // Filter by leave types
    if (filters.value.leaveTypes.length > 0) {
      leaves = leaves.filter(leave => 
        filters.value.leaveTypes.includes(leave.type)
      );
    }

    // Filter by status
    if (filters.value.statuses.length > 0) {
      leaves = leaves.filter(leave => 
        filters.value.statuses.includes(leave.status)
      );
    }

    // Filter by date range
    if (filters.value.dateRange.start && filters.value.dateRange.end) {
      leaves = leaves.filter(leave => {
        const leaveStart = new Date(leave.startDate);
        const leaveEnd = new Date(leave.endDate);
        const filterStart = new Date(filters.value.dateRange.start!);
        const filterEnd = new Date(filters.value.dateRange.end!);
        
        return (leaveStart <= filterEnd && leaveEnd >= filterStart);
      });
    }

    return leaves;
  });

  const getLeaveTypeConfig = (typeId: string) => {
    return leaveTypes.value.find(lt => lt.id.toLowerCase() === typeId.toLowerCase());
  };

  const clearFilters = () => {
    filters.value = {
      leaveTypes: [],
      statuses: [],
      dateRange: {
        start: null,
        end: null
      },
      viewMode: 'my-leaves'
    };
  };

  const updateFilters = (newFilters: Partial<LeaveFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  return {
    leaveSummary,
    calendarLeaves,
    publicHolidays,
    leaveTypes,
    leavePolicy,
    upcomingLeaves,
    teamLeaves,
    teamSummary,
    filters,
    filteredLeaves,
    getLeaveTypeConfig,
    clearFilters,
    updateFilters
  };
};
