<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Leave Dashboard
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your time off and view leave balances
        </p>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <AvailableLeaveCard />
        <UsedLeaveCard />
        <PendingApprovalCard />
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Calendar and Filters -->
        <div class="lg:col-span-2 space-y-6">
          <LeaveCalendar />
        </div>

        <!-- Right Column: Filters and Additional Info -->
        <div class="space-y-6">
          <LeaveFilters />
          <UpcomingLeaves />
          <LeavePolicyPanel />
        </div>
      </div>

      <!-- Quick Actions at Bottom -->
      <div class="mt-6">
        <QuickActions />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvailableLeaveCard from '~/components/leave/AvailableLeaveCard.vue';
import UsedLeaveCard from '~/components/leave/UsedLeaveCard.vue';
import PendingApprovalCard from '~/components/leave/PendingApprovalCard.vue';
import LeaveCalendar from '~/components/leave/LeaveCalendar.vue';
import LeaveFilters from '~/components/leave/LeaveFilters.vue';
import UpcomingLeaves from '~/components/leave/UpcomingLeaves.vue';
import LeavePolicyPanel from '~/components/leave/LeavePolicyPanel.vue';
import QuickActions from '~/components/leave/QuickActions.vue';

// Set page metadata
definePageMeta({
  title: 'Leave Dashboard'
});
</script>
