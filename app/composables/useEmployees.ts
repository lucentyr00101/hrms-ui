import { DUMMY_EMPLOYEES } from '~/constants/EMPLOYEE_DATA';
import type { Employee, ViewMode } from '~/types';

export function useEmployees() {
  // Reactive data
  const viewMode = ref<ViewMode>('card');
  const searchQuery = ref('');
  const departmentFilter = ref<string | undefined>(undefined);
  const statusFilter = ref<string | undefined>(undefined);
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  
  // Load employees data (in real app, this would come from an API)
  const employees = ref<Employee[]>(DUMMY_EMPLOYEES);
  
  // Computed properties
  const allFilteredEmployees = computed(() => {
    let filtered = employees.value;
    
    // Apply search filter
    if (searchQuery.value && searchQuery.value.trim()) {
      const query = searchQuery.value.trim().toLowerCase();
      filtered = filtered.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        const searchFields = [
          fullName,
          emp.firstName.toLowerCase(),
          emp.lastName.toLowerCase(),
          emp.email.toLowerCase(),
          emp.position.toLowerCase(),
          emp.department.toLowerCase(),
          emp.employeeId.toLowerCase(),
          emp.phone.replace(/\D/g, '')
        ];
        
        return searchFields.some(field => field.includes(query));
      });
    }
    
    // Apply department filter
    if (departmentFilter.value) {
      filtered = filtered.filter(emp => emp.department === departmentFilter.value);
    }
    
    // Apply status filter
    if (statusFilter.value) {
      filtered = filtered.filter(emp => emp.status === statusFilter.value);
    }
    
    return filtered;
  });
  
  const filteredEmployees = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return allFilteredEmployees.value.slice(start, end);
  });
  
  const totalPages = computed(() => 
    Math.ceil(allFilteredEmployees.value.length / itemsPerPage.value)
  );
  
  const hasFilters = computed(() => 
    departmentFilter.value || statusFilter.value || (searchQuery.value && searchQuery.value.trim())
  );
  
  // Update current page when filtered employees change
  watchEffect(() => {
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = 1;
    }
  });
  
  // Event handlers
  const handleSearch = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };
  
  const handleFilterChange = (filters: { department?: string; status?: string }) => {
    departmentFilter.value = filters.department;
    statusFilter.value = filters.status;
    currentPage.value = 1;
  };
  
  const handleViewChange = (mode: ViewMode) => {
    viewMode.value = mode;
  };
  
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };
  
  const clearFilters = () => {
    searchQuery.value = '';
    departmentFilter.value = undefined;
    statusFilter.value = undefined;
    currentPage.value = 1;
  };
  
  return {
    // Data
    viewMode,
    searchQuery,
    employees,
    
    // Computed
    allFilteredEmployees,
    filteredEmployees,
    totalPages,
    hasFilters,
    currentPage,
    itemsPerPage,
    
    // Methods
    handleSearch,
    handleFilterChange,
    handleViewChange,
    handlePageChange,
    clearFilters,
  };
}