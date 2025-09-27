<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="cancel"
      ></div>
      
      <!-- Modal content -->
      <div class="flex items-center justify-center min-h-full p-4">
        <div class="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-auto">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <UIcon :name="icon" :class="iconClass" class="w-6 h-6" />
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ title }}
                </h3>
                <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400">
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Body -->
          <div class="p-6">
            <p class="text-gray-700 dark:text-gray-300">
              {{ message }}
            </p>
          </div>
          
          <!-- Footer -->
          <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <UButton 
              color="gray" 
              variant="outline" 
              @click="cancel"
            >
              {{ cancelLabel }}
            </UButton>
            <UButton 
              :color="confirmColor"
              @click="confirm"
            >
              {{ confirmLabel }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title: string;
  message: string;
  description?: string;
  icon?: string;
  iconClass?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-material-symbols:help',
  iconClass: 'text-orange-500',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmColor: 'primary'
});

const emit = defineEmits<Emits>();

// Modal state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Methods
const confirm = () => {
  emit('confirm');
  isOpen.value = false;
};

const cancel = () => {
  emit('cancel');
  isOpen.value = false;
};
</script>