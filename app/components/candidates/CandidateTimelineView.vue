<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Interview Timeline</h2>
    </template>

    <div class="space-y-4">
      <!-- Timeline Items -->
      <div 
        v-for="(stage, index) in timelineStages" 
        :key="stage.key"
        class="relative flex items-start space-x-3"
      >
        <!-- Timeline Connector -->
        <div 
          v-if="index < timelineStages.length - 1"
          class="absolute top-8 left-4 w-0.5 h-12 bg-gray-200 dark:bg-gray-600"
          :class="{
            'bg-green-400 dark:bg-green-500': stage.completed,
            'bg-primary-400 dark:bg-primary-500': stage.current && !stage.completed
          }"
        />

        <!-- Timeline Icon -->
        <div 
          class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
          :class="{
            'bg-green-100 border-green-400 dark:bg-green-900 dark:border-green-500': stage.completed,
            'bg-primary-100 border-primary-400 dark:bg-primary-900 dark:border-primary-500': stage.current && !stage.completed,
            'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600': !stage.current && !stage.completed
          }"
        >
          <UIcon 
            :name="getStageIcon(stage.key, stage.completed, stage.current)"
            class="w-4 h-4"
            :class="getIconClass(stage)"
          />
        </div>

        <!-- Timeline Content -->
        <div class="flex-grow min-w-0 pb-8">
          <div class="flex items-center justify-between">
            <div>
              <h3 
                class="text-sm font-medium"
                :class="{
                  'text-green-800 dark:text-green-400': stage.completed,
                  'text-primary-800 dark:text-primary-400': stage.current && !stage.completed,
                  'text-gray-500 dark:text-gray-400': !stage.current && !stage.completed
                }"
              >
                {{ stage.title }}
              </h3>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {{ stage.description }}
              </p>
              
              <!-- Interview Details -->
              <div v-if="stage.details" class="mt-2 space-y-1">
                <p v-if="stage.details.interviewer" class="text-xs text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Interviewer:</span> {{ stage.details.interviewer }}
                </p>
                <p v-if="stage.details.date" class="text-xs text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Date:</span> {{ formatDate(stage.details.date) }}
                </p>
                <p v-if="stage.details.time" class="text-xs text-gray-600 dark:text-gray-400">
                  <span class="font-medium">Time:</span> {{ stage.details.time }}
                </p>
              </div>
            </div>
            
            <!-- Stage Badge -->
            <UBadge 
              v-if="stage.current || stage.completed"
              :color="getStageColor(stage)"
              :label="getStageLabel(stage)"
              size="xs"
            />
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div v-if="nextSteps.length > 0" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Next Steps</h4>
        <ul class="space-y-2">
          <li 
            v-for="step in nextSteps" 
            :key="step"
            class="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400"
          >
            <UIcon name="i-material-symbols:arrow-forward" class="w-3 h-3 text-primary-500" />
            <span>{{ step }}</span>
          </li>
        </ul>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { Candidate, InterviewStage } from '~/types';

interface Props {
  candidate: Candidate;
}

interface TimelineStage {
  key: InterviewStage;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  details: { interviewer?: string; date?: string; time?: string } | null;
}

const props = defineProps<Props>();

// Define all possible interview stages in order
const allStages: InterviewStage[] = ['applied', 'screening', 'technical', 'final', 'offer', 'hired', 'rejected'];

const stageConfig = {
  applied: {
    title: 'Application Submitted',
    description: 'Candidate submitted their application',
    icon: 'i-material-symbols:description'
  },
  screening: {
    title: 'Initial Screening',
    description: 'HR screening call to assess basic fit',
    icon: 'i-material-symbols:call'
  },
  technical: {
    title: 'Technical Interview',
    description: 'Technical skills assessment and coding interview',
    icon: 'i-material-symbols:code'
  },
  final: {
    title: 'Final Interview',
    description: 'Final round with hiring manager and team',
    icon: 'i-material-symbols:group'
  },
  offer: {
    title: 'Offer Extended',
    description: 'Job offer has been made to candidate',
    icon: 'i-material-symbols:handshake'
  },
  hired: {
    title: 'Hired',
    description: 'Candidate accepted offer and joined the team',
    icon: 'i-material-symbols:check-circle'
  },
  rejected: {
    title: 'Application Closed',
    description: 'Application was not successful',
    icon: 'i-material-symbols:cancel'
  }
};

const timelineStages = computed(() => {
  const currentStageIndex = allStages.indexOf(props.candidate.interviewStage);
  
  // For rejected candidates, show all stages up to rejection
  if (props.candidate.interviewStage === 'rejected') {
    return allStages.slice(0, currentStageIndex + 1).map((stage, index) => ({
      key: stage,
      title: stageConfig[stage].title,
      description: stageConfig[stage].description,
      completed: index < currentStageIndex,
      current: index === currentStageIndex,
      details: getStageDetails(stage)
    }));
  }
  
  // For active candidates, show stages up to hired (excluding rejected)
  const relevantStages = allStages.slice(0, -1); // Remove 'rejected'
  
  return relevantStages.map((stage, index) => ({
    key: stage,
    title: stageConfig[stage].title,
    description: stageConfig[stage].description,
    completed: index < currentStageIndex,
    current: index === currentStageIndex,
    details: getStageDetails(stage)
  }));
});

const nextSteps = computed(() => {
  const steps: string[] = [];
  
  switch (props.candidate.interviewStage) {
    case 'applied':
      steps.push('Schedule initial screening call', 'Review application materials');
      break;
    case 'screening':
      steps.push('Schedule technical interview', 'Send coding challenge if needed');
      break;
    case 'technical':
      steps.push('Schedule final interview', 'Gather feedback from technical team');
      break;
    case 'final':
      steps.push('Make hiring decision', 'Prepare job offer if successful');
      break;
    case 'offer':
      steps.push('Follow up on offer status', 'Complete background check');
      break;
    case 'hired':
      steps.push('Begin onboarding process', 'Set up workspace and equipment');
      break;
  }
  
  return steps;
});

const getStageDetails = (stage: InterviewStage) => {
  // Return specific details for stages that have them
  if (stage === props.candidate.interviewStage) {
    return {
      interviewer: props.candidate.interviewer,
      date: props.candidate.interviewDate,
      time: props.candidate.interviewTime
    };
  }
  return null;
};

const getStageIcon = (stage: InterviewStage, completed: boolean, current: boolean) => {
  // For rejected candidates, show cross marks for completed/current stages
  if (props.candidate.interviewStage === 'rejected') {
    if (completed || current) {
      return 'i-material-symbols:cancel';
    }
  }
  
  // Normal flow
  if (completed) {
    return 'i-material-symbols:check';
  }
  if (current && stage === 'rejected') {
    return 'i-material-symbols:cancel';
  }
  return stageConfig[stage].icon;
};

// Helper functions for stage colors and labels
const getStageColor = (stage: TimelineStage) => {
  if (props.candidate.interviewStage === 'rejected') {
    if (stage.current || stage.completed) {
      return 'error'; // Use semantic error color for rejected stages
    }
  }
  
  // Normal flow for non-rejected candidates
  if (stage.completed) return 'success';
  if (stage.current) return 'primary';
  return 'neutral';
};

const getStageLabel = (stage: TimelineStage) => {
  if (props.candidate.interviewStage === 'rejected') {
    if (stage.current) {
      return 'Rejected';
    } else if (stage.completed) {
      return 'Rejected';
    }
  }
  
  // Normal flow for non-rejected candidates  
  if (stage.completed) return 'Completed';
  if (stage.current) return 'Current';
  return '';
};

const getIconClass = (stage: TimelineStage) => {
  if (props.candidate.interviewStage === 'rejected') {
    if (stage.current || stage.completed) {
      return 'text-red-600 dark:text-red-400';
    }
  }
  
  // Normal flow for non-rejected candidates
  if (stage.completed) {
    return 'text-green-600 dark:text-green-400';
  }
  if (stage.current) {
    return 'text-primary-600 dark:text-primary-400';
  }
  return 'text-gray-400 dark:text-gray-500';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short',
    day: 'numeric'
  });
};
</script>