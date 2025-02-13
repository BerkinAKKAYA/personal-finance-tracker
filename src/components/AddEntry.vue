<template>
  <div class="flex gap-2">
    <input type="number" placeholder="Amount" />

    <select>
      <option>Earning</option>
      <option>Spending</option>
    </select>

    <button @click="store.increment()">Send</button>
  </div>


  <h1>Count is {{ store.count }}</h1>
  <h2>Double is {{ store.doubleCount }}</h2>
</template>

<script setup lang="ts">
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
