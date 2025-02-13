<script setup lang="ts">
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
</script>

<template>
  <h1>Count is {{ store.count }}</h1>

  <h2>Double is {{ store.doubleCount }}</h2>

  <button @click="store.increment()">Increment</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
