import { ref, computed } from 'vue';
import { LEAVE_TYPES_DATA } from '~/constants/leave-types';
import type { LeaveType, LeaveStatus, LeaveTypeFormData } from '~/types';

export function useLeaveTypes() {
  // State
  const leaveTypes = ref<LeaveType[]>([...LEAVE_TYPES_DATA]);
  const searchQuery = ref('');
  const statusFilter = ref<'all' | LeaveStatus>('all');
  const sortBy = ref<'name' | 'status' | 'created' | 'modified' | 'usage'>('name');
  const sortOrder = ref<'asc' | 'desc'>('asc');
  const selectedLeaveTypes = ref<string[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  // Computed properties
  const filteredLeaveTypes = computed(() => {
    let filtered = [...leaveTypes.value];

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter((leaveType) =>
        leaveType.name.toLowerCase().includes(query) ||
        leaveType.code.toLowerCase().includes(query) ||
        leaveType.description?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter.value !== 'all') {
      filtered = filtered.filter((leaveType) => leaveType.status === statusFilter.value);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy.value) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'modified':
          comparison = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
          break;
        case 'usage':
          comparison = a.usageCount - b.usageCount;
          break;
      }

      return sortOrder.value === 'asc' ? comparison : -comparison;
    });

    return filtered;
  });

  const paginatedLeaveTypes = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredLeaveTypes.value.slice(start, end);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredLeaveTypes.value.length / itemsPerPage.value);
  });

  const activeLeaveTypesCount = computed(() => {
    return leaveTypes.value.filter((lt) => lt.status === 'active').length;
  });

  const inactiveLeaveTypesCount = computed(() => {
    return leaveTypes.value.filter((lt) => lt.status === 'inactive').length;
  });

  const mostUsedLeaveType = computed(() => {
    if (leaveTypes.value.length === 0) return null;
    return [...leaveTypes.value].sort((a, b) => b.usageCount - a.usageCount)[0];
  });

  // Methods
  const getLeaveTypeById = (id: string): LeaveType | undefined => {
    return leaveTypes.value.find((lt) => lt.id === id);
  };

  const createLeaveType = (data: LeaveTypeFormData): LeaveType => {
    const newId = `LT${String(leaveTypes.value.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString().split('T')[0];
    
    const newLeaveType: LeaveType = {
      ...data,
      id: newId,
      usageCount: 0,
      approvalRate: 0,
      createdBy: 'HR Admin',
      createdAt: now,
      modifiedBy: 'HR Admin',
      modifiedAt: now
    };

    leaveTypes.value.push(newLeaveType);
    return newLeaveType;
  };

  const updateLeaveType = (id: string, data: Partial<LeaveTypeFormData>): LeaveType | null => {
    const index = leaveTypes.value.findIndex((lt) => lt.id === id);
    if (index === -1) return null;

    const now = new Date().toISOString().split('T')[0];
    leaveTypes.value[index] = {
      ...leaveTypes.value[index],
      ...data,
      modifiedBy: 'HR Admin',
      modifiedAt: now
    };

    return leaveTypes.value[index];
  };

  const deleteLeaveType = (id: string): boolean => {
    const index = leaveTypes.value.findIndex((lt) => lt.id === id);
    if (index === -1) return false;

    leaveTypes.value.splice(index, 1);
    return true;
  };

  const toggleLeaveTypeStatus = (id: string): boolean => {
    const leaveType = leaveTypes.value.find((lt) => lt.id === id);
    if (!leaveType) return false;

    leaveType.status = leaveType.status === 'active' ? 'inactive' : 'active';
    leaveType.modifiedBy = 'HR Admin';
    leaveType.modifiedAt = new Date().toISOString().split('T')[0];
    return true;
  };

  const duplicateLeaveType = (id: string): LeaveType | null => {
    const original = getLeaveTypeById(id);
    if (!original) return null;

    const newId = `LT${String(leaveTypes.value.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString().split('T')[0];

    const duplicate: LeaveType = {
      ...original,
      id: newId,
      name: `${original.name} (Copy)`,
      code: `${original.code}C`,
      usageCount: 0,
      approvalRate: 0,
      createdBy: 'HR Admin',
      createdAt: now,
      modifiedBy: 'HR Admin',
      modifiedAt: now
    };

    leaveTypes.value.push(duplicate);
    return duplicate;
  };

  const bulkActivate = (ids: string[]): number => {
    let count = 0;
    ids.forEach((id) => {
      const leaveType = leaveTypes.value.find((lt) => lt.id === id);
      if (leaveType && leaveType.status === 'inactive') {
        leaveType.status = 'active';
        leaveType.modifiedBy = 'HR Admin';
        leaveType.modifiedAt = new Date().toISOString().split('T')[0];
        count++;
      }
    });
    return count;
  };

  const bulkDeactivate = (ids: string[]): number => {
    let count = 0;
    ids.forEach((id) => {
      const leaveType = leaveTypes.value.find((lt) => lt.id === id);
      if (leaveType && leaveType.status === 'active') {
        leaveType.status = 'inactive';
        leaveType.modifiedBy = 'HR Admin';
        leaveType.modifiedAt = new Date().toISOString().split('T')[0];
        count++;
      }
    });
    return count;
  };

  const bulkDelete = (ids: string[]): number => {
    let count = 0;
    ids.forEach((id) => {
      const index = leaveTypes.value.findIndex((lt) => lt.id === id);
      if (index !== -1) {
        leaveTypes.value.splice(index, 1);
        count++;
      }
    });
    return count;
  };

  const isLeaveTypeNameUnique = (name: string, excludeId?: string): boolean => {
    return !leaveTypes.value.some(
      (lt) => lt.name.toLowerCase() === name.toLowerCase() && lt.id !== excludeId
    );
  };

  const isLeaveTypeCodeUnique = (code: string, excludeId?: string): boolean => {
    return !leaveTypes.value.some(
      (lt) => lt.code.toLowerCase() === code.toLowerCase() && lt.id !== excludeId
    );
  };

  const handleSearch = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };

  const handleStatusFilter = (status: 'all' | LeaveStatus) => {
    statusFilter.value = status;
    currentPage.value = 1;
  };

  const handleSort = (field: 'name' | 'status' | 'created' | 'modified' | 'usage') => {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = field;
      sortOrder.value = 'asc';
    }
  };

  const toggleSelection = (id: string) => {
    const index = selectedLeaveTypes.value.indexOf(id);
    if (index === -1) {
      selectedLeaveTypes.value.push(id);
    } else {
      selectedLeaveTypes.value.splice(index, 1);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeaveTypes.value.length === paginatedLeaveTypes.value.length) {
      selectedLeaveTypes.value = [];
    } else {
      selectedLeaveTypes.value = paginatedLeaveTypes.value.map((lt) => lt.id);
    }
  };

  const clearSelection = () => {
    selectedLeaveTypes.value = [];
  };

  const clearFilters = () => {
    searchQuery.value = '';
    statusFilter.value = 'all';
    currentPage.value = 1;
  };

  return {
    // State
    leaveTypes,
    searchQuery,
    statusFilter,
    sortBy,
    sortOrder,
    selectedLeaveTypes,
    currentPage,
    itemsPerPage,
    
    // Computed
    filteredLeaveTypes,
    paginatedLeaveTypes,
    totalPages,
    activeLeaveTypesCount,
    inactiveLeaveTypesCount,
    mostUsedLeaveType,
    
    // Methods
    getLeaveTypeById,
    createLeaveType,
    updateLeaveType,
    deleteLeaveType,
    toggleLeaveTypeStatus,
    duplicateLeaveType,
    bulkActivate,
    bulkDeactivate,
    bulkDelete,
    isLeaveTypeNameUnique,
    isLeaveTypeCodeUnique,
    handleSearch,
    handleStatusFilter,
    handleSort,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    clearFilters
  };
}
