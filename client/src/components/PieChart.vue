<template>
  <v-chart :option="chartOptions" autoresize />
</template>

<script>
import { defineComponent, computed } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export default defineComponent({
  name: 'PieChart',
  components: {
    'v-chart': VChart,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chartOptions = computed(() => ({
      title: {
        text: 'Pie Chart',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Transactions',
          type: 'pie',
          radius: '50%',
          data: props.chartData.map((item) => ({
            value: item.value,
            name: item.name,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }));

    return {
      chartOptions,
    };
  },
});
</script>
