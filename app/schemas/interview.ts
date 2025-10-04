import * as yup from 'yup';

export const interviewScheduleSchema = yup.object({
  candidateId: yup.string().required('Please select a candidate'),
  date: yup.string()
    .required('Please select a date')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: yup.string()
    .required('Please select a start time')
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  endTime: yup.string()
    .required('Please select an end time')
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
    .test('after-start', 'End time must be after start time', function(value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      
      const start = new Date(`2000-01-01T${startTime}:00`);
      const end = new Date(`2000-01-01T${value}:00`);
      
      return end > start;
    }),
  interviewer: yup.string().required('Please select an interviewer'),
  interviewType: yup.string()
    .required('Please select an interview type')
    .oneOf(['screening', 'technical', 'behavioral', 'final', 'panel'], 'Invalid interview type'),
  location: yup.string().optional(),
  notes: yup.string().optional(),
  meetingLink: yup.string()
    .optional()
    .url('Please enter a valid URL for the meeting link')
});

export const interviewSlotSchema = yup.object({
  date: yup.string()
    .required('Please select a date')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  startTime: yup.string()
    .required('Please select a start time')
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  endTime: yup.string()
    .required('Please select an end time')
    .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
    .test('after-start', 'End time must be after start time', function(value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      
      const start = new Date(`2000-01-01T${startTime}:00`);
      const end = new Date(`2000-01-01T${value}:00`);
      
      return end > start;
    }),
  interviewer: yup.string().required('Please select an interviewer'),
  interviewType: yup.string()
    .required('Please select an interview type')
    .oneOf(['screening', 'technical', 'behavioral', 'final', 'panel'], 'Invalid interview type'),
  location: yup.string().optional(),
  notes: yup.string().optional(),
  meetingLink: yup.string()
    .optional()
    .url('Please enter a valid URL for the meeting link')
});