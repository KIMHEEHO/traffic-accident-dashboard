<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> 🚗 Traffic Accident Dashboard </q-toolbar-title>
        <q-btn flat round icon="dark_mode" @click="toggleDark" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { Dark } from 'quasar';

const toggleDark = () => {
  Dark.toggle();
};
</script>
