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

const title = '법규 위반 분포';
const series = computed(() => {
  return [
    {
      name: '과속',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.cnt_027_01),
    },
    {
      name: '중앙선침범',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.cnt_027_02),
    },
    {
      name: '신호위반',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.cnt_027_03),
    },
    {
      name: '안전거리미확보',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.cnt_027_04),
    },
    {
      name: '안전운전의무불이행',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.cnt_027_05),
    },
  ];
});
const legend = {
  data: ['과속', '중앙선침범', '신호위반', '안전거리미확보', '안전운전의무불이행'],
};

const xAxis = computed(() => {
  const isChartData = trafficAccidentDataList.value.length > 0;
  const chartData = isChartData
    ? trafficAccidentDataList.value.filter((item) => item.acc_cl_nm === '전체사고')
    : [];
  return [
    {
      type: 'category',
      data: chartData.map((item) => item.std_year),
      boundaryGap: false,
    },
  ];
});

const yAxis = {
  type: 'value',
};
</script>
