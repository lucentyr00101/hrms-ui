<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <div class="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Leave Dashboard
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your time off and view leave balances
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AvailableLeaveCard />
        <UsedLeaveCard />
        <PendingApprovalCard />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <LeaveCalendar />
        </div>

        <div class="space-y-6">
          <LeaveFilters />
          <UpcomingLeaves />
          <LeavePolicyPanel />
        </div>
      </div>

      <QuickActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuickActions from "~/components/leave/QuickActions.vue";
definePageMeta({
  title: 'Leave Dashboard'
})
</script>
