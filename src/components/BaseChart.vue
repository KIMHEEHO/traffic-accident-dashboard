<template>
  <div ref="chart" :style="props.style"></div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts';
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
>;

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
]);

interface ChartProps {
  style?: {
    width: string;
    height: string;
  };
  title?: string;
  legend?: ECOption['legend'];
  tooltip?: ECOption['tooltip'];
  xAxis?: object;
  yAxis?: object;
  series?: ECOption['series'];
}

const props = withDefaults(defineProps<ChartProps>(), {
  style: () => ({
    width: '100%',
    height: '250px',
  }),
  title: '',
  legend: () => ({
    data: ['Series 1'],
  }),
  tooltip: () => ({}),

  xAxis: () => ({
    type: 'category',
    boundaryGap: false,
    data: [],
  }),

  yAxis: () => ({
    type: 'value',
  }),

  series: (): (LineSeriesOption | BarSeriesOption | PieSeriesOption)[] => [
    {
      name: 'Series 1',
      type: 'bar' as const,
      data: [],
    },
  ],
});

const chart = ref<HTMLElement | null>(null);
const chartInstance = ref<echarts.ECharts | null>(null);
const option = computed<ECOption>(() => ({
  title: {
    text: props.title,
  },
  legend: props.legend,
  tooltip: props.tooltip,
  xAxis: props.xAxis,
  yAxis: props.yAxis,
  series: props.series,
}));

watch(option, (newOption) => {
  chartInstance.value?.setOption(newOption);
});

const handleResize = () => {
  chartInstance.value?.resize();
};

onMounted(() => {
  if (!chart.value) return;

  chartInstance.value = echarts.init(chart.value);

  chartInstance.value.setOption(option.value);

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);

  chartInstance.value?.dispose();
  chartInstance.value = null;
});
</script>
