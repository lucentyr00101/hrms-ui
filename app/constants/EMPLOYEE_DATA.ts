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

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Design',
  'Customer Support'
] as const;

export const EMPLOYEE_STATUSES = [
  'active',
  'inactive', 
  'on-leave'
] as const;

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

export const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: '1',
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'active',
    startDate: '2022-01-15',
    employeeId: 'EMP001',
    manager: 'Sarah Johnson',
    hireDate: '2022-01-15',
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
    workLocation: 'hybrid'
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Kim',
    email: 'robert.kim@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Marketing Manager',
    department: 'Marketing',
    status: 'active',
    startDate: '2021-06-10',
    employeeId: 'EMP002',
    manager: 'Lisa Wang',
    hireDate: '2021-06-10',
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
    workLocation: 'office'
  },
  {
    id: '3',
    firstName: 'Amanda',
    lastName: 'Thompson',
    email: 'amanda.thompson@company.com',
    phone: '+1 (555) 345-6789',
    position: 'HR Specialist',
    department: 'HR',
    status: 'on-leave',
    startDate: '2020-03-22',
    employeeId: 'EMP003'
  },
  {
    id: '4',
    firstName: 'Michael',
    lastName: 'Lee',
    email: 'michael.lee@company.com',
    phone: '+1 (555) 456-7890',
    position: 'Sales Representative',
    department: 'Sales',
    status: 'active',
    startDate: '2023-04-01',
    employeeId: 'EMP004'
  },
  {
    id: '5',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 567-8901',
    position: 'UX Designer',
    department: 'Design',
    status: 'active',
    startDate: '2022-09-15',
    employeeId: 'EMP005'
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@company.com',
    phone: '+1 (555) 678-9012',
    position: 'Financial Analyst',
    department: 'Finance',
    status: 'active',
    startDate: '2021-11-08',
    employeeId: 'EMP006'
  },
  {
    id: '7',
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@company.com',
    phone: '+1 (555) 789-0123',
    position: 'Product Manager',
    department: 'Engineering',
    status: 'active',
    startDate: '2020-07-12',
    employeeId: 'EMP007'
  },
  {
    id: '8',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 890-1234',
    position: 'DevOps Engineer',
    department: 'Engineering',
    status: 'inactive',
    startDate: '2019-12-03',
    employeeId: 'EMP008'
  },
  {
    id: '9',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 901-2345',
    position: 'Customer Support Lead',
    department: 'Customer Support',
    status: 'active',
    startDate: '2022-02-28',
    employeeId: 'EMP009'
  },
  {
    id: '10',
    firstName: 'Alex',
    lastName: 'Rodriguez',
    email: 'alex.rodriguez@company.com',
    phone: '+1 (555) 012-3456',
    position: 'Operations Manager',
    department: 'Operations',
    status: 'active',
    startDate: '2021-05-17',
    employeeId: 'EMP010'
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
      uploadDate: '2022-01-15',
      category: 'contract',
      url: '/documents/contract-1.pdf'
    },
    {
      id: 'd2',
      name: 'Driver License.jpg',
      type: 'image',
      size: 125000,
      uploadDate: '2022-01-15',
      category: 'identification',
      url: '/documents/id-1.jpg'
    },
    {
      id: 'd3',
      name: 'Degree Certificate.pdf',
      type: 'pdf',
      size: 890000,
      uploadDate: '2022-02-01',
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
      uploadDate: '2021-06-10',
      category: 'contract',
      url: '/documents/contract-2.pdf'
    },
    {
      id: 'd5',
      name: 'Marketing Certification.pdf',
      type: 'pdf',
      size: 567000,
      uploadDate: '2022-03-15',
      category: 'certificate',
      url: '/documents/cert-2.pdf'
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
      date: '2022-01-15',
      time: '09:00 AM',
      user: 'HR System'
    },
    {
      id: 'a2',
      type: 'document',
      title: 'Document Uploaded',
      description: 'Degree Certificate uploaded',
      date: '2022-02-01',
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
      date: '2024-10-15',
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
      date: '2021-06-10',
      time: '10:00 AM',
      user: 'HR System'
    },
    {
      id: 'a6',
      type: 'document',
      title: 'Document Uploaded',
      description: 'Marketing Certification uploaded',
      date: '2022-03-15',
      time: '04:20 PM',
      user: 'Robert Kim'
    },
    {
      id: 'a7',
      type: 'update',
      title: 'Profile Updated',
      description: 'Contact information updated',
      date: '2024-11-20',
      time: '01:10 PM',
      user: 'Robert Kim'
    }
  ]
};
