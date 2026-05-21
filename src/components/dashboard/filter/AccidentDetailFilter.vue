<template>
  <q-chip
    v-for="opt in options"
    :key="opt.value"
    clickable
    :color="selectedTypes.includes(opt.value) ? 'primary' : 'grey-4'"
    text-color="white"
    @click="toggle(opt.value)"
    :class="{
      'opacity-50': selectedTypes.length >= 3 && !selectedTypes.includes(opt.value),
    }"
  >
    {{ opt.label }}
  </q-chip>
  <div v-if="selectedTypes.length >= 3" class="text-caption text-grey">
    최대 3개까지만 선택 가능
  </div>
</template>
<script setup lang="ts">
import { useDashboardStore } from 'src/stores/useDashboardStore';
import { storeToRefs } from 'pinia';

const dashboardStore = useDashboardStore();
interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: '어린이사고', value: '어린이사고' },
  { label: '어린이보행사고', value: '어린이보행사고' },
  { label: '스쿨존내어린이사고', value: '스쿨존내어린이사고' },
  { label: '고령자사고', value: '고령자사고' },
  { label: '고령운전자사고', value: '고령운전자사고' },
  { label: '고령보행자사고', value: '고령보행자사고' },
  { label: '보행자사고', value: '보행자사고' },
  { label: '자전거사고', value: '자전거사고' },
  { label: '야간사고', value: '야간사고' },
  { label: '뺑소니사고', value: '뺑소니사고' },
  { label: '무면허사고', value: '무면허사고' },
  { label: '개인형이동수단(PM)사고', value: '개인형이동수단(PM)사고' },
];

const { selectedTypes } = storeToRefs(dashboardStore);

const toggle = (val: string) => {
  const idx = selectedTypes.value.indexOf(val);

  if (idx > -1) {
    selectedTypes.value.splice(idx, 1);
  } else {
    if (selectedTypes.value.length < 3) {
      selectedTypes.value.push(val);
    }
  }
};
</script>
