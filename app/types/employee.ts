export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
  startDate: string;
  avatar?: string;
  employeeId: string;
  // Extended fields for profile page
  manager?: string;
  hireDate?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  salary?: number;
  employmentType?: 'fullTime' | 'partTime' | 'contractor';
  workLocation?: 'office' | 'remote' | 'hybrid';
}

export interface EmployeeDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc';
  size: number;
  uploadDate: string;
  category: 'contract' | 'identification' | 'certificate' | 'other';
  url: string;
}

export interface ActivityItem {
  id: string;
  type: 'hire' | 'promotion' | 'leave' | 'document' | 'review' | 'update';
  title: string;
  description: string;
  date: string;
  time: string;
  user: string;
}

// Filter and view types
export interface EmployeeFilters {
  search: string;
  department: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export type ViewMode = 'card' | 'table';

// Employee form data
export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  employeeId: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  salary: number;
  employmentType: 'fullTime' | 'partTime' | 'contractor';
  workLocation: 'office' | 'remote' | 'hybrid';
}