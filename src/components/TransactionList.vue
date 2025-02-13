<script setup lang="ts">
import { useTransactionStore } from '../stores/transaction';

const store = useTransactionStore();
</script>

<template>
	<h1>Earnings: {{ store.earnings.map((x) => x.category) }}</h1>
	<h2>Spendings: {{ store.spendings.map((x) => x.category) }}</h2>
</template>
