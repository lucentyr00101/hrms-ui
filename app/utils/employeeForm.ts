import type { EditableEmployeeFormState, Employee } from '~/types';

export const createEmptyEditableForm = (): EditableEmployeeFormState => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  department: '',
  manager: '',
  employeeId: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  salary: 0,
  employmentType: undefined,
  workLocation: undefined
});

export const employeeToEditableForm = (employee: Employee): EditableEmployeeFormState => ({
  firstName: employee.firstName ?? '',
  lastName: employee.lastName ?? '',
  email: employee.email ?? '',
  phone: employee.phone ?? '',
  position: employee.position ?? '',
  department: employee.department ?? '',
  manager: employee.manager ?? '',
  employeeId: employee.employeeId ?? '',
  dateOfBirth: employee.dateOfBirth ?? '',
  street: employee.address?.street ?? '',
  city: employee.address?.city ?? '',
  state: employee.address?.state ?? '',
  zipCode: employee.address?.zipCode ?? '',
  country: employee.address?.country ?? '',
  salary: employee.salary ?? 0,
  employmentType: employee.employmentType,
  workLocation: employee.workLocation
});

export const mergeEmployeeWithEditableForm = (
  employee: Employee,
  form: EditableEmployeeFormState
): Employee => ({
  ...employee,
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  phone: form.phone,
  position: form.position,
  department: form.department,
  manager: form.manager,
  employeeId: form.employeeId,
  dateOfBirth: form.dateOfBirth,
  salary: form.salary,
  employmentType: form.employmentType,
  workLocation: form.workLocation,
  address: {
    street: form.street,
    city: form.city,
    state: form.state,
    zipCode: form.zipCode,
    country: form.country
  }
});
