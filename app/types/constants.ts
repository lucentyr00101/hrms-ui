export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Design',
  'Customer Support'
] as const;

export const EMPLOYEE_STATUSES = [
  'active',
  'inactive', 
  'on-leave'
] as const;

export const EMPLOYMENT_TYPES = [
  'fullTime',
  'partTime',
  'contractor'
] as const;

export const WORK_LOCATIONS = [
  'office',
  'remote',
  'hybrid'
] as const;

export const LEAVE_TYPES = [
  'vacation',
  'sick',
  'personal',
  'maternity',
  'paternity'
] as const;

export const INTERVIEW_STATUSES = [
  'scheduled',
  'completed',
  'cancelled'
] as const;

export const ACTIVITY_TYPES = [
  'hire',
  'promotion',
  'leave',
  'document',
  'review',
  'update'
] as const;

export const DOCUMENT_CATEGORIES = [
  'contract',
  'identification',
  'certificate',
  'other'
] as const;

export type Department = typeof DEPARTMENTS[number];
export type EmployeeStatus = typeof EMPLOYEE_STATUSES[number];
export type EmploymentType = typeof EMPLOYMENT_TYPES[number];
export type WorkLocation = typeof WORK_LOCATIONS[number];
export type LeaveType = typeof LEAVE_TYPES[number];
export type InterviewStatus = typeof INTERVIEW_STATUSES[number];
export type ActivityType = typeof ACTIVITY_TYPES[number];
export type DocumentCategory = typeof DOCUMENT_CATEGORIES[number];