import { object, string, number, boolean, array, type InferType } from "yup";

export const leaveTypeSchema = object({
  name: string()
    .required("Leave type name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  
  code: string()
    .required("Leave code is required")
    .min(2, "Code must be at least 2 characters")
    .max(10, "Code cannot exceed 10 characters")
    .matches(/^[A-Z0-9]+$/, "Code must be uppercase alphanumeric"),
  
  description: string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  
  icon: string()
    .required("Icon is required"),
  
  color: string()
    .required("Color is required")
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  
  status: string()
    .oneOf(['active', 'inactive'], "Invalid status")
    .required("Status is required"),
  
  requiresApproval: boolean()
    .required("Requires approval must be specified"),
  
  approvalWorkflow: string()
    .oneOf(['manager', 'hr', 'manager-hr'], "Invalid approval workflow")
    .nullable()
    .optional(),
  
  requiresDocumentation: boolean()
    .required("Requires documentation must be specified"),
  
  requiredDocuments: string()
    .max(500, "Required documents description cannot exceed 500 characters")
    .optional(),
  
  maxConsecutiveDays: number()
    .min(0, "Maximum consecutive days cannot be negative")
    .required("Maximum consecutive days is required"),
  
  minNoticePeriod: number()
    .min(0, "Minimum notice period cannot be negative")
    .required("Minimum notice period is required"),
  
  allowHalfDays: boolean()
    .required("Allow half days must be specified"),
  
  applicableGender: string()
    .oneOf(['all', 'male', 'female'], "Invalid applicable gender")
    .required("Applicable gender is required"),
  
  isPaid: boolean()
    .required("Paid/unpaid must be specified"),
  
  accrualMethod: string()
    .oneOf(['annual-fixed', 'monthly-accrual', 'no-accrual', 'custom'], "Invalid accrual method")
    .required("Accrual method is required"),
  
  annualDays: number()
    .min(0, "Annual days cannot be negative")
    .optional(),
  
  monthlyDays: number()
    .min(0, "Monthly days cannot be negative")
    .optional(),
  
  maxBalanceLimit: number()
    .min(0, "Maximum balance limit cannot be negative")
    .required("Maximum balance limit is required"),
  
  allowCarryOver: boolean()
    .required("Allow carry over must be specified"),
  
  maxCarryOverDays: number()
    .min(0, "Maximum carry over days cannot be negative")
    .optional(),
  
  carryOverExpiryMonths: number()
    .min(0, "Carry over expiry months cannot be negative")
    .optional(),
  
  prorationEnabled: boolean()
    .required("Proration enabled must be specified"),
  
  negativeBalanceAllowed: boolean()
    .required("Negative balance allowed must be specified"),
  
  maxNegativeBalance: number()
    .min(0, "Maximum negative balance cannot be negative")
    .optional(),
  
  eligibility: array()
    .of(string().oneOf(['probation', 'permanent', 'contract']))
    .min(1, "At least one employee type must be selected")
    .required("Employee eligibility is required"),
  
  minTenureMonths: number()
    .min(0, "Minimum tenure cannot be negative")
    .required("Minimum tenure is required"),
  
  blackoutDates: array()
    .of(
      object({
        startDate: string().required("Start date is required"),
        endDate: string().required("End date is required"),
        reason: string().required("Reason is required").max(200, "Reason cannot exceed 200 characters")
      })
    )
    .optional()
});

export type LeaveTypeSchema = InferType<typeof leaveTypeSchema>;
