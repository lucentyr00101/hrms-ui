// Re-export all types for easy import
export * from './employee';
export * from './dashboard';
export * from './auth';
export * from './candidate';

// Export constants first to avoid conflicts
export * from './constants';

// Explicitly re-export interview and leave types to avoid conflicts
export type { 
  InterviewSlot, 
  InterviewType,
  InterviewSlotStatus,
  CalendarView, 
  InterviewScheduleForm, 
  InterviewFilters, 
  CalendarEvent 
} from './interview';

export type { 
  LeaveType,
  LeaveTypeFormData,
  LeaveStatus,
  ApprovalWorkflow,
  AccrualMethod,
  EmployeeEligibility,
  ApplicableGender,
  LeaveTypeConfig,
  LeaveBreakdown,
  LeaveSummary,
  PendingLeaveRequest,
  CalendarLeave,
  PublicHoliday,
  LeavePolicy,
  BlackoutDate,
  UpcomingLeave,
  TeamLeave,
  TeamSummary,
  LeaveFilters
} from './leave';