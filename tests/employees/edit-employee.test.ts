import { describe, expect, test } from 'bun:test';
import type { EditableEmployeeFormState, Employee } from '../../app/types';
import { createEmptyEditableForm, employeeToEditableForm, mergeEmployeeWithEditableForm } from '../../app/utils/employeeForm';

const buildMockEmployee = (): Employee => ({
  id: 'emp-001',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '+1 555 123 4567',
  position: 'Product Designer',
  department: 'Design',
  status: 'active',
  startDate: '2023-01-15',
  employeeId: 'EMP900',
  manager: 'Alex Rivers',
  hireDate: '2023-01-15',
  dateOfBirth: '1992-09-25',
  address: {
    street: '10 Market Street',
    city: 'Austin',
    state: 'TX',
    zipCode: '73301',
    country: 'USA'
  },
  salary: 95000,
  employmentType: 'fullTime',
  workLocation: 'hybrid'
});

describe('employee form helpers', () => {
  test('createEmptyEditableForm returns blank defaults', () => {
    const form = createEmptyEditableForm();

    expect(form.firstName).toBe('');
    expect(form.lastName).toBe('');
    expect(form.email).toBe('');
    expect(form.phone).toBe('');
    expect(form.street).toBe('');
    expect(form.city).toBe('');
    expect(form.state).toBe('');
    expect(form.zipCode).toBe('');
    expect(form.country).toBe('');
    expect(form.salary).toBe(0);
    expect(form.employmentType).toBeUndefined();
    expect(form.workLocation).toBeUndefined();
  });

  test('employeeToEditableForm flattens nested employee data', () => {
    const form = employeeToEditableForm(buildMockEmployee());

    expect(form.firstName).toBe('Jane');
    expect(form.manager).toBe('Alex Rivers');
    expect(form.street).toBe('10 Market Street');
    expect(form.city).toBe('Austin');
    expect(form.state).toBe('TX');
    expect(form.zipCode).toBe('73301');
    expect(form.country).toBe('USA');
    expect(form.salary).toBe(95000);
    expect(form.employmentType).toBe('fullTime');
    expect(form.workLocation).toBe('hybrid');
  });

  test('mergeEmployeeWithEditableForm keeps immutable metadata and applies form fields', () => {
    const employee: Employee = {
      id: 'emp-002',
      firstName: 'Initial',
      lastName: 'User',
      email: 'initial@example.com',
      phone: '+1 555 000 0000',
      position: 'Analyst',
      department: 'Operations',
      status: 'on-leave',
      startDate: '2022-05-01',
      employeeId: 'EMP901'
    };

    const form: EditableEmployeeFormState = {
      firstName: 'Updated',
      lastName: 'User',
      email: 'updated@example.com',
      phone: '+1 555 111 1111',
      position: 'Senior Analyst',
      department: 'Operations',
      manager: 'Jamie Lynn',
      employeeId: 'EMP901',
      dateOfBirth: '1990-01-01',
      street: '99 Innovation Way',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      country: 'USA',
      salary: 88000,
      employmentType: 'fullTime',
      workLocation: 'remote'
    };

    const updated = mergeEmployeeWithEditableForm(employee, form);

    expect(updated.id).toBe(employee.id);
    expect(updated.status).toBe('on-leave');
    expect(updated.firstName).toBe('Updated');
    expect(updated.position).toBe('Senior Analyst');
    expect(updated.address).toEqual({
      street: '99 Innovation Way',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      country: 'USA'
    });
    expect(updated.salary).toBe(88000);
    expect(updated.employmentType).toBe('fullTime');
    expect(updated.workLocation).toBe('remote');
  });
});
