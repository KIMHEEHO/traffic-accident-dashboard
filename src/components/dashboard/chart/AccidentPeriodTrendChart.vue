<template>
  <div class="q-pa-md">
    <base-chart :title="title" :series="series" :legend="legend" :x-axis="xAxis" :y-axis="yAxis" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseChart from 'src/components/BaseChart.vue';
import type { LineSeriesOption } from 'echarts/charts';

const mockYearlyData = [
  { std_year: '2014', acc_cnt: 223552, dth_dnv_cnt: 4762, injpsn_cnt: 337497, ftlt_rate: 2.13 },
  { std_year: '2015', acc_cnt: 232035, dth_dnv_cnt: 4621, injpsn_cnt: 350400, ftlt_rate: 1.99 },
  { std_year: '2016', acc_cnt: 220917, dth_dnv_cnt: 4292, injpsn_cnt: 331720, ftlt_rate: 1.94 },
  { std_year: '2017', acc_cnt: 216335, dth_dnv_cnt: 4185, injpsn_cnt: 322829, ftlt_rate: 1.93 },
  { std_year: '2018', acc_cnt: 217148, dth_dnv_cnt: 3781, injpsn_cnt: 323037, ftlt_rate: 1.74 },
  { std_year: '2019', acc_cnt: 229600, dth_dnv_cnt: 3349, injpsn_cnt: 341712, ftlt_rate: 1.46 },
  { std_year: '2020', acc_cnt: 209654, dth_dnv_cnt: 3081, injpsn_cnt: 306194, ftlt_rate: 1.47 },
  { std_year: '2021', acc_cnt: 203130, dth_dnv_cnt: 2916, injpsn_cnt: 291608, ftlt_rate: 1.44 },
  { std_year: '2022', acc_cnt: 196836, dth_dnv_cnt: 2735, injpsn_cnt: 281786, ftlt_rate: 1.39 },
  { std_year: '2023', acc_cnt: 198296, dth_dnv_cnt: 2551, injpsn_cnt: 283542, ftlt_rate: 1.29 },
  { std_year: '2024', acc_cnt: 194510, dth_dnv_cnt: 2420, injpsn_cnt: 278910, ftlt_rate: 1.24 },
];

const title = '최근 10년간 전국 교통사고 추이 (2014-2024)';

const series = computed<LineSeriesOption[]>(() => {
  return [
    {
      name: '사고 건수',
      type: 'line' as const,
      data: mockYearlyData.map((item) => item.acc_cnt),
      itemStyle: { color: '#5470C6' },
      smooth: true,
      symbolSize: 6,
    },
    {
      name: '부상자 수',
      type: 'line' as const,
      data: mockYearlyData.map((item) => item.injpsn_cnt),
      itemStyle: { color: '#91CC75' },
      smooth: true,
      symbolSize: 6,
    },
    {
      name: '사망자 수',
      type: 'line' as const,

      data: mockYearlyData.map((item) => item.dth_dnv_cnt),
      itemStyle: { color: '#EE6666' },
      smooth: true,
      symbolSize: 6,
    },
    {
      name: '치사율',
      type: 'line' as const,
      yAxisIndex: 1,
      data: mockYearlyData.map((item) => item.ftlt_rate),
      itemStyle: { color: '#FAC858' },
      smooth: true,
      lineStyle: { width: 3, type: 'dashed' },
    },
  ];
});

const legend = {
  data: ['사고 건수', '부상자 수', '사망자 수', '치사율'],
};

const xAxis = computed(() => {
  return {
    type: 'category' as const,
    data: mockYearlyData.map((item) => item.std_year),
    boundaryGap: false,
  };
});

const yAxis = [
  {
    type: 'value' as const,
    name: '사고/인원수 (건/명)',
    position: 'left' as const,
    splitLine: { show: true },
  },
  {
    type: 'value' as const,
    name: '치사율 (%)',
    position: 'right' as const,
    splitLine: { show: false },
    axisLabel: {
      formatter: '{value} %',
    },
  },
];
</script>
