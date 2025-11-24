import type { 
  LeaveSummary, 
  CalendarLeave, 
  PublicHoliday, 
  LeaveTypeConfig,
  LeavePolicy,
  UpcomingLeave,
  TeamLeave,
  TeamSummary
} from '~/types';

export const LEAVE_TYPES: LeaveTypeConfig[] = [
  { 
    id: 'annual', 
    label: 'Annual Leave', 
    color: '#10b981', 
    icon: 'i-material-symbols:calendar-month',
    requiresApproval: true 
  },
  { 
    id: 'sick', 
    label: 'Sick Leave', 
    color: '#f59e0b', 
    icon: 'i-material-symbols:emergency',
    requiresApproval: false 
  },
  { 
    id: 'personal', 
    label: 'Personal Leave', 
    color: '#3b82f6', 
    icon: 'i-material-symbols:person',
    requiresApproval: true 
  },
  { 
    id: 'maternity', 
    label: 'Maternity Leave', 
    color: '#ec4899', 
    icon: 'i-material-symbols:family-restroom',
    requiresApproval: true 
  },
  { 
    id: 'paternity', 
    label: 'Paternity Leave', 
    color: '#8b5cf6', 
    icon: 'i-material-symbols:family-restroom',
    requiresApproval: true 
  },
  { 
    id: 'unpaid', 
    label: 'Unpaid Leave', 
    color: '#6b7280', 
    icon: 'i-material-symbols:block',
    requiresApproval: true 
  }
];

export const LEAVE_SUMMARY: LeaveSummary = {
  available: {
    total: 25,
    breakdown: [
      { 
        type: 'Annual', 
        balance: 10, 
        total: 15, 
        carryOver: 0, 
        expiresAt: '2025-12-31' 
      },
      { 
        type: 'Sick', 
        balance: 12, 
        total: 12, 
        carryOver: 0, 
        expiresAt: null 
      },
      { 
        type: 'Personal', 
        balance: 3, 
        total: 5, 
        carryOver: 0, 
        expiresAt: '2025-06-30' 
      }
    ]
  },
  used: {
    total: 10,
    breakdown: [
      { type: 'Annual', used: 5 },
      { type: 'Sick', used: 3 },
      { type: 'Personal', used: 2 }
    ],
    previousPeriod: 8,
    percentageChange: 25
  },
  pending: {
    count: 2,
    requests: [
      {
        id: 'LR001',
        startDate: '2025-12-15',
        endDate: '2025-12-18',
        type: 'Annual',
        status: 'Pending Manager Approval',
        isUrgent: true
      },
      {
        id: 'LR002',
        startDate: '2026-01-10',
        endDate: '2026-01-10',
        type: 'Personal',
        status: 'Pending HR Approval',
        isUrgent: false
      }
    ]
  }
};

export const CALENDAR_LEAVES: CalendarLeave[] = [
  {
    id: 'LV001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2025-12-01',
    endDate: '2025-12-03',
    type: 'Annual',
    status: 'Approved',
    isHalfDay: false,
    duration: 3,
    reason: 'Family vacation'
  },
  {
    id: 'LV002',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2025-12-15',
    endDate: '2025-12-18',
    type: 'Annual',
    status: 'Pending',
    isHalfDay: false,
    duration: 4,
    reason: 'Holiday trip'
  },
  {
    id: 'LV003',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2025-11-20',
    endDate: '2025-11-20',
    type: 'Sick',
    status: 'Approved',
    isHalfDay: true,
    duration: 0.5,
    reason: 'Medical appointment'
  },
  {
    id: 'LV004',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2026-01-05',
    endDate: '2026-01-07',
    type: 'Personal',
    status: 'Approved',
    isHalfDay: false,
    duration: 3,
    reason: 'Personal matters'
  },
  {
    id: 'LV005',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2025-11-28',
    endDate: '2025-11-28',
    type: 'Sick',
    status: 'Approved',
    isHalfDay: false,
    duration: 1,
    reason: 'Flu'
  },
  {
    id: 'LV006',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2026-02-10',
    endDate: '2026-02-14',
    type: 'Annual',
    status: 'Approved',
    isHalfDay: false,
    duration: 5,
    reason: 'Winter break'
  },
  {
    id: 'LV007',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2026-03-05',
    endDate: '2026-03-05',
    type: 'Personal',
    status: 'Rejected',
    isHalfDay: false,
    duration: 1,
    reason: 'Overlaps with blackout period'
  },
  {
    id: 'LV008',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    startDate: '2025-11-25',
    endDate: '2025-11-25',
    type: 'Annual',
    status: 'Approved',
    isHalfDay: true,
    duration: 0.5,
    reason: 'Half day off'
  }
];

export const PUBLIC_HOLIDAYS: PublicHoliday[] = [
  { date: '2025-11-27', name: 'Thanksgiving', isNational: true },
  { date: '2025-12-25', name: 'Christmas Day', isNational: true },
  { date: '2025-12-26', name: 'Boxing Day', isNational: true },
  { date: '2026-01-01', name: 'New Year\'s Day', isNational: true },
  { date: '2026-02-14', name: 'Valentine\'s Day', isNational: false },
  { date: '2026-04-10', name: 'Good Friday', isNational: true },
  { date: '2026-04-13', name: 'Easter Monday', isNational: true },
  { date: '2026-05-25', name: 'Memorial Day', isNational: true },
  { date: '2026-07-04', name: 'Independence Day', isNational: true },
  { date: '2026-09-07', name: 'Labor Day', isNational: true },
  { date: '2026-11-26', name: 'Thanksgiving', isNational: true },
  { date: '2026-12-25', name: 'Christmas Day', isNational: true }
];

export const LEAVE_POLICY: LeavePolicy = {
  maxConsecutiveDays: 14,
  minNoticePeriodInDays: 7,
  blackoutDates: [
    { 
      startDate: '2025-12-20', 
      endDate: '2025-12-31', 
      reason: 'Year-end freeze' 
    },
    { 
      startDate: '2026-03-15', 
      endDate: '2026-03-31', 
      reason: 'Quarter-end close' 
    }
  ],
  policyDocumentUrl: '/documents/leave-policy.pdf'
};

export const UPCOMING_LEAVES: UpcomingLeave[] = [
  {
    id: 'LV001',
    startDate: '2025-12-01',
    endDate: '2025-12-03',
    type: 'Annual',
    duration: 3,
    daysUntil: 7
  },
  {
    id: 'LV002',
    startDate: '2025-12-15',
    endDate: '2025-12-18',
    type: 'Annual',
    duration: 4,
    daysUntil: 21
  },
  {
    id: 'LV004',
    startDate: '2026-01-05',
    endDate: '2026-01-07',
    type: 'Personal',
    duration: 3,
    daysUntil: 42
  }
];

export const TEAM_LEAVES: TeamLeave[] = [
  {
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    startDate: '2025-11-25',
    endDate: '2025-11-25',
    type: 'Sick',
    status: 'Approved'
  },
  {
    employeeId: 'EMP003',
    employeeName: 'Bob Johnson',
    startDate: '2025-11-24',
    endDate: '2025-11-29',
    type: 'Annual',
    status: 'Approved'
  },
  {
    employeeId: 'EMP004',
    employeeName: 'Alice Williams',
    startDate: '2025-12-02',
    endDate: '2025-12-06',
    type: 'Personal',
    status: 'Pending'
  }
];

export const TEAM_SUMMARY: TeamSummary = {
  totalTeamMembers: 8,
  onLeaveToday: 2,
  onLeaveThisWeek: 3,
  available: 5
};
