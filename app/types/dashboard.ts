export interface InterviewData {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  interviewer: string;
}

export interface EmployeeLeaveData {
  id: string;
  employeeName: string;
  department: string;
  startDate: string;
  endDate: string;
  leaveType: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity';
  status: 'approved' | 'pending' | 'denied';
}

export interface DashboardStats {
  interviewsThisWeek: number;
  interviewsThisMonth: number;
  interviewsThisYear: number;
  employeesOnLeaveThisWeek: number;
  employeesOnLeaveThisMonth: number;
  employeesOnLeaveThisYear: number;
  passingRate: number;
  failingRate: number;
  totalInterviews: number;
  successfulHires: number;
}

export interface ChartData {
  labels: string[];
  datasets: any[];
}

export interface DashboardChartData {
  interviewTrends: ChartData;
  successRates: ChartData;
  departmentLeaves: ChartData;
}