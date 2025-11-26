<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Interviews
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Schedule and manage interviews with candidates.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <QuickActionCard
        to="/interviews/candidates"
        title="View Candidates"
        description="Browse and manage candidates through the interview process"
        icon="i-material-symbols:person-search"
        gradient="from-purple-500 to-pink-500"
      />

      <QuickActionCard
        to="/interviews/schedule"
        title="Schedule Interview"
        description="Schedule a new interview with a candidate"
        icon="i-material-symbols:calendar-add-on"
        gradient="from-blue-500 to-purple-500"
      />

      <QuickActionCard
        to="/interviews/schedule"
        title="Interview Calendar"
        description="View scheduled interviews in calendar format"
        icon="i-material-symbols:calendar-month"
        gradient="from-green-500 to-teal-500"
      />
    </div>

    <UCard>
      <template #header>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          Recent Interview Activity
        </h3>
      </template>

      <div class="space-y-3">
        <ActivityItem
          title="John Smith - Technical Interview"
          description="Software Engineer position"
          status="Scheduled"
          status-color="info"
        />
        
        <ActivityItem
          title="Emily Davis - Final Interview"
          description="UX Designer position"
          status="Completed"
          status-color="success"
        />
      </div>

      <template #footer>
        <NuxtLink 
          to="/interviews/candidates"
          class="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>View all candidates</span>
          <UIcon name="i-material-symbols:arrow-forward" class="w-4 h-4" />
        </NuxtLink>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Interviews'
})
</script>