<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Leave Types Management
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Configure and manage all leave types available to employees
        </p>
      </div>
      <UButton
        color="primary"
        icon="i-material-symbols:add"
        @click="handleCreateNew"
      >
        Create Leave Type
      </UButton>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Total Leave Types</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ leaveTypes.length }}
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UIcon name="i-material-symbols:event-available" class="w-6 h-6 text-primary" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ activeLeaveTypesCount }}
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <UIcon name="i-material-symbols:check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Inactive</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {{ inactiveLeaveTypesCount }}
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <UIcon name="i-material-symbols:cancel" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Most Used</p>
            <p class="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {{ mostUsedLeaveType?.name || 'N/A' }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-500">
              {{ mostUsedLeaveType?.usageCount || 0 }} requests
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <UIcon name="i-material-symbols:trending-up" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Filters and Actions -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex flex-1 gap-4 w-full sm:w-auto">
        <UInput
          v-model="searchQuery"
          icon="i-material-symbols:search"
          placeholder="Search by name or code..."
          class="flex-1"
          @input="handleSearch"
        />
        <USelect
          v-model="statusFilter"
          :options="[
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]"
          option-attribute="label"
          value-attribute="value"
          @change="handleStatusFilter"
        />
      </div>

      <div v-if="selectedLeaveTypes.length > 0" class="flex gap-2">
        <UButton
          color="success"
          variant="outline"
          size="sm"
          @click="handleBulkActivate"
        >
          Activate ({{ selectedLeaveTypes.length }})
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          @click="handleBulkDeactivate"
        >
          Deactivate ({{ selectedLeaveTypes.length }})
        </UButton>
        <UButton
          color="error"
          variant="outline"
          size="sm"
          @click="handleBulkDelete"
        >
          Delete ({{ selectedLeaveTypes.length }})
        </UButton>
      </div>
    </div>

    <!-- Leave Types Table -->
    <UCard>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left p-4">
                <UCheckbox
                  :model-value="selectedLeaveTypes.length === paginatedLeaveTypes.length && paginatedLeaveTypes.length > 0"
                  @update:model-value="toggleSelectAll"
                />
              </th>
              <th class="text-left p-4 font-semibold text-gray-900 dark:text-white cursor-pointer" @click="handleSort('name')">
                Leave Type
                <UIcon
                  v-if="sortBy === 'name'"
                  :name="sortOrder === 'asc' ? 'i-material-symbols:arrow-upward' : 'i-material-symbols:arrow-downward'"
                  class="inline-block ml-1"
                />
              </th>
              <th class="text-left p-4 font-semibold text-gray-900 dark:text-white">Code</th>
              <th class="text-left p-4 font-semibold text-gray-900 dark:text-white cursor-pointer" @click="handleSort('status')">
                Status
                <UIcon
                  v-if="sortBy === 'status'"
                  :name="sortOrder === 'asc' ? 'i-material-symbols:arrow-upward' : 'i-material-symbols:arrow-downward'"
                  class="inline-block ml-1"
                />
              </th>
              <th class="text-left p-4 font-semibold text-gray-900 dark:text-white">Settings</th>
              <th class="text-left p-4 font-semibold text-gray-900 dark:text-white cursor-pointer" @click="handleSort('usage')">
                Usage
                <UIcon
                  v-if="sortBy === 'usage'"
                  :name="sortOrder === 'asc' ? 'i-material-symbols:arrow-upward' : 'i-material-symbols:arrow-downward'"
                  class="inline-block ml-1"
                />
              </th>
              <th class="text-left p-4 font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="leaveType in paginatedLeaveTypes"
              :key="leaveType.id"
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="p-4">
                <UCheckbox
                  :model-value="selectedLeaveTypes.includes(leaveType.id)"
                  @update:model-value="toggleSelection(leaveType.id)"
                />
              </td>
              <td class="p-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                    :style="{ backgroundColor: leaveType.color + '20' }"
                  >
                    <UIcon :name="leaveType.icon" class="w-5 h-5" :style="{ color: leaveType.color }" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ leaveType.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ leaveType.description }}</p>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <UBadge color="neutral" variant="outline">{{ leaveType.code }}</UBadge>
              </td>
              <td class="p-4">
                <UBadge :color="leaveType.status === 'active' ? 'success' : 'neutral'">
                  {{ leaveType.status === 'active' ? 'Active' : 'Inactive' }}
                </UBadge>
              </td>
              <td class="p-4">
                <div class="flex flex-col gap-1 text-sm">
                  <span class="text-gray-600 dark:text-gray-400">
                    <UIcon name="i-material-symbols:check-circle" class="inline-block" />
                    {{ leaveType.requiresApproval ? 'Requires Approval' : 'Auto-approved' }}
                  </span>
                  <span class="text-gray-600 dark:text-gray-400">
                    <UIcon name="i-material-symbols:payments" class="inline-block" />
                    {{ leaveType.isPaid ? 'Paid' : 'Unpaid' }}
                  </span>
                </div>
              </td>
              <td class="p-4">
                <div class="flex flex-col gap-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ leaveType.usageCount }} requests</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ leaveType.approvalRate }}% approved</p>
                </div>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <UButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    icon="i-material-symbols:edit"
                    @click="handleEdit(leaveType.id)"
                  />
                  <UButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    icon="i-material-symbols:content-copy"
                    @click="handleDuplicate(leaveType.id)"
                  />
                  <UButton
                    :color="leaveType.status === 'active' ? 'neutral' : 'success'"
                    variant="ghost"
                    size="sm"
                    :icon="leaveType.status === 'active' ? 'i-material-symbols:toggle-on' : 'i-material-symbols:toggle-off'"
                    @click="handleToggleStatus(leaveType.id)"
                  />
                  <UButton
                    color="error"
                    variant="ghost"
                    size="sm"
                    icon="i-material-symbols:delete"
                    @click="handleDelete(leaveType.id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="paginatedLeaveTypes.length === 0" class="text-center py-12">
          <UIcon name="i-material-symbols:event-busy" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No leave types found
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ searchQuery ? 'Try adjusting your search or filters.' : 'Get started by creating your first leave type.' }}
          </p>
          <UButton
            v-if="!searchQuery && statusFilter === 'all'"
            color="primary"
            @click="handleCreateNew"
          >
            Create Leave Type
          </UButton>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-4 flex justify-center">
        <UPagination
          v-model="currentPage"
          :page-count="totalPages"
          :total="filteredLeaveTypes.length"
        />
      </div>
    </UCard>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Confirm Delete</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-400">
          Are you sure you want to delete this leave type? This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="outline" @click="showDeleteModal = false">
              Cancel
            </UButton>
            <UButton color="error" @click="confirmDelete">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Bulk Delete Confirmation Modal -->
    <UModal v-model="showBulkDeleteModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Confirm Bulk Delete</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-400">
          Are you sure you want to delete {{ selectedLeaveTypes.length }} leave type(s)? This action cannot be undone.
        </p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="neutral" variant="outline" @click="showBulkDeleteModal = false">
              Cancel
            </UButton>
            <UButton color="error" @click="confirmBulkDelete">
              Delete All
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useLeaveTypes } from '~/composables/useLeaveTypes';

const toast = useToast();

const {
  leaveTypes,
  searchQuery,
  statusFilter,
  sortBy,
  sortOrder,
  selectedLeaveTypes,
  currentPage,
  filteredLeaveTypes,
  paginatedLeaveTypes,
  totalPages,
  activeLeaveTypesCount,
  inactiveLeaveTypesCount,
  mostUsedLeaveType,
  toggleLeaveTypeStatus,
  duplicateLeaveType,
  deleteLeaveType,
  bulkActivate,
  bulkDeactivate,
  bulkDelete,
  handleSearch: search,
  handleStatusFilter: filterStatus,
  handleSort,
  toggleSelection,
  toggleSelectAll,
  clearSelection
} = useLeaveTypes();

const showDeleteModal = ref(false);
const leaveTypeToDelete = ref<string | null>(null);

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  search(target.value);
};

const handleStatusFilter = () => {
  filterStatus(statusFilter.value);
};

const handleCreateNew = () => {
  navigateTo('/leave/types/new');
};

const handleEdit = (id: string) => {
  navigateTo(`/leave/types/edit/${id}`);
};

const handleDuplicate = (id: string) => {
  const duplicated = duplicateLeaveType(id);
  if (duplicated) {
    toast.add({
      title: 'Success',
      description: 'Leave type duplicated successfully',
      color: 'success'
    });
  } else {
    toast.add({
      title: 'Error',
      description: 'Failed to duplicate leave type',
      color: 'error'
    });
  }
};

const handleToggleStatus = (id: string) => {
  const success = toggleLeaveTypeStatus(id);
  if (success) {
    toast.add({
      title: 'Success',
      description: 'Leave type status updated',
      color: 'success'
    });
  } else {
    toast.add({
      title: 'Error',
      description: 'Failed to update leave type status',
      color: 'error'
    });
  }
};

const handleDelete = (id: string) => {
  leaveTypeToDelete.value = id;
  showDeleteModal.value = true;
};

const confirmDelete = () => {
  if (leaveTypeToDelete.value) {
    const success = deleteLeaveType(leaveTypeToDelete.value);
    if (success) {
      toast.add({
        title: 'Success',
        description: 'Leave type deleted successfully',
        color: 'success'
      });
      showDeleteModal.value = false;
      leaveTypeToDelete.value = null;
    } else {
      toast.add({
        title: 'Error',
        description: 'Failed to delete leave type',
        color: 'error'
      });
    }
  }
};

const handleBulkActivate = () => {
  const count = bulkActivate(selectedLeaveTypes.value);
  toast.add({
    title: 'Success',
    description: `${count} leave type(s) activated`,
    color: 'success'
  });
  clearSelection();
};

const handleBulkDeactivate = () => {
  const count = bulkDeactivate(selectedLeaveTypes.value);
  toast.add({
    title: 'Success',
    description: `${count} leave type(s) deactivated`,
    color: 'success'
  });
  clearSelection();
};

const showBulkDeleteModal = ref(false);

const handleBulkDelete = () => {
  showBulkDeleteModal.value = true;
};

const confirmBulkDelete = () => {
  const count = bulkDelete(selectedLeaveTypes.value);
  toast.add({
    title: 'Success',
    description: `${count} leave type(s) deleted`,
    color: 'success'
  });
  clearSelection();
  showBulkDeleteModal.value = false;
};

definePageMeta({
  title: 'Leave Types Management'
});
</script>
