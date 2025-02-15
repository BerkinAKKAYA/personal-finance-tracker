<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTransactionStore, type Transaction } from '../stores/transaction';
import {
	AutoComplete,
	Button,
	DatePicker,
	type AutoCompleteCompleteEvent,
} from 'primevue';
import AddTransaction from '../components/AddTransaction.vue';
import AddTestData from '../components/AddTestData.vue';
import { FilterMatchMode } from '@primevue/core/api';
import { GenerateOptionsForType } from '../data/CategoryOptions';

const store = useTransactionStore();

const filterType = ref(''); // TODO
const filterCategory = ref('');
const filterDate = ref<Date | null>(null);

const tableData = computed<Transaction[]>(() => {
	let data = store.transactions;

	if (filterType.value != '') {
		data = data.filter((tx) => tx.type == filterType.value);
	}

	if (filterCategory.value != '') {
		data = data.filter((tx) => tx.category == filterCategory.value);
	}

	if (filterDate.value != null) {
		data = data.filter(
			(tx) =>
				tx.date.getMonth() == filterDate.value?.getMonth() &&
				tx.date.getFullYear() == filterDate.value?.getFullYear()
		);
	}

	return data;
});

const tableRows = computed(() => {
	const data = tableData.value;
	const moneyFormatter = new Intl.NumberFormat('en-US');

	return data.map((tx) => ({
		...tx,
		type: tx.type == 'earning' ? 'Earning' : 'Spending',
		amount: moneyFormatter.format(tx.amount) + ' TRY',
	}));
});

const showAddTransactionPopup = ref(false);

function removeTransaction(id: any) {
	store.removeTransaction(id);
}

const filters = ref({
	category: { value: '', matchMode: FilterMatchMode.CONTAINS },
});

const categoryKeys = computed(() => {
	const earnings = GenerateOptionsForType(store.transactions, 'earning');
	const spendings = GenerateOptionsForType(store.transactions, 'spending');

	switch (filterType.value) {
		case '':
			return [...earnings, ...spendings];
		case 'earning':
			return earnings;
		case 'spending':
			return spendings;
	}
});

const transactionCategoryItems = ref();
const searchTransactionCategory = (event: AutoCompleteCompleteEvent) => {
	const allOfType = categoryKeys.value;
	if (!allOfType) return;

	transactionCategoryItems.value = allOfType.filter((option) => {
		const optionLowercase = option.toLowerCase();
		const searchKeyword = event.query.toLowerCase();
		return optionLowercase.startsWith(searchKeyword);
	});
};
</script>

<template>
	<div class="flex justify-center">
		<div class="card max-w-full w-3xl">
			<div class="flex justify-between mb-8">
				<h2 class="text-xl font-semibold">Transaction List</h2>

				<Button
					icon="pi pi-plus"
					severity="success"
					label="Add Transaction"
					@click="showAddTransactionPopup = !showAddTransactionPopup"
				></Button>
			</div>

			<DataTable
				:value="tableRows"
				size="small"
				paginator
				:rows="8"
				filterDisplay="row"
				:filters="filters"
				:globalFilterFields="['category']"
			>
				<template #empty>
					<p class="text-center my-4">No transactions yet</p>
				</template>

				<Column header="Type" field="type">
					<template #body="{ data }">
						<Tag
							:value="data.type"
							:severity="data.type == 'Earning' ? 'success' : 'danger'"
						/>
					</template>
				</Column>

				<Column
					header="Category"
					field="category"
					:showFilterMenu="false"
					:show-filter-match-modes="false"
				>
					<template #body="{ data }">{{ data.category }}</template>
					<template #filter="{ filterModel }">
						<AutoComplete
							v-model="filterModel.value"
							@change="filterCategory = filterModel.value"
							placeholder="Select One"
							style="width: 100%"
							inputId="transaction-category"
							:suggestions="transactionCategoryItems"
							@complete="searchTransactionCategory"
							dropdown
							forceSelection
						>
							<template #option="slotProps">
								{{ slotProps.option }}
							</template>
						</AutoComplete>
					</template>
					<template #filterclearicon>
						<Button
							icon="pi pi-filter-slash"
							@click="filterCategory = ''"
							severity="secondary"
							size="small"
							rounded
						></Button>
					</template>
				</Column>

				<Column header="Date" field="date" sortable :show-filter-menu="false">
					<template #body="{ data }">
						{{ data.date.toLocaleDateString('tr-TR') }}
					</template>
					<template #filter>
						<DatePicker
							view="month"
							dateFormat="mm/yy"
							showButtonBar
							style="width: 180px"
							v-model="filterDate"
							placeholder="Select Month"
						/>
					</template>
				</Column>

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
