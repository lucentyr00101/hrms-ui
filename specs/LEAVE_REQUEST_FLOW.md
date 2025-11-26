# Leave Request Form - Technical Specification Document

## Overview

A form flow that enables employees to submit leave requests with type selection, date validation, and optional file attachments, culminating in a confirmation modal upon successful submission.

## Objectives

- Provide intuitive leave request submission
- Prevent invalid leave requests through comprehensive validation
- Support document attachments for leave justification
- Confirm successful submission to users

## User Flow

1. User accesses leave request form
2. User selects leave type from dropdown
3. User selects start and end dates
4. System validates date selection in real-time
5. User optionally uploads supporting documents
6. User submits form
7. System displays confirmation modal
8. User acknowledges confirmation

## Functional Requirements

### 1. Leave Type Selection

- Display dropdown/select with available leave types
- Single selection only
- Required field with validation
- Clear visual indication of selected type

### 2. Date Selection

- Start date picker (required)
- End date picker (required)
- End date must be equal to or after start date
- Display total number of days selected
- Real-time validation as user selects dates

**Validation Rules:**

- Prevent selection of past dates (start date >= today)
- Block weekend selections (Saturday/Sunday)
- Check for overlapping leave requests from dummy data
- Validate against available leave balance for selected type
- Display clear inline error messages for each validation failure

**Overlap Detection Logic:**

- Compare selected date range against existing leave requests in dummy data
- A request overlaps if any day in the range conflicts with existing requests
- Show details of conflicting leave request when overlap is detected
- Prevent form submission until overlap is resolved

### 3. File Upload

- Optional field supporting multiple file uploads
- Accepted file types: PDF, JPEG, PNG, DOC, DOCX
- Maximum file size per file: 5MB
- Maximum total upload size: 20MB
- Display uploaded file names with individual remove buttons
- Show upload progress indicator for each file
- Client-side validation for file type and size

**File Validation:**

- Check file extension matches allowed types
- Validate file size before allowing upload
- Display specific error message for invalid files
- Allow users to remove and re-upload files

### 4. Form Submission

- Submit button disabled until all required fields are valid
- Show loading state on button during submission
- Simulate API submission with 1-2 second delay
- Generate mock request ID upon successful submission
- Clear form data after successful submission

### 5. Confirmation Modal

**Trigger:** After successful form submission

**Display Content:**

- Success message: "Leave request submitted successfully"
- Summary of submitted request:
  - Leave type
  - Date range (formatted)
  - Number of days
  - List of attached files (if any)
- Generated reference number
- Action buttons:
  - "Submit Another Request" - closes modal and resets form
  - "Close" - closes modal and returns to previous state

**Modal Behavior:**

- Appears centered with backdrop overlay
- Clicking backdrop does not dismiss modal
- ESC key closes modal
- Focus trapped within modal while open
- Accessible keyboard navigation

## Business Rules

### Leave Balance Validation

- Each leave type has an associated balance in dummy data
- Calculate total days requested (including weekdays only)
- Compare against available balance for selected leave type
- Block submission if insufficient balance
- Show error: "Insufficient leave balance. Available: X days, Requested: Y days"

### Weekend Handling

- Weekends (Saturday/Sunday) should be excluded from day count
- Display warning or block selection of weekend dates
- Only count weekdays when calculating total days

### Overlap Prevention

- A user cannot submit overlapping leave requests
- Check both approved and pending requests from dummy data
- Show specific dates that conflict
- User must modify dates to proceed

## Validation Messages

**Leave Type:**

- Required: "Please select a leave type"

**Start Date:**

- Required: "Start date is required"
- Past date: "Start date cannot be in the past"
- Weekend: "Start date cannot be on a weekend"

**End Date:**

- Required: "End date is required"
- Before start: "End date must be on or after start date"
- Weekend: "End date cannot be on a weekend"

**Date Range:**

- Overlap: "You have an existing {status} leave request from {startDate} to {endDate}"
- Insufficient balance: "Insufficient {leaveType} balance. Available: {available} days, Requested: {requested} days"

**File Upload:**

- Invalid type: "File type not supported. Please upload PDF, JPEG, PNG, DOC, or DOCX files"
- Size exceeded: "File size exceeds 5MB limit"
- Total size exceeded: "Total file size exceeds 20MB limit"

## Dummy Data Structure

### Leave Types (constants/leaveTypes.js)

- List of available leave types with ID and name
- Include: Vacation, Sick Leave, Personal Leave, Bereavement, Maternity/Paternity

### Leave Balance (constants/leaveBalance.js)

- Object mapping leave type IDs to available days
- Example: Vacation: 15 days, Sick Leave: 10 days

### Existing Leave Requests (constants/existingRequests.js)

- Array of mock leave requests with:
  - Request ID
  - Leave type
  - Start date
  - End date
  - Status (pending, approved, rejected)
  - Submission date

## Edge Cases to Handle

1. **Selecting Same Start and End Date**

   - Valid request for 1 day
   - Calculate as 1 day leave

2. **Selecting Date Range Spanning Weekends**

   - Exclude weekends from day count
   - Display breakdown showing weekdays only

3. **Partial Overlap with Existing Request**

   - Treat any overlap as invalid
   - Show full date range of conflicting request

4. **File Upload Failures**

   - Show error message per file
   - Allow retry or removal
   - Don't block submission if upload fails (files are optional)

5. **Form Abandonment**

   - No auto-save needed for this phase
   - User loses data if they navigate away

6. **Maximum File Limit**
   - Set reasonable limit (e.g., 5 files maximum)
   - Disable upload button when limit reached

## Accessibility Requirements

- All form inputs have associated labels
- Error messages announced to screen readers
- Keyboard navigation for all interactive elements
- Focus management in confirmation modal
- Sufficient color contrast for all text
- Focus visible on all interactive elements

## Success Criteria

- User can successfully select leave type and dates
- Form prevents invalid submissions through real-time validation
- Weekend dates are excluded from calculations
- Overlapping requests are detected and blocked
- Files can be uploaded and removed before submission
- Confirmation modal displays complete request summary
- Form can be reset for additional submissions
