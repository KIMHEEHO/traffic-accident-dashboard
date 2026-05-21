<template>
  <base-chart
    v-if="isChartData"
    :title="title"
    :series="series"
    :legend="legend"
    :tooltip="tooltip"
  />
</template>
<script setup lang="ts">
import { useTrafficAccidentStore } from 'src/stores/useTrafficAccidentStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import BaseChart from 'src/components/BaseChart.vue';
import type { PieSeriesOption } from 'echarts/charts';
import type { TooltipComponentOption, LegendComponentOption } from 'echarts/components';

const trafficAccidentStore = useTrafficAccidentStore();

const { trafficAccidentData } = storeToRefs(trafficAccidentStore);

const trafficAccidentDataList = computed(() => {
  return trafficAccidentData.value;
});

const isChartData = computed(() => {
  return trafficAccidentDataList.value.length > 0;
});

const title = '사고 유형 분포';
const tooltip: TooltipComponentOption = {
  trigger: 'item',
};

const legend: LegendComponentOption = {
  orient: 'vertical',
  left: 'left',
};

const series = computed<PieSeriesOption[]>(() => {
  const chartData = trafficAccidentDataList.value.find((item) => item.acc_cl_nm === '전체사고');

  if (!chartData) return [];

  return [
    {
      name: '사고 유형',
      type: 'pie',
      radius: '50%',
      data: [
        {
          value: Number(chartData.cnt_014_01),
          name: '차대사람',
        },
        {
          value: Number(chartData.cnt_014_02),
          name: '차대차',
        },
        {
          value: Number(chartData.cnt_014_03),
          name: '차량단독',
        },
        {
          value: Number(chartData.cnt_014_04),
          name: '철길건널목',
        },
      ],
    },
  ];
});
</script>
