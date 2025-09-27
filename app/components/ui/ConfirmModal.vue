<template>
  <UModal :open="isOpen" @close="handleClose">
    <template #header>
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
    </template>

    <div class="py-4">
      <p class="text-gray-700 dark:text-gray-300">
        {{ message }}
      </p>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
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
    </template>
  </UModal>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
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
  (e: 'close'): void;
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
const isOpen = computed(() => props.open);

// Methods
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