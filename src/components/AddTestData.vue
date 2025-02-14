<script setup lang="ts">
import type { Transaction } from '../stores/transaction';
import { useTransactionStore } from '../stores/transaction';

const store = useTransactionStore();

const MOCK_DATA: Transaction[] = [
	// January Earnings
	{ id: '1', type: 'earning', category: 'Salary', amount: 1200, date: new Date('2024-01-01') },
	{ id: '2', type: 'earning', category: 'Freelance', amount: 300, date: new Date('2024-01-15') },

	// January Expenses
	{ id: '3', type: 'spending', category: 'Food', amount: 50, date: new Date('2024-01-02') },
	{ id: '4', type: 'spending', category: 'Food', amount: 80, date: new Date('2024-01-10') },
	{ id: '5', type: 'spending', category: 'Food', amount: 120, date: new Date('2024-01-20') },
	{ id: '6', type: 'spending', category: 'Entertainment', amount: 100, date: new Date('2024-01-12') },
	{ id: '7', type: 'spending', category: 'Transportation', amount: 80, date: new Date('2024-01-20') },
	{ id: '8', type: 'spending', category: 'Shopping', amount: 150, date: new Date('2024-01-25') },
	{ id: '9', type: 'spending', category: 'Healthcare', amount: 200, date: new Date('2024-01-28') },
	{ id: '10', type: 'spending', category: 'Utilities', amount: 180, date: new Date('2024-01-30') },
	{ id: '11', type: 'spending', category: 'Gym', amount: 50, date: new Date('2024-01-05') },
	{ id: '12', type: 'spending', category: 'Subscriptions', amount: 40, date: new Date('2024-01-07') },
	{ id: '13', type: 'spending', category: 'Clothing', amount: 90, date: new Date('2024-01-15') },
	{ id: '14', type: 'spending', category: 'Gadgets', amount: 250, date: new Date('2024-01-18') },
	{ id: '15', type: 'spending', category: 'Dining Out', amount: 60, date: new Date('2024-01-23') },

	// February Earnings
	{ id: '16', type: 'earning', category: 'Salary', amount: 1200, date: new Date('2024-02-01') },
	{ id: '17', type: 'earning', category: 'Bonus', amount: 150, date: new Date('2024-02-10') },

	// February Expenses
	{ id: '18', type: 'spending', category: 'Food', amount: 70, date: new Date('2024-02-03') },
	{ id: '19', type: 'spending', category: 'Food', amount: 100, date: new Date('2024-02-12') },
	{ id: '20', type: 'spending', category: 'Food', amount: 130, date: new Date('2024-02-22') },
	{ id: '21', type: 'spending', category: 'Entertainment', amount: 120, date: new Date('2024-02-14') },
	{ id: '22', type: 'spending', category: 'Transportation', amount: 90, date: new Date('2024-02-18') },
	{ id: '23', type: 'spending', category: 'Shopping', amount: 220, date: new Date('2024-02-22') },
	{ id: '24', type: 'spending', category: 'Healthcare', amount: 180, date: new Date('2024-02-26') },
	{ id: '25', type: 'spending', category: 'Utilities', amount: 190, date: new Date('2024-02-28') },
	{ id: '26', type: 'spending', category: 'Gym', amount: 55, date: new Date('2024-02-06') },
	{ id: '27', type: 'spending', category: 'Subscriptions', amount: 45, date: new Date('2024-02-09') },
	{ id: '28', type: 'spending', category: 'Clothing', amount: 100, date: new Date('2024-02-16') },
	{ id: '29', type: 'spending', category: 'Gadgets', amount: 260, date: new Date('2024-02-19') },
	{ id: '30', type: 'spending', category: 'Dining Out', amount: 75, date: new Date('2024-02-24') },
];

function AddData() {
	store.clearTransactions();

	for (const data of MOCK_DATA) {
		store.addTransaction(data);
	}
}

function ClearData() {
	store.clearTransactions()
}
</script>

<template>
	<button
		style="
			position: fixed;
			right: 20px;
			bottom: 50px;
			color: #aca;
			font-weight: bold;
			cursor: pointer;
			font-size: 12px;
		"
		@click="AddData"
	>
		fill with test data
	</button>
	<button
		style="
			position: fixed;
			right: 20px;
			bottom: 20px;
			color: #caa;
			font-weight: bold;
			cursor: pointer;
			font-size: 12px;
		"
		@click="ClearData"
	>
		clear all data
	</button>
</template>
