<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTransactionStore, type Transaction } from '../stores/transaction';
import { Button } from 'primevue';
import AddTransaction from '../components/AddTransaction.vue';
import AddTestData from '../components/AddTestData.vue';

const store = useTransactionStore();
const typeFilter = ref<'all' | 'earning' | 'spending'>('all');

const filteredRows = computed<Transaction[]>(() => {
	let data = [];
	if (typeFilter.value == 'all') {
		data = store.transactions;
	} else {
		data = store.transactions.filter((tx) => tx.type == typeFilter.value);
	}

	return data;
});

const tableRows = computed(() => {
	const data = filteredRows.value;
	const moneyFormatter = new Intl.NumberFormat('en-US');

	return data.map((tx) => ({
		id: tx.id,
		category: tx.category,
		date: new Date(tx.date).toLocaleDateString('tr-TR'),
		type: tx.type == 'earning' ? 'Earning' : 'Spending',
		amount: moneyFormatter.format(tx.amount) + ' TRY',
	}));
});

const showAddTransactionPopup = ref(false);

function removeTransaction(id: any) {
	store.removeTransaction(id);
}
</script>

<template>
	<div class="flex justify-center">
		<div class="card max-w-full w-3xl">
			<div class="flex justify-between mb-6">
				<SelectButton
					v-model="typeFilter"
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
					@click="showAddTransactionPopup = !showAddTransactionPopup"
				></Button>
			</div>

			<p v-if="tableRows.length == 0" class="mt-12 text-center">
				No transactions yet. Add one above!
			</p>

			<DataTable
				v-else
				:value="tableRows"
				size="small"
				paginator
				:rows="5"
				:rowsPerPageOptions="[5, 10, 20, 50]"
			>
				<Column header="Type">
					<template #body="{ data }">
						<Tag
							:value="data.type"
							:severity="data.type == 'Earning' ? 'success' : 'danger'"
						/>
					</template>
				</Column>
				<Column field="category" header="Category"></Column>
				<Column field="date" header="Date"></Column>
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
							@click="removeTransaction(data.id)"
							severity="danger"
							size="small"
							rounded
						></Button>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>

	<AddTransaction
		:visible="showAddTransactionPopup"
		@hide="showAddTransactionPopup = false"
	/>

	<AddTestData />
</template>
