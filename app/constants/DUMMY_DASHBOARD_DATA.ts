import type { InterviewData, EmployeeLeaveData, DashboardStats, DashboardChartData } from '~/types';

export const DUMMY_INTERVIEW_DATA: InterviewData[] = [
  {
    id: '1',
    candidateName: 'John Smith',
    position: 'Software Engineer',
    date: '2024-09-02',
    time: '10:00 AM',
    status: 'scheduled',
    interviewer: 'Sarah Johnson'
  },
  {
    id: '2',
    candidateName: 'Emily Davis',
    position: 'UX Designer',
    date: '2024-09-03',
    time: '2:00 PM',
    status: 'scheduled',
    interviewer: 'Mike Chen'
  },
  {
    id: '3',
    candidateName: 'Alex Rodriguez',
    position: 'Product Manager',
    date: '2024-09-04',
    time: '11:30 AM',
    status: 'scheduled',
    interviewer: 'Lisa Wang'
  },
  {
    id: '4',
    candidateName: 'Maria Garcia',
    position: 'Data Analyst',
    date: '2024-09-05',
    time: '3:30 PM',
    status: 'scheduled',
    interviewer: 'David Brown'
  },
  {
    id: '5',
    candidateName: 'James Wilson',
    position: 'DevOps Engineer',
    date: '2024-08-28',
    time: '9:00 AM',
    status: 'completed',
    interviewer: 'Sarah Johnson'
  }
];

export const DUMMY_EMPLOYEE_LEAVE_DATA: EmployeeLeaveData[] = [
  {
    id: '1',
    employeeName: 'Jennifer Martinez',
    department: 'Engineering',
    startDate: '2024-09-02',
    endDate: '2024-09-06',
    leaveType: 'vacation',
    status: 'approved'
  },
  {
    id: '2',
    employeeName: 'Robert Kim',
    department: 'Marketing',
    startDate: '2024-09-03',
    endDate: '2024-09-03',
    leaveType: 'sick',
    status: 'approved'
  },
  {
    id: '3',
    employeeName: 'Amanda Thompson',
    department: 'HR',
    startDate: '2024-09-10',
    endDate: '2024-09-20',
    leaveType: 'maternity',
    status: 'approved'
  },
  {
    id: '4',
    employeeName: 'Michael Lee',
    department: 'Sales',
    startDate: '2024-09-15',
    endDate: '2024-09-17',
    leaveType: 'personal',
    status: 'pending'
  }
];

export const DUMMY_DASHBOARD_STATS: DashboardStats = {
  interviewsThisWeek: 4,
  interviewsThisMonth: 15,
  interviewsThisYear: 124,
  employeesOnLeaveThisWeek: 2,
  employeesOnLeaveThisMonth: 8,
  employeesOnLeaveThisYear: 45,
  passingRate: 78,
  failingRate: 22,
  totalInterviews: 124,
  successfulHires: 97
};

export const DUMMY_CHART_DATA: DashboardChartData = {
  interviewTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Interviews Conducted',
        data: [12, 19, 15, 25, 22, 30, 28, 24],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4
      }
    ]
  },
  successRates: {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2
      }
    ]
  },
  departmentLeaves: {
    labels: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'],
    datasets: [
      {
        label: 'Employees on Leave',
        data: [8, 3, 5, 2, 1],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }
    ]
  }
};