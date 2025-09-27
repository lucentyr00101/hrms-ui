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
    employeeId: 'EMP001'
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
    employeeId: 'EMP002'
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