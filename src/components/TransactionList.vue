<script setup lang="ts">
import { useTransactionStore } from '../stores/transaction';

const store = useTransactionStore();
</script>

<template>
	<h1>Count is {{ store.count }}</h1>
	<h2>Double is {{ store.doubleCount }}</h2>
</template>
