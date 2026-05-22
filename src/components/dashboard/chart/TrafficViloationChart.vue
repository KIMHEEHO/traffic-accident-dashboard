<template>
  <base-chart
    v-if="isChartData"
    :title="title"
    :series="series"
    :legend="legend"
    :x-axis="yAxis"
    :y-axis="xAxis"
  />
</template>
<script setup lang="ts">
import { useTrafficAccidentStore } from 'src/stores/useTrafficAccidentStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import BaseChart from 'src/components/BaseChart.vue';
const trafficAccidentStore = useTrafficAccidentStore();

const { trafficAccidentData } = storeToRefs(trafficAccidentStore);

const trafficAccidentDataList = computed(() => {
  return trafficAccidentData.value;
});

const isChartData = computed(() => {
  return trafficAccidentDataList.value.length > 0;
});

const chartData = computed(() => {
  return trafficAccidentDataList.value.filter((item) => item.acc_cl_nm === '전체사고');
});

const title = '법규 위반 분포';
const series = computed(() => {
  return [
    {
      name: '과속',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.cnt_027_01),
      barGap: '30%',
    },
    {
      name: '중앙선침범',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.cnt_027_02),
      barGap: '30%',
    },
    {
      name: '신호위반',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.cnt_027_03),
      barGap: '30%',
    },
    {
      name: '안전거리미확보',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.cnt_027_04),
      barGap: '30%',
    },
    {
      name: '안전운전의무불이행',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.cnt_027_05),
      barGap: '30%',
    },
  ];
});
const legend = {
  type: 'scroll',
  data: ['과속', '중앙선침범', '신호위반', '안전거리미확보', '안전운전의무불이행'],
};

const xAxis = computed(() => {
  return {
    type: 'category' as const,
    data: chartData.value.map((item) => item.std_year),
    boundaryGap: true,
  };
});

const yAxis = {
  type: 'value',
};
</script>
