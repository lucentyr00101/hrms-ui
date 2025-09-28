<template>
  <!-- Archive/Offboard Employee Modal -->
  <UModal v-model="isOpen" :prevent-close="isProcessing">
    <UCard>
      <template #header>
        <div class="flex items-center space-x-3">
          <UIcon 
            :name="currentStep === 'confirm' ? 'i-material-symbols:warning' : 'i-material-symbols:checklist'" 
            :class="currentStep === 'confirm' ? 'text-orange-500' : 'text-blue-500'"
            class="w-6 h-6" 
          />
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ currentStep === 'confirm' ? 'Archive Employee' : 'Offboarding Checklist' }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ getCurrentStepDescription() }}
            </p>
          </div>
        </div>
      </template>

      <!-- Confirmation Step -->
      <div v-if="currentStep === 'confirm'" class="space-y-6">
        <!-- Employee Info -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
              {{ getEmployeeInitials() }}
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">
                {{ employee?.firstName }} {{ employee?.lastName }}
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ employee?.position }} • {{ employee?.department }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Employee ID: {{ employee?.employeeId }}
              </p>
            </div>
          </div>
        </div>

        <!-- Warning Message -->
        <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <UIcon name="i-material-symbols:warning" class="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h5 class="font-medium text-orange-800 dark:text-orange-200 mb-2">
                Important Notice
              </h5>
              <p class="text-sm text-orange-700 dark:text-orange-300">
                Archiving this employee will change their status to "inactive" and remove their system access. 
                This action can be reversed if needed. The employee's data and history will be preserved.
              </p>
            </div>
          </div>
        </div>

        <!-- Reason for Archiving -->
        <div>
          <UFormGroup label="Reason for Archiving" required>
            <USelectMenu 
              v-model="archiveReason"
              :options="archiveReasons"
              placeholder="Select reason for archiving"
            />
          </UFormGroup>
        </div>

        <!-- Additional Notes -->
        <div>
          <UFormGroup label="Additional Notes (Optional)">
            <UTextarea 
              v-model="archiveNotes"
              placeholder="Add any additional notes about the archiving process..."
              rows="3"
            />
          </UFormGroup>
        </div>

        <!-- Confirmation Checkbox -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <label class="flex items-start space-x-3">
            <UCheckbox v-model="confirmArchive" class="mt-1" />
            <div class="text-sm text-gray-700 dark:text-gray-300">
              I understand that this will change the employee's status to inactive and remove their system access. 
              I confirm that I have the authority to perform this action.
            </div>
          </label>
        </div>
      </div>

      <!-- Checklist Step -->
      <div v-else-if="currentStep === 'checklist'" class="space-y-6">
        <!-- Progress -->
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{{ completedTasks }}/{{ totalTasks }} tasks completed</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(completedTasks / totalTasks) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Checklist Items -->
        <div class="space-y-4">
          <div class="grid gap-4">
            <!-- HR Tasks -->
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <UIcon name="i-material-symbols:people" class="w-4 h-4 mr-2" />
                HR Tasks
              </h5>
              <div class="space-y-3 pl-6">
                <label 
                  v-for="task in hrTasks" 
                  :key="task.key" 
                  class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UCheckbox 
                    v-model="offboardingChecklist[task.key]" 
                    class="mt-1"
                  />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ task.title }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ task.description }}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- IT Tasks -->
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <UIcon name="i-material-symbols:computer" class="w-4 h-4 mr-2" />
                IT Tasks
              </h5>
              <div class="space-y-3 pl-6">
                <label 
                  v-for="task in itTasks" 
                  :key="task.key" 
                  class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UCheckbox 
                    v-model="offboardingChecklist[task.key]" 
                    class="mt-1"
                  />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ task.title }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ task.description }}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Manager Tasks -->
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <UIcon name="i-material-symbols:supervisor-account" class="w-4 h-4 mr-2" />
                Manager Tasks
              </h5>
              <div class="space-y-3 pl-6">
                <label 
                  v-for="task in managerTasks" 
                  :key="task.key" 
                  class="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <UCheckbox 
                    v-model="offboardingChecklist[task.key]" 
                    class="mt-1"
                  />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ task.title }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ task.description }}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Final Notes -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <UFormGroup label="Final Notes">
            <UTextarea 
              v-model="finalNotes"
              placeholder="Add any final notes about the offboarding process..."
              rows="3"
            />
          </UFormGroup>
        </div>
      </div>

      <!-- Success Step -->
      <div v-else-if="currentStep === 'success'" class="text-center py-8">
        <div class="mb-6">
          <div class="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
            <UIcon name="i-material-symbols:check-circle" class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Employee Successfully Archived
        </h4>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ employee?.firstName }} {{ employee?.lastName }} has been archived and their access has been revoked.
        </p>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm">
          <div class="grid grid-cols-2 gap-4 text-left">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Status:</span>
              <span class="ml-2 text-gray-900 dark:text-white">Inactive</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Archived by:</span>
              <span class="ml-2 text-gray-900 dark:text-white">Admin User</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Date:</span>
              <span class="ml-2 text-gray-900 dark:text-white">{{ new Date().toLocaleDateString() }}</span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Reason:</span>
              <span class="ml-2 text-gray-900 dark:text-white">{{ getArchiveReasonLabel() }}</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between items-center">
          <UButton 
            v-if="currentStep === 'checklist'"
            color="gray" 
            variant="outline" 
            @click="currentStep = 'confirm'"
          >
            <UIcon name="i-material-symbols:arrow-back" class="w-4 h-4 mr-2" />
            Back
          </UButton>
          <div v-else></div>

          <div class="flex space-x-3">
            <UButton 
              v-if="currentStep !== 'success'"
              color="gray" 
              variant="outline" 
              @click="closeModal"
              :disabled="isProcessing"
            >
              Cancel
            </UButton>
            
            <UButton 
              v-if="currentStep === 'confirm'"
              color="orange"
              @click="proceedToChecklist"
              :disabled="!canProceedToChecklist"
            >
              Proceed to Checklist
              <UIcon name="i-material-symbols:arrow-forward" class="w-4 h-4 ml-2" />
            </UButton>
            
            <UButton 
              v-else-if="currentStep === 'checklist'"
              color="red"
              @click="completeOffboarding"
              :loading="isProcessing"
              :disabled="!allTasksCompleted"
            >
              <UIcon name="i-material-symbols:archive" class="w-4 h-4 mr-2" />
              Complete Archive
            </UButton>
            
            <UButton 
              v-else-if="currentStep === 'success'"
              color="primary"
              @click="closeModal"
            >
              Done
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { Employee } from '~/types';

interface Props {
  modelValue: boolean;
  employee: Employee | null;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'archived', employee: Employee): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Modal state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Workflow state
const currentStep = ref<'confirm' | 'checklist' | 'success'>('confirm');
const isProcessing = ref(false);

// Form data
const archiveReason = ref('');
const archiveNotes = ref('');
const confirmArchive = ref(false);
const finalNotes = ref('');

// Archive reasons
const archiveReasons = [
  { label: 'Resignation', value: 'resignation' },
  { label: 'Termination', value: 'termination' },
  { label: 'End of Contract', value: 'contract_end' },
  { label: 'Retirement', value: 'retirement' },
  { label: 'Leave of Absence', value: 'leave_absence' },
  { label: 'Other', value: 'other' }
];

// Checklist data
const offboardingChecklist = ref({
  // HR Tasks
  exit_interview: false,
  final_paycheck: false,
  benefits_transition: false,
  return_badge: false,
  hr_documents: false,
  
  // IT Tasks
  revoke_access: false,
  collect_equipment: false,
  backup_data: false,
  remove_accounts: false,
  security_clearance: false,
  
  // Manager Tasks
  knowledge_transfer: false,
  project_handover: false,
  team_notification: false,
  reference_letter: false,
  final_review: false
});

// Task definitions
const hrTasks = [
  { key: 'exit_interview', title: 'Conduct Exit Interview', description: 'Complete exit interview with HR representative' },
  { key: 'final_paycheck', title: 'Process Final Paycheck', description: 'Calculate and process final compensation including unused PTO' },
  { key: 'benefits_transition', title: 'Handle Benefits Transition', description: 'Provide COBRA information and handle benefit transitions' },
  { key: 'return_badge', title: 'Collect Badge & Keys', description: 'Retrieve company badge, keys, and any physical access cards' },
  { key: 'hr_documents', title: 'Complete HR Documentation', description: 'Finalize all required HR forms and documentation' }
];

const itTasks = [
  { key: 'revoke_access', title: 'Revoke System Access', description: 'Disable all system accounts and access permissions' },
  { key: 'collect_equipment', title: 'Collect Equipment', description: 'Retrieve laptop, phone, and other company equipment' },
  { key: 'backup_data', title: 'Backup Important Data', description: 'Backup any important files and data before access removal' },
  { key: 'remove_accounts', title: 'Remove User Accounts', description: 'Delete or archive user accounts across all systems' },
  { key: 'security_clearance', title: 'Security Clearance Review', description: 'Complete security clearance and access review' }
];

const managerTasks = [
  { key: 'knowledge_transfer', title: 'Knowledge Transfer', description: 'Ensure knowledge transfer to team members' },
  { key: 'project_handover', title: 'Project Handover', description: 'Transfer ongoing projects to other team members' },
  { key: 'team_notification', title: 'Team Notification', description: 'Notify team and relevant stakeholders' },
  { key: 'reference_letter', title: 'Reference Letter', description: 'Prepare reference letter if requested' },
  { key: 'final_review', title: 'Final Performance Review', description: 'Complete final performance review and feedback' }
];

// Computed properties
const totalTasks = computed(() => Object.keys(offboardingChecklist.value).length);
const completedTasks = computed(() => Object.values(offboardingChecklist.value).filter(Boolean).length);

const canProceedToChecklist = computed(() => {
  return archiveReason.value && confirmArchive.value;
});

const allTasksCompleted = computed(() => {
  return completedTasks.value === totalTasks.value;
});

// Methods
const getCurrentStepDescription = () => {
  switch (currentStep.value) {
    case 'confirm':
      return `Confirm archiving of ${props.employee?.firstName} ${props.employee?.lastName}`;
    case 'checklist':
      return 'Complete all required offboarding tasks';
    case 'success':
      return 'Employee has been successfully archived';
    default:
      return '';
  }
};

const getEmployeeInitials = () => {
  if (!props.employee) return '??';
  return `${props.employee.firstName.charAt(0)}${props.employee.lastName.charAt(0)}`;
};

const getArchiveReasonLabel = () => {
  const reason = archiveReasons.find(r => r.value === archiveReason.value);
  return reason?.label || 'Unknown';
};

const proceedToChecklist = () => {
  currentStep.value = 'checklist';
};

const completeOffboarding = async () => {
  if (!props.employee) return;
  
  isProcessing.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    currentStep.value = 'success';
    
    // Emit the archived event after a short delay
    setTimeout(() => {
      emit('archived', props.employee!);
    }, 1000);
    
  } catch (error) {
    console.error('Offboarding failed:', error);
  } finally {
    isProcessing.value = false;
  }
};

const closeModal = () => {
  isOpen.value = false;
  
  // Reset form after modal closes
  setTimeout(() => {
    currentStep.value = 'confirm';
    archiveReason.value = '';
    archiveNotes.value = '';
    confirmArchive.value = false;
    finalNotes.value = '';
    
    // Reset checklist
    Object.keys(offboardingChecklist.value).forEach(key => {
      offboardingChecklist.value[key as keyof typeof offboardingChecklist.value] = false;
    });
  }, 300);
};

// Watch for modal close
watch(isOpen, (newValue) => {
  if (!newValue) {
    closeModal();
  }
});
</script>