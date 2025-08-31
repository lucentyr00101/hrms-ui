<template>
  <DashboardWidget title="Leave by Department">
    <div class="space-y-4">
      <!-- Chart Container -->
      <div class="h-48 flex items-center justify-center">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <!-- Department List -->
      <div class="space-y-2">
        <div 
          v-for="(dept, index) in departmentData" 
          :key="dept.name"
          class="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <div class="flex items-center space-x-2">
            <div 
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: dept.color }"
            ></div>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ dept.name }}
            </span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ dept.count }} employees
          </div>
        </div>
      </div>
    </div>
  </DashboardWidget>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { DUMMY_CHART_DATA } from '~/constants/DUMMY_DASHBOARD_DATA';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = DUMMY_CHART_DATA.departmentLeaves;

const departmentData = computed(() => {
  return chartData.labels.map((label, index) => ({
    name: label,
    count: chartData.datasets[0].data[index],
    color: chartData.datasets[0].backgroundColor[index]
  }));
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.parsed} employees`;
        }
      }
    }
  }
};
</script>