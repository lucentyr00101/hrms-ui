import type { InterviewSlot, InterviewScheduleForm, InterviewFilters, CalendarEvent } from '~/types';
import { DUMMY_INTERVIEW_SLOTS } from '~/constants/INTERVIEW_SLOTS_DATA';

export const useInterviewSlots = () => {
  const interviewSlots = ref<InterviewSlot[]>([...DUMMY_INTERVIEW_SLOTS]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Get all interview slots
  const getAllSlots = () => {
    return interviewSlots.value;
  };

  // Get slots for a specific date range
  const getSlotsByDateRange = (startDate: string, endDate: string) => {
    return interviewSlots.value.filter(slot => {
      return slot.date >= startDate && slot.date <= endDate;
    });
  };

  // Get slots for a specific date
  const getSlotsByDate = (date: string) => {
    return interviewSlots.value.filter(slot => slot.date === date);
  };

  // Create a new interview slot
  const createSlot = async (formData: InterviewScheduleForm): Promise<InterviewSlot> => {
    isLoading.value = true;
    error.value = null;

    try {
      const newSlot: InterviewSlot = {
        id: `slot_${Date.now()}`,
        candidateId: formData.candidateId,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        interviewer: formData.interviewer,
        interviewType: formData.interviewType,
        status: 'scheduled',
        location: formData.location,
        notes: formData.notes,
        meetingLink: formData.meetingLink,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      interviewSlots.value.push(newSlot);
      return newSlot;
    } catch (err) {
      error.value = 'Failed to create interview slot';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Update an existing interview slot
  const updateSlot = async (id: string, updates: Partial<InterviewSlot>): Promise<InterviewSlot> => {
    isLoading.value = true;
    error.value = null;

    try {
      const index = interviewSlots.value.findIndex(slot => slot.id === id);
      if (index === -1) {
        throw new Error('Interview slot not found');
      }

      const updatedSlot = {
        ...interviewSlots.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      interviewSlots.value[index] = updatedSlot;
      return updatedSlot;
    } catch (err) {
      error.value = 'Failed to update interview slot';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Delete an interview slot
  const deleteSlot = async (id: string): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const index = interviewSlots.value.findIndex(slot => slot.id === id);
      if (index === -1) {
        throw new Error('Interview slot not found');
      }

      interviewSlots.value.splice(index, 1);
    } catch (err) {
      error.value = 'Failed to delete interview slot';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Get slot by ID
  const getSlotById = (id: string): InterviewSlot | undefined => {
    return interviewSlots.value.find(slot => slot.id === id);
  };

  // Convert slots to calendar events
  const slotsToCalendarEvents = (slots: InterviewSlot[]): CalendarEvent[] => {
    return slots.map(slot => {
      const startDateTime = new Date(`${slot.date}T${slot.startTime}:00`);
      const endDateTime = new Date(`${slot.date}T${slot.endTime}:00`);
      
      const statusColors = {
        pending: '#gray-400',
        scheduled: '#blue-500',
        completed: '#green-500',
        cancelled: '#red-500',
        rejected: '#red-600',
        rescheduled: '#yellow-500'
      };

      return {
        id: slot.id,
        title: slot.candidateName ? `${slot.candidateName} - ${slot.interviewType}` : `Open Slot - ${slot.interviewType}`,
        start: startDateTime,
        end: endDateTime,
        color: statusColors[slot.status] || '#gray-400',
        data: slot
      };
    });
  };

  // Filter slots
  const getFilteredSlots = (filters: InterviewFilters): InterviewSlot[] => {
    let filtered = [...interviewSlots.value];

    if (filters.dateRange) {
      filtered = filtered.filter(slot => 
        slot.date >= filters.dateRange!.start && slot.date <= filters.dateRange!.end
      );
    }

    if (filters.interviewer) {
      filtered = filtered.filter(slot => 
        slot.interviewer.toLowerCase().includes(filters.interviewer!.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(slot => slot.status === filters.status);
    }

    if (filters.interviewType) {
      filtered = filtered.filter(slot => slot.interviewType === filters.interviewType);
    }

    return filtered;
  };

  // Utility function to check for scheduling conflicts
  const hasConflict = (date: string, startTime: string, endTime: string, excludeId?: string): boolean => {
    const newStart = new Date(`${date}T${startTime}:00`);
    const newEnd = new Date(`${date}T${endTime}:00`);

    return interviewSlots.value.some(slot => {
      if (excludeId && slot.id === excludeId) return false;
      if (slot.date !== date) return false;

      const slotStart = new Date(`${slot.date}T${slot.startTime}:00`);
      const slotEnd = new Date(`${slot.date}T${slot.endTime}:00`);

      return (newStart < slotEnd && newEnd > slotStart);
    });
  };

  return {
    interviewSlots: readonly(interviewSlots),
    isLoading: readonly(isLoading),
    error: readonly(error),
    getAllSlots,
    getSlotsByDateRange,
    getSlotsByDate,
    createSlot,
    updateSlot,
    deleteSlot,
    getSlotById,
    slotsToCalendarEvents,
    getFilteredSlots,
    hasConflict
  };
};