<template>
  <UModal :open="isOpen" @close="handleClose">
    <!-- Header Slot - Customizable header with icon and title -->
    <template #header>
      <slot name="header">
        <div class="flex items-start space-x-4">
          <!-- Icon Slot - Allow custom icon component -->
          <slot name="icon">
            <div class="flex-shrink-0">
              <UIcon 
                :name="icon" 
                :class="[iconClass, 'w-6 h-6']" 
                aria-hidden="true"
              />
            </div>
          </slot>
          
          <!-- Title Section -->
          <div class="flex-1">
            <!-- Title Slot -->
            <slot name="title">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-6">
                {{ title }}
              </h3>
            </slot>
            
            <!-- Description Slot -->
            <slot name="description">
              <p v-if="description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ description }}
              </p>
            </slot>
          </div>
        </div>
      </slot>
    </template>

    <!-- Main Content Slot - Completely customizable content area -->
    <template #default>
      <slot name="content">
        <div class="mt-4">
          <slot name="message">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ message }}
            </p>
          </slot>
        </div>
      </slot>
    </template>

    <!-- Footer Slot - Customizable action buttons -->
    <template #footer>
      <slot name="footer">
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <!-- Cancel Button Slot -->
          <slot name="cancel-button">
            <UButton 
              :color="cancelColor" 
              :variant="cancelVariant" 
              :size="size"
              @click="cancel"
              class="w-full sm:w-auto"
            >
              {{ cancelLabel }}
            </UButton>
          </slot>
          
          <!-- Confirm Button Slot -->
          <slot name="confirm-button">
            <UButton 
              :color="confirmColor"
              :variant="confirmVariant"
              :size="size"
              @click="confirm"
              class="w-full sm:w-auto"
            >
              {{ confirmLabel }}
            </UButton>
          </slot>
        </div>
      </slot>
    </template>
  </UModal>
</template>

<script setup lang="ts">
/**
 * Redesigned ConfirmModal with proper slot structure
 * 
 * Features:
 * - Multiple customizable slots for maximum flexibility
 * - Responsive button layout
 * - Proper accessibility attributes
 * - Clean separation of concerns
 */

interface Props {
  /** Controls modal visibility */
  open: boolean;
  /** Main title text */
  title?: string;
  /** Main content message */
  message?: string;
  /** Optional description below title */
  description?: string;
  /** Icon name (Material Symbols format) */
  icon?: string;
  /** CSS classes for icon styling */
  iconClass?: string;
  /** Confirm button text */
  confirmLabel?: string;
  /** Cancel button text */
  cancelLabel?: string;
  /** Confirm button color theme (Nuxt UI v4.0.0 semantic colors) */
  confirmColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  /** Cancel button color theme */
  cancelColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  /** Confirm button variant */
  confirmVariant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  /** Cancel button variant */
  cancelVariant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface Emits {
  /** Emitted when modal should close */
  (e: 'close' | 'confirm' | 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  message: '',
  icon: 'i-material-symbols:help',
  iconClass: 'text-orange-500',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmColor: 'primary',
  cancelColor: 'neutral',
  confirmVariant: 'solid',
  cancelVariant: 'outline',
  size: 'md'
});

const emit = defineEmits<Emits>();

// Computed properties
const isOpen = computed(() => props.open);

// Event handlers
const handleClose = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm');
  emit('close');
};

const cancel = () => {
  emit('cancel');
  emit('close');
};
</script>