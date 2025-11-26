<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Candidates
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track candidates through the interview process.
        </p>
      </div>
      <div class="flex items-center space-x-3">
        <UButton
          icon="i-material-symbols:person-add"
          @click="handleAddCandidate"
        >
          Add Candidate
        </UButton>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="flex items-center space-x-4">
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Search candidates by name, email, position, or skills..."
          icon="i-material-symbols:search"
          size="lg"
          @input="handleSearch"
        />
      </div>
      <UButton
        v-if="hasFilters"
        variant="outline"
        icon="i-material-symbols:filter-alt-off"
        @click="clearFilters"
      >
        Clear Filters
      </UButton>
    </div>

    <!-- Filters -->
    <CandidateFilters
      :filters="filters"
      :unique-positions="uniquePositions"
      :unique-departments="uniqueDepartments"
      :unique-stages="uniqueStages"
      :unique-statuses="uniqueStatuses"
      @update:filters="handleFilterChange"
      @clear="clearFilters"
    />

    <!-- Results Summary -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ filteredCandidates.length }} of {{ allFilteredCandidates.length }} candidates
        <span v-if="hasFilters">(filtered)</span>
      </p>
      <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <span>Items per page:</span>
        <USelectMenu
          v-model="itemsPerPage"
          :options="itemsPerPageOptions"
          size="sm"
        />
      </div>
    </div>

    <!-- Candidate Table -->
    <CandidateTableView
      :candidates="filteredCandidates"
      :sort-options="sortOptions"
      @update:sort-options="handleSortChange"
      @view-profile="handleViewProfile"
      @view-resume="handleViewResume"
      @schedule-interview="handleScheduleInterview"
      @move-to-next-stage="handleMoveToNextStage"
      @reject-candidate="handleRejectCandidate"
    />

    <!-- Pagination -->
    <div 
      v-if="totalPages > 1"
      class="flex justify-center"
    >
      <UPagination
        v-model="currentPage"
        :page-count="totalPages"
        :total="allFilteredCandidates.length"
        @update:model-value="handlePageChange"
      />
    </div>

    <!-- Empty State -->
    <div 
      v-if="allFilteredCandidates.length === 0"
      class="text-center py-12"
    >
      <UIcon name="i-material-symbols:person-search" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ hasFilters ? 'No candidates found' : 'No candidates yet' }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ hasFilters 
          ? 'Try adjusting your search query or filters.' 
          : 'Get started by adding your first candidate.' 
        }}
      </p>
      <UButton
        v-if="!hasFilters"
        icon="i-material-symbols:person-add"
        @click="handleAddCandidate"
      >
        Add Candidate
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Candidate } from '~/types';
import CandidateFilters from '~/components/candidates/CandidateFilters.vue';
import CandidateTableView from '~/components/candidates/CandidateTableView.vue';

// Page meta
definePageMeta({
  title: 'Candidates'
});

// Use candidates composable
const {
  searchQuery,
  filters,
  sortOptions,
  allFilteredCandidates,
  filteredCandidates,
  totalPages,
  hasFilters,
  currentPage,
  itemsPerPage,
  uniquePositions,
  uniqueDepartments,
  uniqueStages,
  uniqueStatuses,
  handleSearch,
  handleFilterChange,
  handleSortChange,
  handlePageChange,
  clearFilters,
} = useCandidates();

// Items per page options
const itemsPerPageOptions = [5, 10, 20, 50];

// Methods
const _handlePageSizeChange = (newSize: number) => {
  itemsPerPage.value = newSize;
  currentPage.value = 1;
};

const handleAddCandidate = () => {
  // TODO: Implement add candidate functionality
  console.log('Add candidate clicked');
};

const handleViewProfile = (candidate: Candidate) => {
  navigateTo(`/interviews/candidates/${candidate.id}`);
};

const handleViewResume = (candidate: Candidate) => {
  if (candidate.resumeUrl) {
    // In a real app, this would open the resume in a new tab or modal
    window.open(candidate.resumeUrl, '_blank');
  }
};

const handleScheduleInterview = (candidate: Candidate) => {
  // TODO: Implement schedule interview functionality
  console.log('Schedule interview for:', candidate);
};

const handleMoveToNextStage = (candidate: Candidate) => {
  // TODO: Implement move to next stage functionality
  console.log('Move to next stage:', candidate);
};

const handleRejectCandidate = (candidate: Candidate) => {
  // TODO: Implement reject candidate functionality
  console.log('Reject candidate:', candidate);
};
</script>