import { object, string, array, mixed, type InferType } from 'yup';

export const leaveRequestSchema = object({
  leaveTypeId: string()
    .required('Please select a leave type'),

  startDate: string()
    .required('Start date is required'),

  endDate: string()
    .required('End date is required'),

  reason: string()
    .max(500, 'Reason cannot exceed 500 characters')
    .optional(),

  files: array()
    .of(mixed<File>())
    .optional()
    .default([])
});

export type LeaveRequestSchema = InferType<typeof leaveRequestSchema>;
