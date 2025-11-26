<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Interview Notes</h2>
        <AddNoteModal
          :initial-stage="props.candidate.interviewStage"
          @submit="handleNoteSubmit"
        />
      </div>
    </template>

    <!-- Notes List -->
    <div class="space-y-4">
      <!-- Existing Notes -->
      <div 
        v-for="note in notes" 
        :key="note.id"
        class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center space-x-2">
            <UAvatar 
              :alt="note.author"
              size="xs"
              class="bg-primary-500"
            />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ note.author }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ formatDateTime(note.date) }}</p>
            </div>
          </div>
          <UBadge 
            :color="getStageColor(note.stage)"
            :label="getStageLabel(note.stage)"
            size="xs"
          />
        </div>
        
        <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ note.content }}</p>
        
        <!-- Note Rating if present -->
        <div v-if="note.rating" class="flex items-center space-x-2 mt-2">
          <span class="text-xs text-gray-600 dark:text-gray-400">Rating:</span>
          <div class="flex items-center space-x-1">
            <UIcon 
              v-for="i in 5" 
              :key="i"
              name="i-material-symbols:star"
              class="w-3 h-3"
              :class="i <= note.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'"
            />
          </div>
          <span class="text-xs text-gray-600 dark:text-gray-400">({{ note.rating }}/5)</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="notes.length === 0" class="text-center py-8">
        <UIcon name="i-material-symbols:note-add" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-1">No notes yet</h3>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Add interview notes to track candidate progress
        </p>
        <AddNoteModal
          :initial-stage="props.candidate.interviewStage"
          @submit="handleNoteSubmit"
        />
      </div>
    </div>


  </UCard>
</template>

<script setup lang="ts">
import type { Candidate, InterviewStage } from '~/types'
import AddNoteModal from './AddNoteModal.vue'

interface InterviewNote {
  id: string
  content: string
  author: string
  date: string
  stage: InterviewStage
  rating?: number
}

interface Props {
  candidate: Candidate
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'notes-updated': [notes: string]
}>()

// Mock current user - in a real app, this would come from auth
const currentUser = 'Sarah Johnson'

// Initialize notes from candidate or create sample notes
const notes = ref<InterviewNote[]>([
  {
    id: '1',
    content: 'Candidate showed strong technical skills during the screening. Good communication and seems enthusiastic about the role. Recommended to proceed to technical interview.',
    author: 'HR Team',
    date: '2024-08-16T10:00:00Z',
    stage: 'screening',
    rating: 4
  },
  {
    id: '2',
    content: 'Technical interview went well. Candidate demonstrated solid coding skills and problem-solving approach. Some areas for improvement in system design, but overall positive.',
    author: 'Sarah Johnson',
    date: '2024-08-20T14:30:00Z',
    stage: 'technical',
    rating: 4
  }
])

interface NoteSubmitData {
  content: string
  stage: InterviewStage
  rating: number | null
}

const handleNoteSubmit = (data: NoteSubmitData) => {
  if (!data.content?.trim() || !data.stage) return

  const note: InterviewNote = {
    id: Date.now().toString(),
    content: data.content.trim(),
    author: currentUser,
    date: new Date().toISOString(),
    stage: data.stage,
    rating: data.rating || undefined
  }

  notes.value.unshift(note)

  // Emit update to parent
  emit('notes-updated', notes.value.map(n => n.content).join('\n\n'))
}

const getStageColor = (stage: InterviewStage): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral' => {
  const colors: Record<InterviewStage, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
    applied: 'primary',
    screening: 'warning',
    technical: 'info',
    final: 'secondary',
    offer: 'success',
    hired: 'success',
    rejected: 'error'
  }
  return colors[stage] || 'neutral'
}

const getStageLabel = (stage: InterviewStage) => {
  const labels: Record<InterviewStage, string> = {
    applied: 'Applied',
    screening: 'Screening',
    technical: 'Technical',
    final: 'Final',
    offer: 'Offer',
    hired: 'Hired',
    rejected: 'Rejected'
  }
  return labels[stage] || stage
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Sort notes by date (newest first)
watchEffect(() => {
  notes.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>