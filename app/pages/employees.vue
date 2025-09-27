<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Employees
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Manage your organization's employees and their information.
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="text-center py-12">
        <UIcon name="i-material-symbols:emoji-people" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No employees found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Get started by adding your first employee.</p>
        <UButton color="primary">
          <UIcon name="i-material-symbols:person-add" class="w-4 h-4 mr-2" />
          Add Employee
        </UButton>
      </div>
    </div>
  </div>
</template>
