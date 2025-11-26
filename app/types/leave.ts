// Leave Type Management Types
export type LeaveStatus = 'active' | 'inactive';
export type ApprovalWorkflow = 'manager' | 'hr' | 'manager-hr';
export type AccrualMethod = 'annual-fixed' | 'monthly-accrual' | 'no-accrual' | 'custom';
export type EmployeeEligibility = 'probation' | 'permanent' | 'contract';
export type ApplicableGender = 'all' | 'male' | 'female';

export interface BlackoutDate {
  startDate: string;
  endDate: string;
  reason: string;
}

export interface LeaveType {
  id: string;
  name: string;
  code: string;
  description?: string;
  icon: string;
  color: string;
  status: LeaveStatus;
  requiresApproval: boolean;
  approvalWorkflow: ApprovalWorkflow | null;
  requiresDocumentation: boolean;
  requiredDocuments?: string;
  maxConsecutiveDays: number;
  minNoticePeriod: number;
  allowHalfDays: boolean;
  applicableGender: ApplicableGender;
  isPaid: boolean;
  accrualMethod: AccrualMethod;
  annualDays?: number;
  monthlyDays?: number;
  maxBalanceLimit: number;
  allowCarryOver: boolean;
  maxCarryOverDays?: number;
  carryOverExpiryMonths?: number;
  prorationEnabled: boolean;
  negativeBalanceAllowed: boolean;
  maxNegativeBalance?: number;
  eligibility: EmployeeEligibility[];
  minTenureMonths: number;
  blackoutDates: BlackoutDate[];
  usageCount: number;
  approvalRate: number;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
}

export interface LeaveTypeFormData {
  name: string;
  code: string;
  description?: string;
  icon: string;
  color: string;
  status: LeaveStatus;
  requiresApproval: boolean;
  approvalWorkflow: ApprovalWorkflow | null;
  requiresDocumentation: boolean;
  requiredDocuments?: string;
  maxConsecutiveDays: number;
  minNoticePeriod: number;
  allowHalfDays: boolean;
  applicableGender: ApplicableGender;
  isPaid: boolean;
  accrualMethod: AccrualMethod;
  annualDays?: number;
  monthlyDays?: number;
  maxBalanceLimit: number;
  allowCarryOver: boolean;
  maxCarryOverDays?: number;
  carryOverExpiryMonths?: number;
  prorationEnabled: boolean;
  negativeBalanceAllowed: boolean;
  maxNegativeBalance?: number;
  eligibility: EmployeeEligibility[];
  minTenureMonths: number;
  blackoutDates: BlackoutDate[];
}

// Existing leave dashboard types (renamed to avoid conflicts)
export interface LeaveTypeConfig {
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

// Leave Request Types
export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected';

export interface LeaveBalance {
  leaveTypeId: string;
  leaveTypeName: string;
  available: number;
  total: number;
  used: number;
}

export interface ExistingLeaveRequest {
  id: string;
  leaveTypeId: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  status: LeaveRequestStatus;
  submittedAt: string;
  reason?: string;
}

export interface LeaveRequestFormData {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  reason?: string;
  files: File[];
}

export interface LeaveRequestSubmission {
  id: string;
  leaveTypeId: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason?: string;
  files: { name: string; size: number }[];
  submittedAt: string;
}

export interface UploadedFile {
  file: File;
  progress: number;
  error?: string;
}

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
  conflictingRequest?: ExistingLeaveRequest;
}
