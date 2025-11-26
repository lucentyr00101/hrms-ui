import { ref, computed } from 'vue';
import { 
  LEAVE_BALANCES, 
  EXISTING_LEAVE_REQUESTS,
  FILE_UPLOAD_CONFIG 
} from '~/constants/leave-request';
import type { 
  LeaveBalance, 
  ExistingLeaveRequest, 
  LeaveRequestSubmission,
  UploadedFile,
  DateValidationResult
} from '~/types';

export function useLeaveRequest() {
  const leaveBalances = ref<LeaveBalance[]>([...LEAVE_BALANCES]);
  const existingRequests = ref<ExistingLeaveRequest[]>([...EXISTING_LEAVE_REQUESTS]);
  const isSubmitting = ref(false);
  const uploadedFiles = ref<UploadedFile[]>([]);

  // Get leave balance for a specific type
  const getLeaveBalance = (leaveTypeId: string): LeaveBalance | undefined => {
    return leaveBalances.value.find(b => b.leaveTypeId === leaveTypeId);
  };

  // Get leave type name by ID
  const getLeaveTypeName = (leaveTypeId: string): string => {
    const balance = getLeaveBalance(leaveTypeId);
    return balance?.leaveTypeName || 'Unknown';
  };

  // Check if a date is a weekend
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Check if a date is in the past
  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Calculate weekdays between two dates (inclusive)
  const calculateWeekdays = (startDate: Date, endDate: Date): number => {
    let count = 0;
    const current = new Date(startDate);
    
    while (current <= endDate) {
      if (!isWeekend(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check for overlapping leave requests
  const checkOverlap = (startDate: Date, endDate: Date): ExistingLeaveRequest | null => {
    for (const request of existingRequests.value) {
      // Only check approved and pending requests
      if (request.status === 'rejected') continue;

      const reqStart = new Date(request.startDate);
      const reqEnd = new Date(request.endDate);

      // Check if there's any overlap
      if (startDate <= reqEnd && endDate >= reqStart) {
        return request;
      }
    }
    return null;
  };

  // Validate start date
  const validateStartDate = (dateString: string): DateValidationResult => {
    if (!dateString) {
      return { isValid: false, error: 'Start date is required' };
    }

    const date = new Date(dateString);
    
    if (isPastDate(date)) {
      return { isValid: false, error: 'Start date cannot be in the past' };
    }

    if (isWeekend(date)) {
      return { isValid: false, error: 'Start date cannot be on a weekend' };
    }

    return { isValid: true };
  };

  // Validate end date
  const validateEndDate = (startDateString: string, endDateString: string): DateValidationResult => {
    if (!endDateString) {
      return { isValid: false, error: 'End date is required' };
    }

    const endDate = new Date(endDateString);
    
    if (isWeekend(endDate)) {
      return { isValid: false, error: 'End date cannot be on a weekend' };
    }

    if (startDateString) {
      const startDate = new Date(startDateString);
      if (endDate < startDate) {
        return { isValid: false, error: 'End date must be on or after start date' };
      }
    }

    return { isValid: true };
  };

  // Validate date range for overlap and balance
  const validateDateRange = (
    leaveTypeId: string,
    startDateString: string,
    endDateString: string
  ): DateValidationResult => {
    if (!startDateString || !endDateString || !leaveTypeId) {
      return { isValid: true }; // Let individual field validators handle these
    }

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Check for overlaps
    const conflictingRequest = checkOverlap(startDate, endDate);
    if (conflictingRequest) {
      return {
        isValid: false,
        error: `You have an existing ${conflictingRequest.status} leave request from ${formatDate(conflictingRequest.startDate)} to ${formatDate(conflictingRequest.endDate)}`,
        conflictingRequest
      };
    }

    // Check leave balance
    const balance = getLeaveBalance(leaveTypeId);
    if (balance) {
      const requestedDays = calculateWeekdays(startDate, endDate);
      if (requestedDays > balance.available) {
        return {
          isValid: false,
          error: `Insufficient ${balance.leaveTypeName} balance. Available: ${balance.available} days, Requested: ${requestedDays} days`
        };
      }
    }

    return { isValid: true };
  };

  // Validate file
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    // Check file type
    const isValidType = FILE_UPLOAD_CONFIG.acceptedMimeTypes.includes(file.type);
    if (!isValidType) {
      return { 
        isValid: false, 
        error: 'File type not supported. Please upload PDF, JPEG, PNG, DOC, or DOCX files' 
      };
    }

    // Check file size
    if (file.size > FILE_UPLOAD_CONFIG.maxFileSize) {
      return { 
        isValid: false, 
        error: 'File size exceeds 5MB limit' 
      };
    }

    return { isValid: true };
  };

  // Validate total file size
  const validateTotalSize = (files: File[]): { isValid: boolean; error?: string } => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > FILE_UPLOAD_CONFIG.maxTotalSize) {
      return { 
        isValid: false, 
        error: 'Total file size exceeds 20MB limit' 
      };
    }
    return { isValid: true };
  };

  // Add file with validation
  const addFile = async (file: File): Promise<boolean> => {
    if (uploadedFiles.value.length >= FILE_UPLOAD_CONFIG.maxFiles) {
      return false;
    }

    const validation = validateFile(file);
    if (!validation.isValid) {
      uploadedFiles.value.push({
        file,
        progress: 0,
        error: validation.error
      });
      return false;
    }

    // Simulate upload progress
    const uploadEntry: UploadedFile = {
      file,
      progress: 0
    };
    uploadedFiles.value.push(uploadEntry);

    // Simulate upload
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 100));
      uploadEntry.progress = progress;
    }

    return true;
  };

  // Remove file
  const removeFile = (index: number) => {
    uploadedFiles.value.splice(index, 1);
  };

  // Clear all files
  const clearFiles = () => {
    uploadedFiles.value = [];
  };

  // Generate reference ID
  const generateReferenceId = (): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LR-${timestamp}-${random}`;
  };

  // Submit leave request
  const submitLeaveRequest = async (
    leaveTypeId: string,
    startDate: string,
    endDate: string,
    reason?: string
  ): Promise<LeaveRequestSubmission> => {
    isSubmitting.value = true;

    // Simulate API delay (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = calculateWeekdays(start, end);

    const submission: LeaveRequestSubmission = {
      id: generateReferenceId(),
      leaveTypeId,
      leaveTypeName: getLeaveTypeName(leaveTypeId),
      startDate,
      endDate,
      totalDays,
      reason,
      files: uploadedFiles.value
        .filter(uf => !uf.error)
        .map(uf => ({
          name: uf.file.name,
          size: uf.file.size
        })),
      submittedAt: new Date().toISOString()
    };

    // Add to existing requests (simulating backend storage)
    existingRequests.value.push({
      id: submission.id,
      leaveTypeId,
      leaveTypeName: submission.leaveTypeName,
      startDate,
      endDate,
      status: 'pending',
      submittedAt: submission.submittedAt,
      reason
    });

    // Update balance (simulating backend update)
    const balance = getLeaveBalance(leaveTypeId);
    if (balance) {
      balance.available -= totalDays;
      balance.used += totalDays;
    }

    isSubmitting.value = false;
    return submission;
  };

  // Reset state for new request
  const resetState = () => {
    clearFiles();
    isSubmitting.value = false;
  };

  // Get available leave types with balances
  const availableLeaveTypes = computed(() => {
    return leaveBalances.value.map(balance => ({
      value: balance.leaveTypeId,
      label: `${balance.leaveTypeName} (${balance.available} days available)`,
      available: balance.available,
      disabled: balance.available <= 0
    }));
  });

  return {
    // State
    leaveBalances,
    existingRequests,
    isSubmitting,
    uploadedFiles,
    
    // Computed
    availableLeaveTypes,
    
    // Methods
    getLeaveBalance,
    getLeaveTypeName,
    isWeekend,
    isPastDate,
    calculateWeekdays,
    formatDate,
    checkOverlap,
    validateStartDate,
    validateEndDate,
    validateDateRange,
    validateFile,
    validateTotalSize,
    addFile,
    removeFile,
    clearFiles,
    submitLeaveRequest,
    resetState
  };
}
