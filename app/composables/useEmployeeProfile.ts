import { DUMMY_EMPLOYEES, DUMMY_EMPLOYEE_DOCUMENTS, DUMMY_EMPLOYEE_ACTIVITIES } from '~/constants/EMPLOYEE_DATA';
import { employeeInfoSchema } from '~/schemas/employee';
import type { Employee, EmployeeDocument, ActivityItem, EmployeeFormData } from '~/types';

export function useEmployeeProfile(employeeId: string) {
  // Reactive state
  const pending = ref(false);
  const error = ref(false);
  const employee = ref<Employee | null>(null);
  const employeeDocuments = ref<EmployeeDocument[]>([]);
  const employeeActivities = ref<ActivityItem[]>([]);
  const isEditMode = ref(false);
  const saving = ref(false);
  const formState = ref<EmployeeFormData | null>(null);

  // Load employee data
  const loadEmployeeData = async () => {
    pending.value = true;
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundEmployee = DUMMY_EMPLOYEES.find(emp => emp.id === employeeId);
      if (!foundEmployee) {
        error.value = true;
        return;
      }
      
      employee.value = foundEmployee;
      employeeDocuments.value = DUMMY_EMPLOYEE_DOCUMENTS[employeeId] || [];
      employeeActivities.value = DUMMY_EMPLOYEE_ACTIVITIES[employeeId] || [];
      
      // Initialize form state
      initializeFormState();
    } catch (err) {
      error.value = true;
    } finally {
      pending.value = false;
    }
  };

  // Initialize form state for editing
  const initializeFormState = () => {
    if (employee.value) {
      formState.value = {
        firstName: employee.value.firstName,
        lastName: employee.value.lastName,
        email: employee.value.email,
        phone: employee.value.phone,
        position: employee.value.position,
        department: employee.value.department,
        manager: employee.value.manager || '',
        employeeId: employee.value.employeeId,
        dateOfBirth: employee.value.dateOfBirth || '',
        street: employee.value.address?.street || '',
        city: employee.value.address?.city || '',
        state: employee.value.address?.state || '',
        zipCode: employee.value.address?.zipCode || '',
        country: employee.value.address?.country || '',
        salary: employee.value.salary || 0,
        employmentType: employee.value.employmentType || 'fullTime',
        workLocation: employee.value.workLocation || 'office',
      };
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    isEditMode.value = true;
    initializeFormState();
  };

  // Cancel edit
  const cancelEdit = () => {
    isEditMode.value = false;
    initializeFormState();
  };

  // Handle save
  const handleSave = async () => {
    if (!formState.value || !employee.value) return;
    
    saving.value = true;
    try {
      // Validate form
      await employeeInfoSchema.validate(formState.value);
      
      // Simulate API save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update employee data
      employee.value = {
        ...employee.value,
        firstName: formState.value.firstName,
        lastName: formState.value.lastName,
        email: formState.value.email,
        phone: formState.value.phone,
        position: formState.value.position,
        department: formState.value.department,
        manager: formState.value.manager,
        employeeId: formState.value.employeeId,
        dateOfBirth: formState.value.dateOfBirth,
        address: {
          street: formState.value.street,
          city: formState.value.city,
          state: formState.value.state,
          zipCode: formState.value.zipCode,
          country: formState.value.country
        },
        salary: formState.value.salary,
        employmentType: formState.value.employmentType,
        workLocation: formState.value.workLocation
      };
      
      isEditMode.value = false;
      
      // Show success notification
      console.log('Employee profile updated successfully');
    } catch (err) {
      console.error('Failed to update employee:', err);
    } finally {
      saving.value = false;
    }
  };

  // Update form state
  const updateFormState = (newState: Partial<EmployeeFormData>) => {
    if (formState.value) {
      formState.value = { ...formState.value, ...newState };
    }
  };

  // Initialize on first access
  onMounted(() => {
    loadEmployeeData();
  });

  return {
    // State
    pending,
    error,
    employee,
    employeeDocuments,
    employeeActivities,
    isEditMode,
    saving,
    formState,

    // Methods
    loadEmployeeData,
    toggleEditMode,
    cancelEdit,
    handleSave,
    updateFormState,
  };
}