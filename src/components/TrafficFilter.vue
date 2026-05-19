<template>
  <div class="q-pa-md">
    <q-select
      v-model="selectedYear"
      :options="yearList"
      option-label="label"
      option-value="value"
      emit-value
      map-options
      label="연도 선택"
    />
    <q-select
      v-model="selectedSiDo"
      :options="siDoList"
      option-label="name"
      option-value="code"
      emit-value
      map-options
      label="시/도 선택"
    />

    <q-select
      v-model="selectedGuGun"
      :options="guGunMap[selectedSiDo] || []"
      option-label="name"
      option-value="code"
      emit-value
      map-options
      label="구/군 선택"
      :disable="!selectedSiDo"
    />

    <q-btn label="조회" color="primary" class="q-mt-md" @click="searchAccidents" />
  </div>
</template>

<script setup lang="ts">
import { siDoList, guGunMap, type SiDoCode } from 'src/constants/locations';
import { ref, watch } from 'vue';
import { useTrafficAccidentStore } from 'src/stores/useTrafficAccidentStore';
import type TrafficAccidentParam from 'src/types/TrafficAccidentParam';

const trafficAccidentStore = useTrafficAccidentStore();
const selectedYear = ref('');
const selectedSiDo = ref<SiDoCode>('1100');
const selectedGuGun = ref('');

const yearList = [
  { label: '2014', value: '2014' },
  { label: '2015', value: '2015' },
  { label: '2016', value: '2016' },
  { label: '2017', value: '2017' },
  { label: '2018', value: '2018' },
  { label: '2019', value: '2019' },
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
];

watch(selectedSiDo, (newSiDo) => {
  if (!newSiDo) return;

  const list = guGunMap[newSiDo] ?? [];
  selectedGuGun.value = list[0]?.code ?? '';
});

const searchAccidents = async () => {
  console.log('검색 조건:', {
    searchYearCd: selectedYear.value,
    siDo: selectedSiDo.value,
    guGun: selectedGuGun.value,
    type: 'json',
  });
  const params: TrafficAccidentParam = {
    searchYearCd: selectedYear.value,
    siDo: selectedSiDo.value,
    guGun: selectedGuGun.value,
    type: 'json',
  };
  await trafficAccidentStore.getTrafficAccidentData(params);
};
</script>
