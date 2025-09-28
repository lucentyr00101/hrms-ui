import { DUMMY_CANDIDATES } from '~/constants/CANDIDATE_DATA';
import type { Candidate, CandidateFilters, CandidateSortOptions, InterviewStage, CandidateStatus } from '~/types';

export function useCandidates() {
  // Reactive data
  const searchQuery = ref('');
  const filters = ref<CandidateFilters>({});
  const sortOptions = ref<CandidateSortOptions>({
    field: 'applicationDate',
    direction: 'desc'
  });
  
  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  
  // Load candidates data (in real app, this would come from an API)
  const candidates = ref<Candidate[]>(DUMMY_CANDIDATES);
  
  // Computed properties
  const allFilteredCandidates = computed(() => {
    let filtered = candidates.value;
    
    // Apply search filter
    if (searchQuery.value && searchQuery.value.trim()) {
      const query = searchQuery.value.trim().toLowerCase();
      filtered = filtered.filter(candidate => {
        const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
        const searchFields = [
          fullName,
          candidate.firstName.toLowerCase(),
          candidate.lastName.toLowerCase(),
          candidate.email.toLowerCase(),
          candidate.position.toLowerCase(),
          candidate.department.toLowerCase(),
          candidate.phone.replace(/\D/g, ''),
          ...candidate.skills.map(skill => skill.toLowerCase())
        ];
        
        return searchFields.some(field => field.includes(query));
      });
    }
    
    // Apply filters
    if (filters.value.position) {
      filtered = filtered.filter(candidate => candidate.position === filters.value.position);
    }
    
    if (filters.value.department) {
      filtered = filtered.filter(candidate => candidate.department === filters.value.department);
    }
    
    if (filters.value.stage) {
      filtered = filtered.filter(candidate => candidate.interviewStage === filters.value.stage);
    }
    
    if (filters.value.status) {
      filtered = filtered.filter(candidate => candidate.status === filters.value.status);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const { field, direction } = sortOptions.value;
      let aValue: any;
      let bValue: any;
      
      switch (field) {
        case 'applicationDate':
          aValue = new Date(a.applicationDate);
          bValue = new Date(b.applicationDate);
          break;
        case 'position':
          aValue = a.position.toLowerCase();
          bValue = b.position.toLowerCase();
          break;
        case 'interviewStage':
          // Define stage order for sorting
          const stageOrder: Record<InterviewStage, number> = {
            'applied': 1,
            'screening': 2,
            'technical': 3,
            'final': 4,
            'offer': 5,
            'hired': 6,
            'rejected': 7
          };
          aValue = stageOrder[a.interviewStage];
          bValue = stageOrder[b.interviewStage];
          break;
        case 'firstName':
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
          break;
        default:
          aValue = a[field];
          bValue = b[field];
      }
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  });
  
  const filteredCandidates = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return allFilteredCandidates.value.slice(start, end);
  });
  
  const totalPages = computed(() => 
    Math.ceil(allFilteredCandidates.value.length / itemsPerPage.value)
  );
  
  const hasFilters = computed(() => 
    searchQuery.value || 
    filters.value.position || 
    filters.value.department || 
    filters.value.stage || 
    filters.value.status
  );
  
  // Methods
  const handleSearch = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1;
  };
  
  const handleFilterChange = (newFilters: CandidateFilters) => {
    filters.value = { ...newFilters };
    currentPage.value = 1;
  };
  
  const handleSortChange = (options: CandidateSortOptions) => {
    sortOptions.value = { ...options };
  };
  
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };
  
  const clearFilters = () => {
    searchQuery.value = '';
    filters.value = {};
    currentPage.value = 1;
  };
  
  // Get unique values for filter options
  const uniquePositions = computed(() => 
    [...new Set(candidates.value.map(c => c.position))].sort()
  );
  
  const uniqueDepartments = computed(() => 
    [...new Set(candidates.value.map(c => c.department))].sort()
  );
  
  const uniqueStages = computed((): InterviewStage[] => 
    ['applied', 'screening', 'technical', 'final', 'offer', 'hired', 'rejected']
  );
  
  const uniqueStatuses = computed((): CandidateStatus[] => 
    ['active', 'scheduled', 'completed', 'rejected', 'withdrawn', 'hired']
  );
  
  return {
    // Data
    searchQuery,
    filters,
    sortOptions,
    candidates,
    
    // Computed
    allFilteredCandidates,
    filteredCandidates,
    totalPages,
    hasFilters,
    currentPage,
    itemsPerPage,
    uniquePositions,
    uniqueDepartments,
    uniqueStages,
    uniqueStatuses,
    
    // Methods
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
  };
}