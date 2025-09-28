<template>
  <div class="space-y-6">
    <PageHeader
      title="Interviews"
      description="Schedule and manage interviews with candidates."
    />

    <EmptyState
      icon="i-material-symbols:3p-rounded"
      title="No interviews scheduled"
      description="Start by scheduling your first interview."
      button-text="Schedule Interview"
      button-icon="i-material-symbols:calendar-add-on"
      @action="handleScheduleInterview"
    />
  </div>
</template>

<script setup lang="ts">
const handleScheduleInterview = () => {
  // TODO: Implement interview scheduling
  console.log('Schedule interview clicked');
};
</script>
