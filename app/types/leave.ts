export interface LeaveType {
  id: string;
  label: string;
  color: string;
  icon: string;
  requiresApproval: boolean;
}

export interface LeaveBreakdown {
  type: string;
  balance?: number;
  total?: number;
  carryOver?: number;
  expiresAt?: string | null;
  used?: number;
}

export interface LeaveSummary {
  available: {
    total: number;
    breakdown: LeaveBreakdown[];
  };
  used: {
    total: number;
    breakdown: LeaveBreakdown[];
    previousPeriod: number;
    percentageChange: number;
  };
  pending: {
    count: number;
    requests: PendingLeaveRequest[];
  };
}

export interface PendingLeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  isUrgent: boolean;
}

export interface CalendarLeave {
  id: string;
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  isHalfDay: boolean;
  duration: number;
  reason: string;
}

export interface PublicHoliday {
  date: string;
  name: string;
  isNational: boolean;
}

export interface LeavePolicy {
  maxConsecutiveDays: number;
  minNoticePeriodInDays: number;
  blackoutDates: BlackoutDate[];
  policyDocumentUrl: string;
}

export interface BlackoutDate {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface UpcomingLeave {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  duration: number;
  daysUntil: number;
}

export interface TeamLeave {
  employeeId: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface TeamSummary {
  totalTeamMembers: number;
  onLeaveToday: number;
  onLeaveThisWeek: number;
  available: number;
}

export interface LeaveFilters {
  leaveTypes: string[];
  statuses: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  viewMode: 'my-leaves' | 'team-leaves';
}
