<script setup>
import { computed } from 'vue';
import { useTransactionStore } from '../stores/transaction';

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

	const earnings = [];
	const spendings = [];

	for (const x of months) {
		const [month, year] = x.split('-');
		const transactions = store.transactions.filter(
			(x) => x.date.getMonth() == month && x.date.getFullYear() == year
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
			.map((x) => x.split('-'))
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
	<Chart type="bar" :data="spendings" :options="chartOptions" />
</template>
