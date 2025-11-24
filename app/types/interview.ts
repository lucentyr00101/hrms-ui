export interface InterviewSlot {
  id: string;
  candidateId?: string;
  candidateName?: string;
  position?: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  interviewer: string;
  interviewType: InterviewType;
  status: InterviewSlotStatus;
  location?: string;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export type InterviewType = 
  | 'screening'
  | 'technical'
  | 'behavioral'
  | 'final'
  | 'panel';

export type InterviewSlotStatus = 
  | 'pending'
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'rejected'
  | 'rescheduled';

export interface CalendarView {
  type: 'month' | 'week' | 'day';
  currentDate: Date;
}

export interface InterviewScheduleForm {
  candidateId: string;
  date: string;
  startTime: string;
  endTime: string;
  interviewer: string;
  interviewType: InterviewType;
  location?: string;
  notes?: string;
  meetingLink?: string;
}

export interface InterviewFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  interviewer?: string;
  status?: InterviewSlotStatus;
  interviewType?: InterviewType;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  data: InterviewSlot;
}