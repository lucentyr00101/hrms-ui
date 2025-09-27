import type { UserRole } from '~/types/user';

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  component: string;
  size: 'small' | 'medium' | 'large' | 'full';
  order: number;
  enabled: boolean;
  roles: UserRole[];
}

export interface DashboardLayout {
  role: UserRole;
  widgets: DashboardWidget[];
}

// HR/Admin specific widgets
export const HR_ADMIN_WIDGETS: DashboardWidget[] = [
  {
    id: 'pending-actions',
    type: 'actions',
    title: 'Pending Actions',
    component: 'PendingActionsWidget',
    size: 'medium',
    order: 1,
    enabled: true,
    roles: ['hr', 'admin']
  },
  {
    id: 'employee-stats',
    type: 'stats',
    title: 'Employee Statistics',
    component: 'EmployeeStatsWidget',
    size: 'small',
    order: 2,
    enabled: true,
    roles: ['hr', 'admin']
  },
  {
    id: 'recruitment-pipeline',
    type: 'chart',
    title: 'Recruitment Pipeline',
    component: 'RecruitmentPipelineWidget',
    size: 'large',
    order: 3,
    enabled: true,
    roles: ['hr', 'admin']
  },
  {
    id: 'department-overview',
    type: 'chart',
    title: 'Department Overview',
    component: 'DepartmentOverviewWidget',
    size: 'medium',
    order: 4,
    enabled: true,
    roles: ['hr', 'admin']
  },
  {
    id: 'system-metrics',
    type: 'stats',
    title: 'System Metrics',
    component: 'SystemMetricsWidget',
    size: 'small',
    order: 5,
    enabled: true,
    roles: ['admin']
  }
];

// Manager specific widgets
export const MANAGER_WIDGETS: DashboardWidget[] = [
  {
    id: 'team-activity',
    type: 'activity',
    title: 'Team Activity',
    component: 'TeamActivityWidget',
    size: 'large',
    order: 1,
    enabled: true,
    roles: ['manager']
  },
  {
    id: 'leave-requests',
    type: 'actions',
    title: 'Leave Requests',
    component: 'LeaveRequestsWidget',
    size: 'medium',
    order: 2,
    enabled: true,
    roles: ['manager']
  },
  {
    id: 'team-performance',
    type: 'chart',
    title: 'Team Performance',
    component: 'TeamPerformanceWidget',
    size: 'medium',
    order: 3,
    enabled: true,
    roles: ['manager']
  },
  {
    id: 'upcoming-reviews',
    type: 'actions',
    title: 'Upcoming Reviews',
    component: 'UpcomingReviewsWidget',
    size: 'small',
    order: 4,
    enabled: true,
    roles: ['manager']
  }
];

// Employee specific widgets
export const EMPLOYEE_WIDGETS: DashboardWidget[] = [
  {
    id: 'personal-info',
    type: 'profile',
    title: 'Personal Information',
    component: 'PersonalInfoWidget',
    size: 'medium',
    order: 1,
    enabled: true,
    roles: ['employee']
  },
  {
    id: 'my-requests',
    type: 'actions',
    title: 'My Requests',
    component: 'MyRequestsWidget',
    size: 'medium',
    order: 2,
    enabled: true,
    roles: ['employee']
  },
  {
    id: 'announcements',
    type: 'info',
    title: 'Announcements',
    component: 'AnnouncementsWidget',
    size: 'large',
    order: 3,
    enabled: true,
    roles: ['employee']
  },
  {
    id: 'leave-balance',
    type: 'stats',
    title: 'Leave Balance',
    component: 'LeaveBalanceWidget',
    size: 'small',
    order: 4,
    enabled: true,
    roles: ['employee']
  },
  {
    id: 'payroll-summary',
    type: 'stats',
    title: 'Payroll Summary',
    component: 'PayrollSummaryWidget',
    size: 'small',
    order: 5,
    enabled: true,
    roles: ['employee']
  }
];

// Dashboard layouts by role
export const DASHBOARD_LAYOUTS: DashboardLayout[] = [
  {
    role: 'admin',
    widgets: HR_ADMIN_WIDGETS
  },
  {
    role: 'hr',
    widgets: HR_ADMIN_WIDGETS.filter(w => w.roles.includes('hr'))
  },
  {
    role: 'manager',
    widgets: MANAGER_WIDGETS
  },
  {
    role: 'employee',
    widgets: EMPLOYEE_WIDGETS
  }
];

export const getDashboardLayout = (role: UserRole): DashboardLayout | undefined => {
  return DASHBOARD_LAYOUTS.find(layout => layout.role === role);
};