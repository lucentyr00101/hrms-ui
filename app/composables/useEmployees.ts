import type { Employee, ViewMode } from '~/types'
import { useEmployeeDirectory } from '~/composables/useEmployeeDirectory'

interface EmployeeStatusMeta {
  label: string
  color: 'success' | 'error' | 'warning'
}

const STATUS_META: Record<Employee['status'], EmployeeStatusMeta> = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'error' },
  'on-leave': { label: 'On Leave', color: 'warning' }
}

const DEFAULT_STATUS_META: EmployeeStatusMeta = {
  label: 'Unknown',
  color: 'warning'
}

export const useEmployeeStatusMeta = (status: Employee['status']): EmployeeStatusMeta => 
  STATUS_META[status] ?? DEFAULT_STATUS_META

export const useEmployees = () => {
  const viewMode = ref<ViewMode>('card')
  const searchQuery = ref('')
  const departmentFilter = ref<string>()
  const statusFilter = ref<string>()
  const currentPage = ref(1)
  const itemsPerPage = ref(6)

  const { employees } = useEmployeeDirectory()

  const normalizeSearchTerm = (text: string): string => 
    text.toLowerCase().trim()

  const matchesSearch = (employee: Employee, query: string): boolean => {
    const searchFields = [
      `${employee.firstName} ${employee.lastName}`,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.position,
      employee.department,
      employee.employeeId,
      employee.phone.replace(/\D/g, '')
    ]
    
    return searchFields.some(field => 
      normalizeSearchTerm(field).includes(query)
    )
  }

  const allFilteredEmployees = computed(() => {
    let filtered = employees.value

    const query = normalizeSearchTerm(searchQuery.value)
    if (query) {
      filtered = filtered.filter(emp => matchesSearch(emp, query))
    }

    if (departmentFilter.value) {
      filtered = filtered.filter(emp => emp.department === departmentFilter.value)
    }

    if (statusFilter.value) {
      filtered = filtered.filter(emp => emp.status === statusFilter.value)
    }

    return filtered
  })

  const filteredEmployees = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return allFilteredEmployees.value.slice(start, end)
  })

  const totalPages = computed(() => 
    Math.ceil(allFilteredEmployees.value.length / itemsPerPage.value)
  )

  const hasFilters = computed(() => 
    Boolean(departmentFilter.value || statusFilter.value || searchQuery.value.trim())
  )

  watchEffect(() => {
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = 1
    }
  })

  const handleSearch = (query: string): void => {
    searchQuery.value = query
    currentPage.value = 1
  }

  const handleFilterChange = (filters: { department?: string; status?: string }): void => {
    departmentFilter.value = filters.department
    statusFilter.value = filters.status
    currentPage.value = 1
  }

  const handleViewChange = (mode: ViewMode): void => {
    viewMode.value = mode
  }

  const handlePageChange = (page: number): void => {
    currentPage.value = page
  }

  const clearFilters = (): void => {
    searchQuery.value = ''
    departmentFilter.value = undefined
    statusFilter.value = undefined
    currentPage.value = 1
  }

  return {
    viewMode,
    searchQuery,
    employees,
    departmentFilter,
    statusFilter,
    allFilteredEmployees,
    filteredEmployees,
    totalPages,
    hasFilters,
    currentPage,
    itemsPerPage,
    handleSearch,
    handleFilterChange,
    handleViewChange,
    handlePageChange,
    clearFilters,
  }
}
