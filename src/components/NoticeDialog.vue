<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-sm" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
        <div>{{ props.message }}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="확인" @click="onClickOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
});

defineEmits([...useDialogPluginComponent.emits]);

const { onDialogHide, onDialogOK } = useDialogPluginComponent();

const onClickOk = () => {
  onDialogOK();
};
</script>
