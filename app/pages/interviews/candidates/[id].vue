<template>
  <div class="space-y-6">
    <!-- Back Button & Header -->
    <div class="flex items-center space-x-4">
      <UButton
        icon="i-material-symbols:arrow-back"
        variant="ghost"
        @click="$router.back()"
      >
        Back to Candidates
      </UButton>
    </div>

    <!-- Loading State -->
    <div v-if="!candidate" class="flex justify-center py-12">
      <div class="text-center">
        <UIcon name="i-material-symbols:person-search" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Loading candidate profile...
        </h3>
      </div>
    </div>

    <!-- Candidate Profile -->
    <div v-else class="space-y-6">
      <!-- Profile Header -->
      <UCard>
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-4">
            <UAvatar
              :alt="`${candidate.firstName} ${candidate.lastName}`"
              size="xl"
              :ui="{ background: 'bg-primary-500' }"
            />
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                {{ candidate.firstName }} {{ candidate.lastName }}
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                {{ candidate.position }} • {{ candidate.department }}
              </p>
              <div class="flex items-center space-x-4 mt-2">
                <UBadge
                  :color="getStageColor(candidate.interviewStage)"
                  :label="getStageLabel(candidate.interviewStage)"
                />
                <UBadge
                  :color="getStatusColor(candidate.status)"
                  :label="getStatusLabel(candidate.status)"
                  size="sm"
                />
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <UButton
              v-if="canAdvanceStage(candidate)"
              icon="i-material-symbols:arrow-forward"
              color="green"
              @click="handleAdvanceStage"
            >
              Advance Stage
            </UButton>
            <UButton
              v-if="canReject(candidate)"
              icon="i-material-symbols:person-remove"
              color="red"
              variant="outline"
              @click="handleReject"
            >
              Reject
            </UButton>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:mail" class="w-5 h-5 text-gray-500" />
            <span class="text-sm text-gray-900 dark:text-white">{{ candidate.email }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:phone" class="w-5 h-5 text-gray-500" />
            <span class="text-sm text-gray-900 dark:text-white">{{ candidate.phone }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <UIcon name="i-material-symbols:work" class="w-5 h-5 text-gray-500" />
            <span class="text-sm text-gray-900 dark:text-white">{{ candidate.experience }} years experience</span>
          </div>
        </div>
      </UCard>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Resume Section -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Resume Preview -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Resume</h2>
                <UButton
                  v-if="candidate.resumeUrl"
                  icon="i-material-symbols:download"
                  variant="outline"
                  @click="downloadResume"
                >
                  Download
                </UButton>
              </div>
            </template>
            
            <CandidateResumeViewer 
              v-if="candidate.resumeUrl"
              :resume-url="candidate.resumeUrl" 
              :candidate-name="`${candidate.firstName} ${candidate.lastName}`"
            />
            <div v-else class="text-center py-12">
              <UIcon name="i-material-symbols:description-off" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No resume available
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                The candidate hasn't uploaded their resume yet.
              </p>
            </div>
          </UCard>

          <!-- Skills & Details -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Skills & Details</h2>
            </template>
            
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h3>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="skill in candidate.skills"
                    :key="skill"
                    :label="skill"
                    variant="soft"
                    size="sm"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Application Date</h3>
                  <p class="text-sm text-gray-900 dark:text-white">{{ formatDate(candidate.applicationDate) }}</p>
                </div>
                <div v-if="candidate.linkedinUrl">
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn</h3>
                  <UButton
                    :to="candidate.linkedinUrl"
                    target="_blank"
                    variant="ghost"
                    size="xs"
                    icon="i-material-symbols:open-in-new"
                  >
                    View Profile
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Interview Timeline -->
          <CandidateTimelineView :candidate="candidate" />
          
          <!-- Notes Section -->
          <CandidateNotesView 
            :candidate="candidate"
            @notes-updated="handleNotesUpdated"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Candidate, InterviewStage, CandidateStatus } from '~/types';
import { DUMMY_CANDIDATES } from '~/constants/CANDIDATE_DATA';
import CandidateResumeViewer from '~/components/candidates/CandidateResumeViewer.vue';
import CandidateTimelineView from '~/components/candidates/CandidateTimelineView.vue';
import CandidateNotesView from '~/components/candidates/CandidateNotesView.vue';

// Get candidate ID from route
const route = useRoute();
const candidateId = route.params.id as string;

// Find candidate by ID - set immediately
const candidate = ref<Candidate | null>(
  DUMMY_CANDIDATES.find(c => c.id === candidateId) || null
);

// Helper functions for badges
const getStageColor = (stage: InterviewStage) => {
  const colors: Record<InterviewStage, string> = {
    applied: 'primary',
    screening: 'warning', 
    technical: 'info',
    final: 'secondary',
    offer: 'success',
    hired: 'success',
    rejected: 'error'
  };
  return colors[stage] || 'gray';
};

const getStageLabel = (stage: InterviewStage) => {
  const labels: Record<InterviewStage, string> = {
    applied: 'Applied',
    screening: 'Screening',
    technical: 'Technical',
    final: 'Final Interview',
    offer: 'Offer Extended',
    hired: 'Hired',
    rejected: 'Rejected'
  };
  return labels[stage] || stage;
};

const getStatusColor = (status: CandidateStatus) => {
  const colors: Record<CandidateStatus, string> = {
    active: 'success',
    scheduled: 'info',
    completed: 'secondary',
    rejected: 'error',
    withdrawn: 'gray',
    hired: 'success'
  };
  return colors[status] || 'gray';
};

const getStatusLabel = (status: CandidateStatus) => {
  const labels: Record<CandidateStatus, string> = {
    active: 'Active',
    scheduled: 'Scheduled',
    completed: 'Completed',
    rejected: 'Rejected',
    withdrawn: 'Withdrawn',
    hired: 'Hired'
  };
  return labels[status] || status;
};

// Action handlers
const canAdvanceStage = (candidate: Candidate) => {
  return candidate.interviewStage !== 'hired' && 
         candidate.interviewStage !== 'rejected' && 
         candidate.status !== 'rejected';
};

const canReject = (candidate: Candidate) => {
  return candidate.status !== 'rejected' && 
         candidate.status !== 'hired';
};

const handleAdvanceStage = () => {
  if (!candidate.value) return;
  
  // TODO: Implement actual advance stage logic
  console.log('Advancing stage for candidate:', candidate.value);
  
  // Simple advancement logic for demo
  const stages: InterviewStage[] = ['applied', 'screening', 'technical', 'final', 'offer', 'hired'];
  const currentIndex = stages.indexOf(candidate.value.interviewStage);
  if (currentIndex < stages.length - 1) {
    candidate.value.interviewStage = stages[currentIndex + 1];
  }
};

const handleReject = () => {
  if (!candidate.value) return;
  
  // TODO: Implement actual rejection logic
  console.log('Rejecting candidate:', candidate.value);
  candidate.value.status = 'rejected';
  candidate.value.interviewStage = 'rejected';
};

const downloadResume = () => {
  if (candidate.value?.resumeUrl) {
    // In a real app, this would trigger a download
    window.open(candidate.value.resumeUrl, '_blank');
  }
};

const handleNotesUpdated = (notes: string) => {
  if (candidate.value) {
    candidate.value.notes = notes;
  }
};

// Utility functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long',
    day: 'numeric'
  });
};
</script>