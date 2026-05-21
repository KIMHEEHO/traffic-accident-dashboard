<template>
  <base-chart :title="title" :series="series" :legend="legend" :x-axis="xAxis" :y-axis="yAxis" />
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

const title = '연도별 사고 추이';
const series = computed(() => {
  return [
    {
      name: '사고 건수',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.acc_cnt),
    },
    {
      name: '사망자 수',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.dth_dnv_cnt),
    },
    {
      name: '부상자 수',
      type: 'bar' as const,
      data: trafficAccidentDataList.value.map((item) => item.injpsn_cnt),
    },
  ];
});
const legend = {
  data: ['사고 건수', '사망자 수', '부상자 수'],
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
