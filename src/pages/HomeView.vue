<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTransactionStore } from '../stores/transaction';
import { Button } from 'primevue';

const store = useTransactionStore();

const viewType = ref<'all' | 'earning' | 'spending'>('all');

const tableRows = computed(() => {
	let data = [];
	if (viewType.value == 'all') {
		data = store.transactions;
	} else {
		data = store.transactions.filter((tx) => tx.type == viewType.value);
	}

	const moneyFormatter = new Intl.NumberFormat('en-US');

	return data.map((tx) => ({
		type: tx.type == 'earning' ? 'Earning' : 'Spending',
		category: tx.category,
		amount: moneyFormatter.format(tx.amount) + ' TRY',
	}));
});
</script>

<template>
	<div class="flex justify-center">
		<div class="card max-w-full w-3xl">
			<div class="flex justify-between mb-6">
				<SelectButton
					v-model="viewType"
					:options="[
						{ label: 'All', value: 'all' },
						{ label: 'Earnings', value: 'earning' },
						{ label: 'Spendings', value: 'spending' },
					]"
					optionLabel="label"
					optionValue="value"
					dataKey="label"
					:allow-empty="false"
				/>

				<Button
					icon="pi pi-plus"
					severity="success"
					label="Add Transaction"
				></Button>
			</div>

			<p v-if="tableRows.length == 0" class="text-center">
				No transactions yet. Add one above!
			</p>

			<DataTable :value="tableRows" v-else>
				<Column field="type" header="Type"></Column>
				<Column field="category" header="Category"></Column>
				<Column
					field="amount"
					header="Amount"
					bodyStyle="text-align: right"
					headerStyle="display: flex; justify-content: end"
				></Column>
				<Column class="w-24 !text-end">
					<template #body="{ data }">
						<Button
							icon="pi pi-trash"
							@click="console.log(data)"
							severity="danger"
							rounded
						></Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>
