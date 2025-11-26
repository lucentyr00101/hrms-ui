import type { LeaveBalance, ExistingLeaveRequest } from '~/types';

// Leave Balances for the current user
export const LEAVE_BALANCES: LeaveBalance[] = [
  {
    leaveTypeId: 'LT001',
    leaveTypeName: 'Annual Leave',
    available: 10,
    total: 15,
    used: 5
  },
  {
    leaveTypeId: 'LT002',
    leaveTypeName: 'Sick Leave',
    available: 9,
    total: 12,
    used: 3
  },
  {
    leaveTypeId: 'LT003',
    leaveTypeName: 'Personal Leave',
    available: 3,
    total: 5,
    used: 2
  },
  {
    leaveTypeId: 'LT006',
    leaveTypeName: 'Unpaid Leave',
    available: 30,
    total: 30,
    used: 0
  },
  {
    leaveTypeId: 'LT007',
    leaveTypeName: 'Bereavement Leave',
    available: 5,
    total: 5,
    used: 0
  }
];

// Existing Leave Requests for overlap detection
export const EXISTING_LEAVE_REQUESTS: ExistingLeaveRequest[] = [
  {
    id: 'LR001',
    leaveTypeId: 'LT001',
    leaveTypeName: 'Annual Leave',
    startDate: '2025-12-15',
    endDate: '2025-12-18',
    status: 'pending',
    submittedAt: '2025-11-20',
    reason: 'Holiday trip'
  },
  {
    id: 'LR002',
    leaveTypeId: 'LT003',
    leaveTypeName: 'Personal Leave',
    startDate: '2026-01-10',
    endDate: '2026-01-10',
    status: 'pending',
    submittedAt: '2025-11-22',
    reason: 'Personal errands'
  },
  {
    id: 'LR003',
    leaveTypeId: 'LT001',
    leaveTypeName: 'Annual Leave',
    startDate: '2025-12-01',
    endDate: '2025-12-03',
    status: 'approved',
    submittedAt: '2025-11-15',
    reason: 'Family vacation'
  },
  {
    id: 'LR004',
    leaveTypeId: 'LT002',
    leaveTypeName: 'Sick Leave',
    startDate: '2025-11-28',
    endDate: '2025-11-28',
    status: 'approved',
    submittedAt: '2025-11-28',
    reason: 'Flu'
  },
  {
    id: 'LR005',
    leaveTypeId: 'LT001',
    leaveTypeName: 'Annual Leave',
    startDate: '2026-02-10',
    endDate: '2026-02-14',
    status: 'approved',
    submittedAt: '2025-11-10',
    reason: 'Winter break'
  }
];

// File upload configuration
export const FILE_UPLOAD_CONFIG = {
  acceptedTypes: ['.pdf', '.jpeg', '.jpg', '.png', '.doc', '.docx'],
  acceptedMimeTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxTotalSize: 20 * 1024 * 1024, // 20MB
  maxFiles: 5
};

// Leave type options for the dropdown (active types with balances)
export const LEAVE_TYPE_OPTIONS = LEAVE_BALANCES.map(balance => ({
  value: balance.leaveTypeId,
  label: balance.leaveTypeName,
  available: balance.available
}));
