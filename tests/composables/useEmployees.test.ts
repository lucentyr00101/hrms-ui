import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useEmployees, useEmployeeStatusMeta } from '~/composables/useEmployees'
import type { Employee } from '~/types'

vi.mock('~/composables/useEmployeeDirectory', () => ({
  useEmployeeDirectory: () => ({
    employees: ref<Employee[]>([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '555-0001',
        position: 'Software Engineer',
        department: 'Engineering',
        status: 'active',
        startDate: '2023-01-15',
        employeeId: 'EMP001'
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '555-0002',
        position: 'Product Manager',
        department: 'Product',
        status: 'active',
        startDate: '2023-02-01',
        employeeId: 'EMP002'
      },
      {
        id: '3',
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob.wilson@example.com',
        phone: '555-0003',
        position: 'Designer',
        department: 'Design',
        status: 'on-leave',
        startDate: '2023-03-10',
        employeeId: 'EMP003'
      }
    ])
  })
}))

describe('useEmployeeStatusMeta', () => {
  it('returns correct meta for active status', () => {
    const meta = useEmployeeStatusMeta('active')
    expect(meta.label).toBe('Active')
    expect(meta.color).toBe('success')
  })

  it('returns correct meta for inactive status', () => {
    const meta = useEmployeeStatusMeta('inactive')
    expect(meta.label).toBe('Inactive')
    expect(meta.color).toBe('error')
  })

  it('returns correct meta for on-leave status', () => {
    const meta = useEmployeeStatusMeta('on-leave')
    expect(meta.label).toBe('On Leave')
    expect(meta.color).toBe('warning')
  })
})

describe('useEmployees', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with default values', () => {
    const {
      viewMode,
      searchQuery,
      departmentFilter,
      statusFilter,
      currentPage,
      itemsPerPage
    } = useEmployees()

    expect(viewMode.value).toBe('card')
    expect(searchQuery.value).toBe('')
    expect(departmentFilter.value).toBeUndefined()
    expect(statusFilter.value).toBeUndefined()
    expect(currentPage.value).toBe(1)
    expect(itemsPerPage.value).toBe(6)
  })

  it('filters employees by search query', () => {
    const { handleSearch, allFilteredEmployees } = useEmployees()
    
    handleSearch('John')
    expect(allFilteredEmployees.value).toHaveLength(1)
    expect(allFilteredEmployees.value[0].firstName).toBe('John')
  })

  it('filters employees by department', () => {
    const { handleFilterChange, allFilteredEmployees } = useEmployees()
    
    handleFilterChange({ department: 'Engineering' })
    expect(allFilteredEmployees.value).toHaveLength(1)
    expect(allFilteredEmployees.value[0].department).toBe('Engineering')
  })

  it('filters employees by status', () => {
    const { handleFilterChange, allFilteredEmployees } = useEmployees()
    
    handleFilterChange({ status: 'on-leave' })
    expect(allFilteredEmployees.value).toHaveLength(1)
    expect(allFilteredEmployees.value[0].status).toBe('on-leave')
  })

  it('combines multiple filters', () => {
    const { handleSearch, handleFilterChange, allFilteredEmployees } = useEmployees()
    
    handleSearch('Doe')
    handleFilterChange({ department: 'Engineering', status: 'active' })
    expect(allFilteredEmployees.value).toHaveLength(1)
    expect(allFilteredEmployees.value[0].firstName).toBe('John')
  })

  it('paginates results correctly', () => {
    const { filteredEmployees, itemsPerPage, currentPage } = useEmployees()
    
    itemsPerPage.value = 2
    currentPage.value = 1
    expect(filteredEmployees.value).toHaveLength(2)
    
    currentPage.value = 2
    expect(filteredEmployees.value).toHaveLength(1)
  })

  it('calculates total pages correctly', () => {
    const { totalPages, itemsPerPage } = useEmployees()
    
    itemsPerPage.value = 2
    expect(totalPages.value).toBe(2)
  })

  it('detects when filters are applied', () => {
    const { handleSearch, hasFilters } = useEmployees()
    
    expect(hasFilters.value).toBe(false)
    
    handleSearch('test')
    expect(hasFilters.value).toBe(true)
  })

  it('clears all filters', () => {
    const { handleSearch, handleFilterChange, clearFilters, hasFilters } = useEmployees()
    
    handleSearch('test')
    handleFilterChange({ department: 'Engineering' })
    expect(hasFilters.value).toBe(true)
    
    clearFilters()
    expect(hasFilters.value).toBe(false)
  })

  it('changes view mode', () => {
    const { viewMode, handleViewChange } = useEmployees()
    
    expect(viewMode.value).toBe('card')
    handleViewChange('table')
    expect(viewMode.value).toBe('table')
  })

  it('resets to page 1 when search changes', () => {
    const { currentPage, handlePageChange, handleSearch } = useEmployees()
    
    handlePageChange(2)
    expect(currentPage.value).toBe(2)
    
    handleSearch('new search')
    expect(currentPage.value).toBe(1)
  })
})
