export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  manager: string;
  hireDate: string;
  employeeId: string;
  status: 'active' | 'inactive' | 'onLeave';
  avatar?: string;
  // Personal Information
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  // Job Details
  salary: number;
  employmentType: 'fullTime' | 'partTime' | 'contractor';
  workLocation: 'office' | 'remote' | 'hybrid';
  startDate: string;
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

// Dummy employee data
export const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: '1',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    manager: 'Sarah Johnson',
    hireDate: '2023-01-15',
    employeeId: 'EMP001',
    status: 'active',
    dateOfBirth: '1990-05-12',
    address: {
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA'
    },
    salary: 95000,
    employmentType: 'fullTime',
    workLocation: 'hybrid',
    startDate: '2023-01-15'
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Kim',
    email: 'robert.kim@company.com',
    phone: '+1 (555) 987-6543',
    position: 'Marketing Manager',
    department: 'Marketing',
    manager: 'Lisa Wang',
    hireDate: '2022-08-20',
    employeeId: 'EMP002',
    status: 'active',
    dateOfBirth: '1988-11-08',
    address: {
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    salary: 75000,
    employmentType: 'fullTime',
    workLocation: 'office',
    startDate: '2022-08-20'
  },
  {
    id: '3',
    firstName: 'Amanda',
    lastName: 'Thompson',
    email: 'amanda.thompson@company.com',
    phone: '+1 (555) 456-7890',
    position: 'HR Specialist',
    department: 'HR',
    manager: 'David Brown',
    hireDate: '2021-03-10',
    employeeId: 'EMP003',
    status: 'onLeave',
    dateOfBirth: '1992-03-22',
    address: {
      street: '789 Corporate Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    salary: 65000,
    employmentType: 'fullTime',
    workLocation: 'office',
    startDate: '2021-03-10'
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Lee',
    email: 'michael.lee@company.com',
    phone: '+1 (555) 321-9876',
    position: 'Sales Representative',
    department: 'Sales',
    manager: 'Mike Chen',
    hireDate: '2023-06-01',
    employeeId: 'EMP004',
    status: 'active',
    dateOfBirth: '1995-07-18',
    address: {
      street: '321 Commerce St',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    salary: 55000,
    employmentType: 'fullTime',
    workLocation: 'remote',
    startDate: '2023-06-01'
  },
  {
    id: '5',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 654-3210',
    position: 'Engineering Manager',
    department: 'Engineering',
    manager: 'CEO',
    hireDate: '2020-02-01',
    employeeId: 'EMP005',
    status: 'active',
    dateOfBirth: '1986-09-14',
    address: {
      street: '567 Innovation Dr',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    salary: 120000,
    employmentType: 'fullTime',
    workLocation: 'hybrid',
    startDate: '2020-02-01'
  }
];

// Dummy documents data
export const DUMMY_EMPLOYEE_DOCUMENTS: Record<string, EmployeeDocument[]> = {
  '1': [
    {
      id: 'd1',
      name: 'Employment Contract.pdf',
      type: 'pdf',
      size: 256000,
      uploadDate: '2023-01-15',
      category: 'contract',
      url: '/documents/contract-1.pdf'
    },
    {
      id: 'd2',
      name: 'Driver License.jpg',
      type: 'image',
      size: 125000,
      uploadDate: '2023-01-15',
      category: 'identification',
      url: '/documents/id-1.jpg'
    },
    {
      id: 'd3',
      name: 'Degree Certificate.pdf',
      type: 'pdf',
      size: 890000,
      uploadDate: '2023-02-01',
      category: 'certificate',
      url: '/documents/cert-1.pdf'
    }
  ],
  '2': [
    {
      id: 'd4',
      name: 'Employment Agreement.pdf',
      type: 'pdf',
      size: 234000,
      uploadDate: '2022-08-20',
      category: 'contract',
      url: '/documents/contract-2.pdf'
    },
    {
      id: 'd5',
      name: 'Marketing Certification.pdf',
      type: 'pdf',
      size: 567000,
      uploadDate: '2023-03-15',
      category: 'certificate',
      url: '/documents/cert-2.pdf'
    }
  ],
  '3': [
    {
      id: 'd6',
      name: 'HR Contract.pdf',
      type: 'pdf',
      size: 198000,
      uploadDate: '2021-03-10',
      category: 'contract',
      url: '/documents/contract-3.pdf'
    }
  ]
};

// Dummy activity timeline data
export const DUMMY_EMPLOYEE_ACTIVITIES: Record<string, ActivityItem[]> = {
  '1': [
    {
      id: 'a1',
      type: 'hire',
      title: 'Employee Hired',
      description: 'Jennifer Martinez joined as Senior Software Engineer',
      date: '2023-01-15',
      time: '09:00 AM',
      user: 'HR System'
    },
    {
      id: 'a2',
      type: 'document',
      title: 'Document Uploaded',
      description: 'Degree Certificate uploaded',
      date: '2023-02-01',
      time: '02:30 PM',
      user: 'Jennifer Martinez'
    },
    {
      id: 'a3',
      type: 'promotion',
      title: 'Promotion',
      description: 'Promoted to Senior Software Engineer',
      date: '2023-07-01',
      time: '11:15 AM',
      user: 'Sarah Johnson'
    },
    {
      id: 'a4',
      type: 'review',
      title: 'Performance Review',
      description: 'Quarterly performance review completed',
      date: '2023-10-15',
      time: '03:45 PM',
      user: 'Sarah Johnson'
    }
  ],
  '2': [
    {
      id: 'a5',
      type: 'hire',
      title: 'Employee Hired',
      description: 'Robert Kim joined as Marketing Manager',
      date: '2022-08-20',
      time: '10:00 AM',
      user: 'HR System'
    },
    {
      id: 'a6',
      type: 'document',
      title: 'Document Uploaded',
      description: 'Marketing Certification uploaded',
      date: '2023-03-15',
      time: '04:20 PM',
      user: 'Robert Kim'
    },
    {
      id: 'a7',
      type: 'update',
      title: 'Profile Updated',
      description: 'Contact information updated',
      date: '2023-11-20',
      time: '01:10 PM',
      user: 'Robert Kim'
    }
  ],
  '3': [
    {
      id: 'a8',
      type: 'hire',
      title: 'Employee Hired',
      description: 'Amanda Thompson joined as HR Specialist',
      date: '2021-03-10',
      time: '09:30 AM',
      user: 'HR System'
    },
    {
      id: 'a9',
      type: 'leave',
      title: 'Maternity Leave Started',
      description: 'Started maternity leave',
      date: '2024-09-10',
      time: '12:00 PM',
      user: 'David Brown'
    }
  ]
};