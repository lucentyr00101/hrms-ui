<template>
  <DashboardWidget title="Leave by Department">
    <div class="space-y-4">
      <!-- Chart Container -->
      <div class="h-48 flex items-center justify-center">
        <canvas ref="chartCanvas" class="max-w-full max-h-full"></canvas>
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
import { Chart as ChartJS, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js';
import { DUMMY_CHART_DATA } from '~/constants/DUMMY_DASHBOARD_DATA';

ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

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

onMounted(() => {
  if (chartCanvas.value) {
    chartInstance = new ChartJS(chartCanvas.value, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  }
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>