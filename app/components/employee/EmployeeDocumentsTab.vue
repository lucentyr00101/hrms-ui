<template>
  <div class="space-y-6">
    <!-- Upload Section -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:upload" class="w-5 h-5 text-primary" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Upload Documents</h3>
          </div>
        </div>
      </template>

      <div class="space-y-4">
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
          <UIcon name="i-material-symbols:cloud-upload" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Drop files here or click to upload
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Supports PDF, JPG, PNG, and DOC files up to 10MB
          </p>
          <UButton color="primary" @click="triggerFileUpload">
            <UIcon name="i-material-symbols:add" class="w-4 h-4 mr-2" />
            Choose Files
          </UButton>
          <input
            ref="fileInput"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            class="hidden"
            @change="handleFileUpload"
          />
        </div>
        
        <!-- Upload Progress (if uploading) -->
        <div v-if="uploadingFiles.length > 0" class="space-y-2">
          <div v-for="upload in uploadingFiles" :key="upload.name" class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <UIcon :name="getFileIcon(upload.type)" class="w-5 h-5 text-primary" />
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ upload.name }}</p>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                <div 
                  class="bg-primary h-2 rounded-full transition-all duration-300" 
                  :style="{ width: upload.progress + '%' }"
                ></div>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ upload.progress }}%</span>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Documents List -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:description" class="w-5 h-5 text-primary" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Documents</h3>
          </div>
          <USelectMenu
            v-model="selectedCategory"
            :options="categoryOptions"
            placeholder="Filter by category"
            @change="filterDocuments"
          />
        </div>
      </template>

      <div v-if="filteredDocuments.length === 0" class="text-center py-8">
        <UIcon name="i-material-symbols:folder-open" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h4>
        <p class="text-gray-500 dark:text-gray-400">Upload some documents to get started.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="document in filteredDocuments"
          :key="document.id"
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="previewDocument(document)"
        >
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="getDocumentBgColor(document.type)">
                <UIcon :name="getFileIcon(document.type)" class="w-5 h-5 text-white" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ document.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatFileSize(document.size) }} • {{ formatDate(document.uploadDate) }}
              </p>
              <UBadge 
                :label="formatCategory(document.category)"
                size="xs"
                class="mt-1"
              />
            </div>
            <UDropdown :items="getDocumentActions(document)">
              <UButton variant="ghost" size="xs" :ui="{ rounded: 'rounded-full' }">
                <UIcon name="i-material-symbols:more-vert" class="w-4 h-4" />
              </UButton>
            </UDropdown>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Document Preview Modal -->
    <UModal v-model="showPreview">
      <UCard v-if="selectedDocument" :ui="{ body: { padding: 'p-0' } }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <UIcon :name="getFileIcon(selectedDocument.type)" class="w-5 h-5 text-primary" />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ selectedDocument.name }}
              </h3>
            </div>
            <UButton variant="ghost" @click="showPreview = false">
              <UIcon name="i-material-symbols:close" class="w-4 h-4" />
            </UButton>
          </div>
        </template>

        <div class="p-6">
          <div v-if="selectedDocument.type === 'pdf'" class="text-center py-12">
            <UIcon name="i-material-symbols:picture-as-pdf" class="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">PDF Document</h4>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ selectedDocument.name }}
            </p>
            <UButton @click="downloadDocument(selectedDocument)">
              <UIcon name="i-material-symbols:download" class="w-4 h-4 mr-2" />
              Download PDF
            </UButton>
          </div>

          <div v-else-if="selectedDocument.type === 'image'" class="text-center">
            <img 
              :src="selectedDocument.url" 
              :alt="selectedDocument.name"
              class="max-w-full h-auto rounded-lg shadow-lg mx-auto"
              style="max-height: 400px;"
            />
          </div>

          <div v-else class="text-center py-12">
            <UIcon name="i-material-symbols:description" class="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Document</h4>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ selectedDocument.name }}
            </p>
            <UButton @click="downloadDocument(selectedDocument)">
              <UIcon name="i-material-symbols:download" class="w-4 h-4 mr-2" />
              Download File
            </UButton>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500 dark:text-gray-400">Size</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ formatFileSize(selectedDocument.size) }}</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400">Upload Date</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(selectedDocument.uploadDate) }}</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400">Category</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ formatCategory(selectedDocument.category) }}</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400">Type</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ selectedDocument.type.toUpperCase() }}</p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { EmployeeDocument } from '~/types';

interface Props {
  employeeId: string;
  documents: EmployeeDocument[];
}

interface UploadingFile {
  name: string;
  type: string;
  progress: number;
}

const props = defineProps<Props>();

// Reactive state
const fileInput = ref<HTMLInputElement>();
const uploadingFiles = ref<UploadingFile[]>([]);
const selectedCategory = ref('');
const filteredDocuments = ref<EmployeeDocument[]>([]);
const showPreview = ref(false);
const selectedDocument = ref<EmployeeDocument | null>(null);

// Category options
const categoryOptions = [
  { label: 'All Categories', value: '' },
  { label: 'Contracts', value: 'contract' },
  { label: 'Identification', value: 'identification' },
  { label: 'Certificates', value: 'certificate' },
  { label: 'Other', value: 'other' }
];

// Initialize filtered documents
filteredDocuments.value = [...props.documents];

// File upload handling
const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  for (const file of Array.from(files)) {
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      console.error('File type not allowed:', file.type);
      continue;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.name);
      continue;
    }

    // Add to uploading files
    const uploadingFile: UploadingFile = {
      name: file.name,
      type: getFileTypeFromMime(file.type),
      progress: 0
    };
    uploadingFiles.value.push(uploadingFile);

    // Simulate upload progress
    const uploadPromise = simulateUpload(uploadingFile);
    await uploadPromise;

    // Remove from uploading and add to documents
    const index = uploadingFiles.value.indexOf(uploadingFile);
    if (index > -1) {
      uploadingFiles.value.splice(index, 1);
    }

    // Add to documents list (simulated)
    const newDocument: EmployeeDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: getFileTypeFromMime(file.type),
      size: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      category: 'other',
      url: URL.createObjectURL(file)
    };
    filteredDocuments.value.push(newDocument);
  }

  // Clear file input
  if (target) target.value = '';
};

const simulateUpload = (uploadingFile: UploadingFile): Promise<void> => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      uploadingFile.progress += Math.random() * 30;
      if (uploadingFile.progress >= 100) {
        uploadingFile.progress = 100;
        clearInterval(interval);
        setTimeout(() => resolve(), 500);
      }
    }, 200);
  });
};

const getFileTypeFromMime = (mimeType: string): 'pdf' | 'image' | 'doc' => {
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('image')) return 'image';
  return 'doc';
};

// Document filtering
const filterDocuments = () => {
  if (!selectedCategory.value) {
    filteredDocuments.value = [...props.documents];
  } else {
    filteredDocuments.value = props.documents.filter(doc => doc.category === selectedCategory.value);
  }
};

// Document actions
const getDocumentActions = (document: EmployeeDocument) => [
  [{
    label: 'Preview',
    icon: 'i-material-symbols:visibility',
    click: () => previewDocument(document)
  }],
  [{
    label: 'Download',
    icon: 'i-material-symbols:download',
    click: () => downloadDocument(document)
  }],
  [{
    label: 'Delete',
    icon: 'i-material-symbols:delete',
    click: () => deleteDocument(document)
  }]
];

const previewDocument = (document: EmployeeDocument) => {
  selectedDocument.value = document;
  showPreview.value = true;
};

const downloadDocument = (document: EmployeeDocument) => {
  // In a real app, this would trigger a download
  console.log('Downloading document:', document.name);
};

const deleteDocument = (document: EmployeeDocument) => {
  const index = filteredDocuments.value.findIndex(doc => doc.id === document.id);
  if (index > -1) {
    filteredDocuments.value.splice(index, 1);
  }
};

// Utility functions
const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return 'i-material-symbols:picture-as-pdf';
    case 'image': return 'i-material-symbols:image';
    case 'doc': return 'i-material-symbols:description';
    default: return 'i-material-symbols:insert-drive-file';
  }
};

const getDocumentBgColor = (type: string) => {
  switch (type) {
    case 'pdf': return 'bg-red-500';
    case 'image': return 'bg-green-500';
    case 'doc': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCategory = (category: string) => {
  const categories: Record<string, string> = {
    contract: 'Contract',
    identification: 'Identification',
    certificate: 'Certificate',
    other: 'Other'
  };
  return categories[category] || category;
};

// Watch for prop changes
watch(() => props.documents, (newDocuments) => {
  filterDocuments();
}, { immediate: true });
</script>