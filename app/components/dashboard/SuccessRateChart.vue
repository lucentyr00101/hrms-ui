<template>
  <DashboardWidget title="Interview Success Rate">
    <div class="space-y-4">
      <!-- Success Rate Summary -->
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ stats.passingRate }}%
          </div>
          <p class="text-xs text-green-700 dark:text-green-300 mt-1">Passing Rate</p>
        </div>
        <div class="text-center p-3 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-lg">
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">
            {{ stats.failingRate }}%
          </div>
          <p class="text-xs text-red-700 dark:text-red-300 mt-1">Failing Rate</p>
        </div>
      </div>

      <!-- Chart Container -->
      <div class="h-48 flex items-center justify-center">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <!-- Additional Stats -->
      <div class="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div class="text-center">
          <div class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ stats.totalInterviews }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Total Interviews</p>
        </div>
        <div class="text-center">
          <div class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ stats.successfulHires }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Successful Hires</p>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { DUMMY_DASHBOARD_STATS, DUMMY_CHART_DATA } from '~/constants/DUMMY_DASHBOARD_DATA';

ChartJS.register(ArcElement, Tooltip, Legend);

const stats = DUMMY_DASHBOARD_STATS;
const chartData = DUMMY_CHART_DATA.successRates;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: { label: string; parsed: number }) {
          return `${context.label}: ${context.parsed}%`;
        }
      }
    }
  },
  cutout: '60%'
};
</script>