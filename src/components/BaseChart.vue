<template>
  <div ref="chart" :style="props.style"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
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
import { Dark } from 'quasar';

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
  yAxis?: object | object[]; // 축이 여러 개일 수 있으므로 배열 허용
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

const chartInstance = shallowRef<echarts.ECharts | null>(null);

const normalizedSeries = computed(() =>
  (Array.isArray(props.series) ? props.series : [props.series]).map((s) => ({
    ...s,
    ...(s.type === 'bar' ? { barWidth: 18 } : {}),
  })),
);

const option = computed<ECOption>(() => ({
  backgroundColor: Dark.isActive ? '#121212' : '#fff',

  title: {
    text: props.title,
    textStyle: {
      color: Dark.isActive ? '#fff' : '#333',
    },
  },
  legend: {
    ...props.legend,
    textStyle: {
      color: Dark.isActive ? '#fff' : '#333',
    },
  },
  tooltip: {
    ...props.tooltip,
    backgroundColor: Dark.isActive ? '#333' : '#fff',
    textStyle: {
      color: Dark.isActive ? '#fff' : '#333',
    },
  },

  xAxis: {
    ...props.xAxis,
    axisLabel: {
      color: Dark.isActive ? '#ccc' : '#333',
    },
    axisLine: {
      lineStyle: {
        color: Dark.isActive ? '#666' : '#ccc',
      },
    },
  },
  yAxis: Array.isArray(props.yAxis)
    ? props.yAxis.map((axis) => ({
        ...axis,
        axisLabel: { color: Dark.isActive ? '#ccc' : '#333', ...axis.axisLabel },
        splitLine: { lineStyle: { color: Dark.isActive ? '#333' : '#eee' }, ...axis.splitLine },
      }))
    : {
        ...props.yAxis,
        axisLabel: { color: Dark.isActive ? '#ccc' : '#333' },
        splitLine: { lineStyle: { color: Dark.isActive ? '#333' : '#eee' } },
      },

  series: normalizedSeries.value,
}));

watch(
  option,
  (newOption) => {
    if (chartInstance.value && !chartInstance.value.isDisposed()) {
      chartInstance.value.setOption(newOption, true);
    }
  },
  { deep: true },
);

const handleResize = () => {
  if (!chartInstance.value || chartInstance.value.isDisposed()) return;
  chartInstance.value.resize();
};

onMounted(() => {
  if (!chart.value) return;

  chartInstance.value = echarts.init(chart.value);
  chartInstance.value.setOption(option.value);

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);

  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
});
</script>
