<template>
  <DashboardWidget title="Payroll Summary">
    <div class="space-y-4">
      <!-- Current Month Summary -->
      <div class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
        <div class="text-2xl font-bold text-green-600 dark:text-green-400">${{ payroll.grossPay.toLocaleString() }}</div>
        <p class="text-sm text-green-700 dark:text-green-300">Gross Pay (This Month)</p>
      </div>

      <!-- Payroll Breakdown -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Base Salary</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">${{ payroll.baseSalary.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Bonuses</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">${{ payroll.bonuses.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Overtime</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">${{ payroll.overtime.toLocaleString() }}</span>
        </div>
        <div class="h-px bg-gray-200 dark:bg-gray-700"></div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Deductions</span>
          <span class="text-sm font-medium text-red-600 dark:text-red-400">-${{ payroll.deductions.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Net Pay -->
      <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-900 dark:text-white">Net Pay</span>
          <span class="text-sm font-bold text-green-600 dark:text-green-400">${{ payroll.netPay.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Next Payment -->
      <div class="text-center text-xs text-gray-500 dark:text-gray-400">
        Next payment: {{ payroll.nextPaymentDate }}
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
const payroll = {
  grossPay: 6500,
  baseSalary: 6000,
  bonuses: 300,
  overtime: 200,
  deductions: 1450,
  netPay: 5050,
  nextPaymentDate: 'Jan 31, 2024'
};
</script>