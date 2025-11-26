<template>
  <UForm :schema="leaveTypeSchema" :state="formState" class="space-y-6" @submit="onSubmit">
    <!-- Basic Information Section -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Basic Information</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="Leave Type Name" name="name" required>
          <UInput v-model="formState.name" placeholder="e.g., Annual Leave" />
        </UFormGroup>

        <UFormGroup label="Leave Code" name="code" required>
          <UInput v-model="formState.code" placeholder="e.g., AL" />
        </UFormGroup>

        <UFormGroup label="Description" name="description" class="md:col-span-2">
          <UTextarea v-model="formState.description" placeholder="Brief description of this leave type" :rows="3" />
        </UFormGroup>

        <UFormGroup label="Icon" name="icon" required>
          <USelect
            v-model="formState.icon"
            :options="ICON_OPTIONS"
            option-attribute="label"
            value-attribute="value"
          >
            <template #leading>
              <UIcon v-if="formState.icon" :name="formState.icon" class="w-5 h-5" />
            </template>
          </USelect>
        </UFormGroup>

        <UFormGroup label="Color" name="color" required>
          <div class="flex gap-2">
            <div
              class="w-10 h-10 rounded border border-gray-300 dark:border-gray-600"
              :style="{ backgroundColor: formState.color }"
            />
            <USelect
              v-model="formState.color"
              :options="COLOR_PALETTE_OPTIONS"
              option-attribute="label"
              value-attribute="value"
              class="flex-1"
            />
          </div>
        </UFormGroup>

        <UFormGroup label="Status" name="status" required>
          <USelect
            v-model="formState.status"
            :options="[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]"
            option-attribute="label"
            value-attribute="value"
          />
        </UFormGroup>
      </div>
    </UCard>

    <!-- Policy Configuration Section -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Policy Configuration</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="Requires Approval" name="requiresApproval" class="md:col-span-2">
          <UToggle v-model="formState.requiresApproval" />
          <template #help>
            If enabled, leave requests of this type will require manager/HR approval
          </template>
        </UFormGroup>

        <UFormGroup
          v-if="formState.requiresApproval"
          label="Approval Workflow"
          name="approvalWorkflow"
          class="md:col-span-2"
        >
          <USelect
            v-model="formState.approvalWorkflow"
            :options="APPROVAL_WORKFLOW_OPTIONS"
            option-attribute="label"
            value-attribute="value"
          />
        </UFormGroup>

        <UFormGroup label="Requires Documentation" name="requiresDocumentation" class="md:col-span-2">
          <UToggle v-model="formState.requiresDocumentation" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.requiresDocumentation"
          label="Required Documents"
          name="requiredDocuments"
          class="md:col-span-2"
        >
          <UInput v-model="formState.requiredDocuments" placeholder="e.g., Medical certificate" />
        </UFormGroup>

        <UFormGroup label="Maximum Consecutive Days" name="maxConsecutiveDays" required>
          <UInput v-model.number="formState.maxConsecutiveDays" type="number" min="0" />
          <template #help>
            0 = unlimited
          </template>
        </UFormGroup>

        <UFormGroup label="Minimum Notice Period (days)" name="minNoticePeriod" required>
          <UInput v-model.number="formState.minNoticePeriod" type="number" min="0" />
          <template #help>
            0 = no advance notice required
          </template>
        </UFormGroup>

        <UFormGroup label="Can be Taken in Half Days" name="allowHalfDays">
          <UToggle v-model="formState.allowHalfDays" />
        </UFormGroup>

        <UFormGroup label="Applicable to Gender" name="applicableGender" required>
          <USelect
            v-model="formState.applicableGender"
            :options="APPLICABLE_GENDER_OPTIONS"
            option-attribute="label"
            value-attribute="value"
          />
        </UFormGroup>

        <UFormGroup label="Leave Type" name="isPaid" required class="md:col-span-2">
          <URadioGroup
            v-model="formState.isPaid"
            :options="[
              { value: true, label: 'Paid' },
              { value: false, label: 'Unpaid' }
            ]"
          />
        </UFormGroup>
      </div>
    </UCard>

    <!-- Accrual & Balance Configuration Section -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Accrual & Balance Configuration</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="Accrual Method" name="accrualMethod" required class="md:col-span-2">
          <USelect
            v-model="formState.accrualMethod"
            :options="ACCRUAL_METHOD_OPTIONS"
            option-attribute="label"
            value-attribute="value"
          />
        </UFormGroup>

        <UFormGroup
          v-if="formState.accrualMethod === 'annual-fixed'"
          label="Annual Days"
          name="annualDays"
          required
        >
          <UInput v-model.number="formState.annualDays" type="number" min="0" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.accrualMethod === 'monthly-accrual'"
          label="Monthly Days"
          name="monthlyDays"
          required
        >
          <UInput v-model.number="formState.monthlyDays" type="number" min="0" step="0.5" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.accrualMethod !== 'no-accrual'"
          label="Maximum Balance Limit"
          name="maxBalanceLimit"
          required
        >
          <UInput v-model.number="formState.maxBalanceLimit" type="number" min="0" />
          <template #help>
            0 = unlimited
          </template>
        </UFormGroup>

        <UFormGroup
          v-if="formState.accrualMethod !== 'no-accrual'"
          label="Allow Carry Over"
          name="allowCarryOver"
          class="md:col-span-2"
        >
          <UToggle v-model="formState.allowCarryOver" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.allowCarryOver && formState.accrualMethod !== 'no-accrual'"
          label="Maximum Carry Over Days"
          name="maxCarryOverDays"
        >
          <UInput v-model.number="formState.maxCarryOverDays" type="number" min="0" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.allowCarryOver && formState.accrualMethod !== 'no-accrual'"
          label="Carry Over Expiry (months)"
          name="carryOverExpiryMonths"
        >
          <UInput v-model.number="formState.carryOverExpiryMonths" type="number" min="0" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.accrualMethod !== 'no-accrual'"
          label="Proration for New Employees"
          name="prorationEnabled"
        >
          <UToggle v-model="formState.prorationEnabled" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.accrualMethod !== 'no-accrual'"
          label="Allow Negative Balance"
          name="negativeBalanceAllowed"
        >
          <UToggle v-model="formState.negativeBalanceAllowed" />
        </UFormGroup>

        <UFormGroup
          v-if="formState.negativeBalanceAllowed && formState.accrualMethod !== 'no-accrual'"
          label="Maximum Negative Balance"
          name="maxNegativeBalance"
        >
          <UInput v-model.number="formState.maxNegativeBalance" type="number" min="0" />
        </UFormGroup>
      </div>
    </UCard>

    <!-- Eligibility & Restrictions Section -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Eligibility & Restrictions</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormGroup label="Employee Eligibility" name="eligibility" required class="md:col-span-2">
          <div class="flex flex-col gap-2">
            <UCheckbox
              v-for="option in EMPLOYEE_ELIGIBILITY_OPTIONS"
              :key="option.value"
              v-model="eligibilityChecked[option.value]"
              :label="option.label"
              @update:model-value="updateEligibility"
            />
          </div>
        </UFormGroup>

        <UFormGroup label="Minimum Tenure (months)" name="minTenureMonths" required>
          <UInput v-model.number="formState.minTenureMonths" type="number" min="0" />
          <template #help>
            0 = available from day one
          </template>
        </UFormGroup>

        <div class="md:col-span-2">
          <UFormGroup label="Blackout Dates" name="blackoutDates">
            <template #help>
              Periods when this leave type cannot be requested
            </template>
          </UFormGroup>

          <div class="space-y-3 mt-3">
            <div
              v-for="(blackout, index) in formState.blackoutDates"
              :key="index"
              class="flex gap-3 items-end"
            >
              <UFormGroup label="Start Date" class="flex-1">
                <UInput v-model="blackout.startDate" type="date" />
              </UFormGroup>
              <UFormGroup label="End Date" class="flex-1">
                <UInput v-model="blackout.endDate" type="date" />
              </UFormGroup>
              <UFormGroup label="Reason" class="flex-1">
                <UInput v-model="blackout.reason" placeholder="e.g., Year-end freeze" />
              </UFormGroup>
              <UButton
                color="error"
                variant="ghost"
                icon="i-material-symbols:delete"
                @click="removeBlackoutDate(index)"
              />
            </div>

            <UButton
              color="primary"
              variant="outline"
              size="sm"
              icon="i-material-symbols:add"
              @click="addBlackoutDate"
            >
              Add Blackout Period
            </UButton>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Form Actions -->
    <div class="flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
      <UButton color="neutral" variant="outline" @click="onCancel">
        Cancel
      </UButton>
      <UButton type="submit" color="primary">
        {{ mode === 'create' ? 'Create' : 'Update' }} Leave Type
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { leaveTypeSchema } from '~/schemas/leave-type';
import {
  ICON_OPTIONS,
  COLOR_PALETTE_OPTIONS,
  APPROVAL_WORKFLOW_OPTIONS,
  ACCRUAL_METHOD_OPTIONS,
  EMPLOYEE_ELIGIBILITY_OPTIONS,
  APPLICABLE_GENDER_OPTIONS
} from '~/constants/leave-types';
import type { LeaveType, LeaveTypeFormData, EmployeeEligibility } from '~/types';

interface Props {
  mode: 'create' | 'edit';
  initialData?: LeaveType;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [data: LeaveTypeFormData];
  cancel: [];
}>();

// Initialize form state
const formState = reactive<LeaveTypeFormData>({
  name: props.initialData?.name || '',
  code: props.initialData?.code || '',
  description: props.initialData?.description || '',
  icon: props.initialData?.icon || 'i-material-symbols:calendar-month',
  color: props.initialData?.color || '#10b981',
  status: props.initialData?.status || 'active',
  requiresApproval: props.initialData?.requiresApproval ?? true,
  approvalWorkflow: props.initialData?.approvalWorkflow || 'manager',
  requiresDocumentation: props.initialData?.requiresDocumentation ?? false,
  requiredDocuments: props.initialData?.requiredDocuments || '',
  maxConsecutiveDays: props.initialData?.maxConsecutiveDays ?? 14,
  minNoticePeriod: props.initialData?.minNoticePeriod ?? 7,
  allowHalfDays: props.initialData?.allowHalfDays ?? true,
  applicableGender: props.initialData?.applicableGender || 'all',
  isPaid: props.initialData?.isPaid ?? true,
  accrualMethod: props.initialData?.accrualMethod || 'annual-fixed',
  annualDays: props.initialData?.annualDays || 15,
  monthlyDays: props.initialData?.monthlyDays || 1.25,
  maxBalanceLimit: props.initialData?.maxBalanceLimit ?? 30,
  allowCarryOver: props.initialData?.allowCarryOver ?? true,
  maxCarryOverDays: props.initialData?.maxCarryOverDays || 5,
  carryOverExpiryMonths: props.initialData?.carryOverExpiryMonths || 3,
  prorationEnabled: props.initialData?.prorationEnabled ?? true,
  negativeBalanceAllowed: props.initialData?.negativeBalanceAllowed ?? false,
  maxNegativeBalance: props.initialData?.maxNegativeBalance || 0,
  eligibility: props.initialData?.eligibility || ['permanent'],
  minTenureMonths: props.initialData?.minTenureMonths ?? 0,
  blackoutDates: props.initialData?.blackoutDates ? [...props.initialData.blackoutDates] : []
});

// Eligibility checkbox state
const eligibilityChecked = reactive<Record<string, boolean>>({
  probation: formState.eligibility.includes('probation'),
  permanent: formState.eligibility.includes('permanent'),
  contract: formState.eligibility.includes('contract')
});

const updateEligibility = () => {
  formState.eligibility = Object.entries(eligibilityChecked)
    .filter(([_, checked]) => checked)
    .map(([key, _]) => key as EmployeeEligibility);
};

// Watch for changes in requiresApproval to reset approvalWorkflow
watch(() => formState.requiresApproval, (newValue) => {
  if (!newValue) {
    formState.approvalWorkflow = null;
  } else if (!formState.approvalWorkflow) {
    formState.approvalWorkflow = 'manager';
  }
});

// Watch for changes in accrualMethod to reset balance-related fields
watch(() => formState.accrualMethod, (newValue) => {
  if (newValue === 'no-accrual') {
    formState.maxBalanceLimit = 0;
    formState.allowCarryOver = false;
    formState.prorationEnabled = false;
    formState.negativeBalanceAllowed = false;
  }
});

const addBlackoutDate = () => {
  formState.blackoutDates.push({
    startDate: '',
    endDate: '',
    reason: ''
  });
};

const removeBlackoutDate = (index: number) => {
  formState.blackoutDates.splice(index, 1);
};

const onSubmit = () => {
  emit('submit', formState);
};

const onCancel = () => {
  emit('cancel');
};
</script>
