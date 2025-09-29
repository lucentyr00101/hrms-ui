<template>
  <UModal v-model:open="showModal">
    <UButton
      size="xs"
      variant="ghost"
      icon="i-material-symbols:add"
    >
      Add Note
    </UButton>

    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Interview Note</h3>
    </template>

    <template #content>
      <UCard>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Stage Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Interview Stage</label>
            <USelectMenu
              v-model="formData.stage"
              :options="stageOptions"
              placeholder="Select stage"
            />
          </div>

          <!-- Note Content -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <UTextarea
              v-model="formData.content"
              placeholder="Enter your interview notes..."
              :rows="4"
              required
            />
          </div>

          <!-- Rating -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Overall Rating (Optional)</label>
            <div class="flex items-center space-x-2">
              <div class="flex items-center space-x-1">
                <button
                  v-for="i in 5"
                  :key="i"
                  type="button"
                  class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  @click="formData.rating = i"
                >
                  <UIcon 
                    name="i-material-symbols:star"
                    class="w-5 h-5"
                    :class="i <= (formData.rating || 0) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
                  />
                </button>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ formData.rating ? `${formData.rating}/5` : 'No rating' }}
              </span>
              <UButton
                v-if="formData.rating"
                size="xs"
                variant="ghost"
                icon="i-material-symbols:close"
                @click="formData.rating = null"
              />
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3 pt-4">
            <UButton
              type="button"
              variant="ghost"
              @click="handleCancel"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              :disabled="!formData.content?.trim() || !formData.stage"
            >
              Save Note
            </UButton>
          </div>
        </form>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { InterviewStage } from '~/types'

interface NoteFormData {
  content: string
  stage: InterviewStage | null
  rating: number | null
}

interface NoteSubmitData {
  content: string
  stage: InterviewStage
  rating: number | null
}

interface Props {
  initialStage?: InterviewStage
}

const props = withDefaults(defineProps<Props>(), {
  initialStage: undefined
})

interface NoteSubmitData {
  content: string
  stage: InterviewStage
  rating: number | null
}

const emit = defineEmits<{
  submit: [data: NoteSubmitData]
}>()

const showModal = ref(false)

// Form data
const formData = ref<NoteFormData>({
  content: '',
  stage: props.initialStage || null,
  rating: null
})

const stageOptions = [
  { label: 'Applied', value: 'applied' },
  { label: 'Screening', value: 'screening' },
  { label: 'Technical', value: 'technical' },
  { label: 'Final Interview', value: 'final' },
  { label: 'Offer', value: 'offer' },
  { label: 'Hired', value: 'hired' }
]

const handleSubmit = () => {
  if (!formData.value.content?.trim() || !formData.value.stage) return

  // Emit with proper typing - stage is guaranteed to be non-null here
  emit('submit', {
    content: formData.value.content,
    stage: formData.value.stage,
    rating: formData.value.rating
  })
  resetForm()
  closeModal()
}

const handleCancel = () => {
  resetForm()
  closeModal()
}

const closeModal = () => {
  showModal.value = false
}

const resetForm = () => {
  formData.value = {
    content: '',
    stage: props.initialStage || null,
    rating: null
  }
}

// Update stage when initialStage prop changes
watch(() => props.initialStage, (newStage) => {
  if (newStage && !formData.value.stage) {
    formData.value.stage = newStage
  }
})
</script>