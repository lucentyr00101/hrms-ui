<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Interviews
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Schedule and manage interviews with candidates.
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="text-center py-12">
        <UIcon name="i-material-symbols:3p-rounded" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No interviews scheduled</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Start by scheduling your first interview.</p>
        <UButton color="primary">
          <UIcon name="i-material-symbols:calendar-add-on" class="w-4 h-4 mr-2" />
          Schedule Interview
        </UButton>
      </div>
    </div>
  </div>
</template>
