export interface NavigationItem {
  label: string
  icon: string
  to?: string
  children?: NavigationItem[]
}

export * from './employee'
export * from './dashboard'
export * from './auth'
export * from './candidate'
export * from './constants'

export type { 
  InterviewSlot, 
  InterviewType,
  InterviewSlotStatus,
  CalendarView, 
  InterviewScheduleForm, 
  InterviewFilters, 
  CalendarEvent 
} from './interview'

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
  LeaveFilters,
  LeaveRequestStatus,
  LeaveBalance,
  ExistingLeaveRequest,
  LeaveRequestFormData,
  LeaveRequestSubmission,
  UploadedFile,
  DateValidationResult
} from './leave'