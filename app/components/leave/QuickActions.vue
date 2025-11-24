<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <UButton
        color="primary"
        size="lg"
        block
        icon="i-material-symbols:add-circle"
      >
        Request Leave
      </UButton>

      <UButton
        color="neutral"
        variant="soft"
        size="lg"
        block
        icon="i-material-symbols:history"
      >
        View Leave History
      </UButton>

      <UButton
        color="neutral"
        variant="soft"
        size="lg"
        block
        icon="i-material-symbols:download"
      >
        Download Summary
      </UButton>

      <UButton
        color="neutral"
        variant="soft"
        size="lg"
        block
        icon="i-material-symbols:description"
      >
        Leave Policy
      </UButton>
    </div>
  </UCard>
</template>
