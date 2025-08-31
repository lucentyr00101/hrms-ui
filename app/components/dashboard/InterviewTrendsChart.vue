<template>
  <DashboardWidget title="Interview Trends">
    <div class="space-y-4">
      <!-- Chart Container -->
      <div class="h-64">
        <Line :data="chartData" :options="chartOptions" />
      </div>

      <!-- Trend Summary -->
      <div class="grid grid-cols-3 gap-2 text-xs">
        <div class="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div class="font-semibold text-purple-700 dark:text-purple-300">Avg/Month</div>
          <div class="text-purple-900 dark:text-purple-100">22</div>
        </div>
        <div class="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div class="font-semibold text-blue-700 dark:text-blue-300">Peak</div>
          <div class="text-blue-900 dark:text-blue-100">30</div>
        </div>
        <div class="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div class="font-semibold text-green-700 dark:text-green-300">Growth</div>
          <div class="text-green-900 dark:text-green-100">+15%</div>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { DUMMY_CHART_DATA } from '~/constants/DUMMY_DASHBOARD_DATA';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartData = DUMMY_CHART_DATA.interviewTrends;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      }
    },
    y: {
      display: true,
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6
    }
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false
  }
};
</script>