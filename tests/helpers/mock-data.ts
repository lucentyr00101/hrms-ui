import type { Employee } from '~/types'

export const mockEmployees: Employee[] = [
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
    employeeId: 'EMP001',
    manager: 'Jane Smith',
    hireDate: '2023-01-15',
    dateOfBirth: '1990-05-15',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    salary: 120000,
    employmentType: 'fullTime',
    workLocation: 'hybrid'
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
    employeeId: 'EMP002',
    manager: 'Bob Wilson',
    hireDate: '2023-02-01',
    dateOfBirth: '1988-08-20',
    address: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA'
    },
    salary: 135000,
    employmentType: 'fullTime',
    workLocation: 'office'
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
    employeeId: 'EMP003',
    manager: 'Jane Smith',
    hireDate: '2023-03-10',
    dateOfBirth: '1992-12-05',
    address: {
      street: '789 Pine Rd',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA'
    },
    salary: 105000,
    employmentType: 'fullTime',
    workLocation: 'remote'
  }
]

export const createMockEmployee = (overrides?: Partial<Employee>): Employee => ({
  id: '999',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '555-9999',
  position: 'Test Position',
  department: 'Test Department',
  status: 'active',
  startDate: '2024-01-01',
  employeeId: 'TEST999',
  ...overrides
})
