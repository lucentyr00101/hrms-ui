import { object, string, number, type InferType } from "yup";

export const employeeInfoSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email("Invalid email format").required("Email is required"),
  phone: string().required("Phone number is required"),
  position: string().required("Position is required"),
  department: string().required("Department is required"),
  manager: string().required("Manager is required"),
  employeeId: string().required("Employee ID is required"),
  dateOfBirth: string().required("Date of birth is required"),
  street: string().required("Street address is required"),
  city: string().required("City is required"),
  state: string().required("State is required"),
  zipCode: string().required("Zip code is required"),
  country: string().required("Country is required"),
  salary: number().positive("Salary must be positive").required("Salary is required"),
  employmentType: string().oneOf(['fullTime', 'partTime', 'contractor'], "Invalid employment type").required("Employment type is required"),
  workLocation: string().oneOf(['office', 'remote', 'hybrid'], "Invalid work location").required("Work location is required"),
});

export type EmployeeInfoSchema = InferType<typeof employeeInfoSchema>;