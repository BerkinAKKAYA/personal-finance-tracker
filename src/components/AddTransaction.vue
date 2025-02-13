<script setup lang="ts">
import { ref, watch } from 'vue';
import {
	useTransactionStore,
	type Transaction,
	type TransactionType,
} from '../stores/transaction';
import type { AutoCompleteCompleteEvent } from 'primevue';

const TRANSACTION_TYPE_OPTIONS = [
	{ name: 'Earning', value: 'earning' },
	{ name: 'Spending', value: 'spending' },
];

const CATEGORY_OPTIONS: Record<TransactionType, string[]> = {
	earning: ['Salary'],
	spending: ['Food', 'Entertainment'],
};

const store = useTransactionStore();

const transactionType = ref<TransactionType>('earning');
const transactionCategory = ref<string>('');
const amount = ref<number>(0);

watch(transactionType, () => {
	transactionCategory.value = '';
});

const items = ref();
const search = (event: AutoCompleteCompleteEvent) => {
	items.value = CATEGORY_OPTIONS[transactionType.value].filter((option) => {
		return option.toLowerCase().startsWith(event.query.toLowerCase());
	});
};

function Submit() {
	const transaction: Transaction = {
		type: transactionType.value,
		category: transactionCategory.value,
		amount: amount.value,
	};
	store.addTransaction(transaction);

	transactionCategory.value = '';
	amount.value = 0;
}
</script>

<template>
	<div
		class="grid gap-3 items-end"
		style="grid-template-columns: repeat(4, 1fr)"
	>
		<div class="flex-auto">
			<label for="transaction-type" class="font-bold block mb-2"> Type </label>
			<Select
				inputId="transaction-type"
				v-model="transactionType"
				:options="TRANSACTION_TYPE_OPTIONS"
				optionLabel="name"
				optionValue="value"
				placeholder="Transaction Type"
				fluid
			/>
		</div>

		<div class="flex-auto">
			<label for="transaction-amount" class="font-bold block mb-2">
				Amount
			</label>
			<InputNumber
				input-id="transaction-amount"
				v-model="amount"
				mode="currency"
				currency="TRY"
				fluid
				:min="0"
			/>
		</div>

		<div class="flex-auto">
			<label for="transaction-category" class="font-bold block mb-2">
				Category
			</label>
			<AutoComplete
				inputId="transaction-category"
				v-model="transactionCategory"
				:suggestions="items"
				@complete="search"
				dropdown
				fluid
			/>
		</div>

		<Button
			:disabled="transactionCategory === '' || amount <= 0"
			@click="Submit"
			label="Add"
			fluid
		/>
	</div>
</template>

<style scoped></style>
