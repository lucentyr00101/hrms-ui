<template>
  <div class="space-y-6">
    <PageHeader
      title="Settings"
      description="Configure your HRMS application settings."
    />

    <EmptyState
      icon="i-material-symbols:settings"
      title="Settings panel coming soon"
      description="System configuration options are being developed."
      button-text="Back to Dashboard"
      button-icon="i-material-symbols:home"
      @action="navigateTo('/dashboard')"
    />
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this page
</script>