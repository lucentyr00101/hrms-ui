import { computed, toValue, useState } from '#imports';
import type { MaybeRefOrGetter } from 'vue';
import { DUMMY_EMPLOYEES } from '~/constants/EMPLOYEE_DATA';
import type { Employee } from '~/types';

const cloneEmployees = (): Employee[] => 
  DUMMY_EMPLOYEES.map(employee => ({
    ...employee,
    address: employee.address ? { ...employee.address } : undefined
  }));

export function useEmployeeDirectory() {
  const employees = useState<Employee[]>('employees', () => cloneEmployees());

  const getEmployeeById = (id: MaybeRefOrGetter<string>) => 
    computed(() => {
      const identifier = toValue(id);
      return employees.value.find(employee => employee.id === identifier);
    });

  const updateEmployee = (id: string, payload: Employee) => {
    const index = employees.value.findIndex(emp => emp.id === id);
    if (index === -1) {
      return undefined;
    }

    const updated: Employee = {
      ...payload,
      id: payload.id ?? employees.value[index]!.id
    };

    employees.value[index] = updated;
    return employees.value[index];
  };

  return {
    employees,
    getEmployeeById,
    updateEmployee
  };
}
