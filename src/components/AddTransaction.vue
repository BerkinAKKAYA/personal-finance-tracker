<script setup lang="ts">
import { ref, watch } from 'vue';
import {
	useTransactionStore,
	type Transaction,
	type TransactionType,
} from '../stores/transaction';
import { DatePicker, type AutoCompleteCompleteEvent } from 'primevue';
import { v4 as uuid } from 'uuid';
import { GenerateOptions } from '../data/CategoryOptions';

const props = defineProps({
	visible: Boolean,
});

const store = useTransactionStore();

const CATEGORY_OPTIONS = GenerateOptions(store.transactions);

const transactionType = ref<TransactionType>('earning');
const transactionCategory = ref<string>('');
const transactionAmount = ref<number>(0);
const transactionDate = ref<Date>(new Date());

watch(transactionType, () => {
	transactionCategory.value = '';
});

const transactionCategoryItems = ref();
const searchTransactionCategory = (event: AutoCompleteCompleteEvent) => {
	const allOfType = CATEGORY_OPTIONS[transactionType.value];

	transactionCategoryItems.value = allOfType.filter((option) => {
		const optionLowercase = option.toLowerCase();
		const searchKeyword = event.query.toLowerCase();
		return optionLowercase.startsWith(searchKeyword);
	});
};

function Submit() {
	const transaction: Transaction = {
		id: uuid(),
		type: transactionType.value,
		category: transactionCategory.value,
		amount: transactionAmount.value,
		date: transactionDate.value,
	};
	store.addTransaction(transaction);

	transactionCategory.value = '';
	transactionAmount.value = 0;
}
</script>

<template>
	<Dialog
		v-model:visible="props.visible"
		header="Add Transaction"
		modal
		:close-on-escape="true"
		:closable="false"
	>
		<div class="flex items-center gap-4 mb-4">
			<label for="transaction-type" class="font-semibold w-36">Type</label>
			<Select
				inputId="transaction-type"
				v-model="transactionType"
				:options="[
					{ name: 'Earning', value: 'earning' },
					{ name: 'Spending', value: 'spending' },
				]"
				optionLabel="name"
				optionValue="value"
				placeholder="Transaction Type"
				fluid
			/>
		</div>
		<div class="flex items-center gap-4 mb-4">
			<label for="transaction-date" class="font-semibold w-36"> Date </label>
			<DatePicker
				inputId="transaction-date"
				v-model="transactionDate"
				style="width: 100%"
			/>
		</div>
		<div class="flex items-center gap-4 mb-4">
			<label for="transaction-amount" class="font-semibold w-36">Amount</label>
			<InputNumber
				input-id="transaction-amount"
				v-model="transactionAmount"
				mode="currency"
				currency="TRY"
				fluid
				:min="0"
			/>
		</div>
		<div class="flex items-center gap-4 mb-4">
			<label for="transaction-category" class="font-semibold w-36">
				Category
			</label>
			<AutoComplete
				inputId="transaction-category"
				v-model="transactionCategory"
				:suggestions="transactionCategoryItems"
				@complete="searchTransactionCategory"
				dropdown
				style="width: 100%"
			/>
		</div>
		<div class="flex justify-end gap-2">
			<Button
				type="button"
				label="Cancel"
				severity="secondary"
				@click="$emit('hide')"
			></Button>
			<Button
				type="button"
				label="Save"
				@click="
					() => {
						Submit();
						$emit('hide');
					}
				"
				:disabled="
					transactionCategory === '' ||
					transactionAmount <= 0 ||
					!transactionDate
				"
			></Button>
		</div>
	</Dialog>
</template>

<style scoped></style>
