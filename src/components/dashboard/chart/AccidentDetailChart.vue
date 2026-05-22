<template>
  <base-chart
    v-if="isChartData"
    :title="props.type"
    :series="series"
    :legend="legend"
    :x-axis="xAxis"
    :y-axis="yAxis"
  />
</template>
<script setup lang="ts">
import { useTrafficAccidentStore } from 'src/stores/useTrafficAccidentStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import BaseChart from 'src/components/BaseChart.vue';
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});
const trafficAccidentStore = useTrafficAccidentStore();

const { trafficAccidentData } = storeToRefs(trafficAccidentStore);

const trafficAccidentDataList = computed(() => {
  return trafficAccidentData.value;
});

const isChartData = computed(() => {
  return trafficAccidentDataList.value.length > 0;
});

const chartData = computed(() =>
  trafficAccidentDataList.value.filter((item) => item.acc_cl_nm === props.type),
);

const series = computed(() => {
  return [
    {
      name: '사고 건수',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.acc_cnt),
      barGap: '30%',
      itemStyle: { color: '#5470C6' },
    },
    {
      name: '사망자 수',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.dth_dnv_cnt),
      barGap: '30%',
      itemStyle: { color: '#EE6666' },
    },
    {
      name: '부상자 수',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.injpsn_cnt),
      barGap: '30%',
      itemStyle: { color: '#91CC75' },
    },
    {
      name: '치사율',
      type: 'bar' as const,
      data: chartData.value.map((item) => item.ftlt_rate),
      barGap: '30%',
      itemStyle: { color: '#FAC858' },
    },
  ];
});
const legend = {
  data: ['사고 건수', '사망자 수', '부상자 수', '치사율'],
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
