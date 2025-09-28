export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  applicationDate: string;
  interviewStage: InterviewStage;
  status: CandidateStatus;
  resumeUrl?: string;
  linkedinUrl?: string;
  experience: number; // years
  skills: string[];
  interviewer?: string;
  interviewDate?: string;
  interviewTime?: string;
  notes?: string;
}

export type InterviewStage = 
  | 'applied'
  | 'screening'
  | 'technical'
  | 'final'
  | 'offer'
  | 'hired'
  | 'rejected';

export type CandidateStatus = 
  | 'active'
  | 'scheduled'
  | 'completed'
  | 'rejected'
  | 'withdrawn'
  | 'hired';

export interface CandidateFilters {
  search?: string;
  position?: string;
  department?: string;
  stage?: InterviewStage;
  status?: CandidateStatus;
}

export interface CandidateSortOptions {
  field: 'applicationDate' | 'position' | 'interviewStage' | 'firstName';
  direction: 'asc' | 'desc';
}