<script setup lang="ts">
import { computed } from 'vue';
import { useTransactionStore, type Transaction } from '../stores/transaction';
import Chart from 'primevue/chart';

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const store = useTransactionStore();

const spendings = computed(() => {
	const documentStyle = getComputedStyle(document.documentElement);

	const months = [
		...new Set(
			store.transactions.map((x) =>
				[x.date.getMonth(), x.date.getFullYear()].join('-')
			)
		),
	];

	const earnings: number[] = [];
	const spendings: number[] = [];

	for (const data of months) {
		const [month, year] = data.split('-');
		const transactions = store.transactions.filter(
			(transaction: Transaction) =>
				transaction.date.getMonth() == parseInt(month) &&
				transaction.date.getFullYear() == parseInt(year)
		);

		earnings.push(
			transactions
				.filter((x) => x.type == 'earning')
				.reduce((a, b) => a + b.amount, 0)
		);

		spendings.push(
			transactions
				.filter((x) => x.type == 'spending')
				.reduce((a, b) => a + b.amount, 0)
		);
	}

	return {
		labels: months
			.map((x) => x.split('-').map((x) => parseInt(x)))
			.map(([month, year]) => `${MONTH_NAMES[month]} ${year}`),
		datasets: [
			{
				label: 'Earning',
				backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
				borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
				data: earnings,
			},
			{
				label: 'Spending',
				backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
				borderColor: documentStyle.getPropertyValue('--p-gray-500'),
				data: spendings,
			},
		],
	};
});
</script>

<template>
	<div class="flex flex-col gap-4">
		<h2 class="text-xl font-medium">Earnings & Spendings</h2>
		<Chart type="bar" :data="spendings" style="height: 250px" />
	</div>
</template>
