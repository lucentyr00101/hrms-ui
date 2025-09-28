<template>
  <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
    <!-- PDF Preview -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[600px] relative">
      <!-- PDF Mock Preview -->
      <div class="flex flex-col items-center justify-center h-full p-8">
        <!-- PDF Header -->
        <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 p-6 mb-4">
          <div class="flex items-center space-x-3 mb-4">
            <UIcon name="i-material-symbols:picture-as-pdf" class="w-8 h-8 text-red-500" />
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ candidateName }} - Resume</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">PDF Document</p>
            </div>
          </div>
          
          <!-- Mock PDF content -->
          <div class="space-y-3">
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-4/5"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
            <div class="h-1 bg-gray-100 dark:bg-gray-700 rounded w-full my-4"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-4/5"></div>
            <div class="h-1 bg-gray-100 dark:bg-gray-700 rounded w-full my-4"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            <div class="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <span class="text-xs text-gray-500 dark:text-gray-400">Page 1 of 1</span>
            <div class="flex items-center space-x-2">
              <UButton
                size="xs"
                variant="ghost"
                icon="i-material-symbols:zoom-in"
                @click="zoomIn"
              />
              <UButton
                size="xs"
                variant="ghost"
                icon="i-material-symbols:zoom-out"
                @click="zoomOut"
              />
              <UButton
                size="xs"
                variant="ghost"
                icon="i-material-symbols:fullscreen"
                @click="openFullscreen"
              />
            </div>
          </div>
        </div>
        
        <!-- Full PDF Preview Notice -->
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            PDF preview simulation
          </p>
          <UButton
            size="sm"
            variant="outline"
            icon="i-material-symbols:open-in-new"
            @click="openResume"
          >
            View Full Resume
          </UButton>
        </div>
      </div>

      <!-- Loading State -->
      <div 
        v-if="isLoading" 
        class="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-90 flex items-center justify-center rounded-lg"
      >
        <div class="flex items-center space-x-2">
          <UIcon name="i-material-symbols:progress-activity" class="w-5 h-5 animate-spin text-primary" />
          <span class="text-sm text-gray-600 dark:text-gray-400">Loading PDF...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  resumeUrl: string;
  candidateName: string;
}

const props = defineProps<Props>();

const isLoading = ref(false);

const zoomIn = () => {
  // TODO: Implement zoom functionality
  console.log('Zoom in');
};

const zoomOut = () => {
  // TODO: Implement zoom functionality
  console.log('Zoom out');
};

const openFullscreen = () => {
  // TODO: Implement fullscreen view
  console.log('Open fullscreen');
};

const openResume = () => {
  // Open the actual PDF in a new tab
  window.open(props.resumeUrl, '_blank');
};

// Simulate loading when component mounts
onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>