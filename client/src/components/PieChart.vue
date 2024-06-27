<template>
  <div>
    <Pie :data="chartData" :options="options" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  PieController
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, PieController);

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      })
    }
  }
});
</script>

<style scoped>
div {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
