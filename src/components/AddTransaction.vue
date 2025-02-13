<script setup lang="ts">
type TransactionType = 'earning' | 'spending' | '';

import { ref } from 'vue';
import { useTransactionStore } from '../stores/transaction';

const store = useTransactionStore();

const amount = ref<number>(0);
const transactionType = ref<TransactionType>('');
const transactionCategory = ref<string>('');
</script>

<template>
	<div class="flex gap-2">
		<input type="number" placeholder="Amount" v-model="amount" min="0" />

		<select v-if="amount > 0" v-model="transactionType">
			<option value="">Type</option>
			<option value="earning">Earning</option>
			<option value="spending">Spending</option>
		</select>

		<input
			v-if="transactionType != ''"
			type="text"
			placeholder="Category"
			v-model="transactionCategory"
		/>

		<button
			v-if="transactionCategory != ''"
			@click="store.addTransaction(amount)"
		>
			Send
		</button>
	</div>
</template>

<style scoped>
button {
	background-color: lightgreen;
}
</style>
