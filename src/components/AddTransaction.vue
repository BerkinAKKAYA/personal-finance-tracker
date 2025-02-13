<script setup lang="ts">
import { ref } from 'vue';
import {
	useTransactionStore,
	type Transaction,
	type TransactionType,
} from '../stores/transaction';

const store = useTransactionStore();

const amount = ref<number>(0);
const transactionType = ref<TransactionType | ''>('');
const transactionCategory = ref<string>('');

function Submit() {
	if (transactionType.value == '') return;

	const transaction: Transaction = {
		type: transactionType.value,
		category: transactionCategory.value,
		amount: amount.value,
	};
	store.addTransaction(transaction);
}
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

		<button v-if="transactionCategory != ''" @click="Submit">Send</button>
	</div>
</template>

<style scoped>
button {
	background-color: lightgreen;
}
</style>
