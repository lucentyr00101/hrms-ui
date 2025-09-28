<template>
  <div class="space-y-6">
    <PageHeader
      title="Reports"
      description="View analytics and reports for your HRMS data."
    />

    <EmptyState
      icon="i-material-symbols:analytics"
      title="Reports coming soon"
      description="Advanced reporting features are being developed."
      button-text="View Dashboard"
      button-icon="i-material-symbols:dashboard"
      @action="navigateTo('/dashboard')"
    />
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this page
</script>