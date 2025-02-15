<script setup lang="ts">
import type { Transaction } from '../stores/transaction';
import { useTransactionStore } from '../stores/transaction';

const store = useTransactionStore();

const MOCK_DATA: Transaction[] = [
  { id: '1', type: 'earning', category: 'Salary', amount: 1200, date: new Date('2025-01-01') },
  { id: '2', type: 'earning', category: 'Freelance', amount: 300, date: new Date('2025-01-15') },
  { id: '3', type: 'spending', category: 'Food', amount: 50, date: new Date('2025-01-02') },
  { id: '4', type: 'spending', category: 'Food', amount: 80, date: new Date('2025-01-10') },
  { id: '5', type: 'spending', category: 'Food', amount: 120, date: new Date('2025-01-20') },
  { id: '6', type: 'spending', category: 'Entertainment', amount: 100, date: new Date('2025-01-12') },
  { id: '7', type: 'spending', category: 'Transportation', amount: 80, date: new Date('2025-01-20') },
  { id: '8', type: 'spending', category: 'Shopping', amount: 150, date: new Date('2025-01-25') },
  { id: '9', type: 'spending', category: 'Healthcare', amount: 200, date: new Date('2025-01-28') },
  { id: '10', type: 'spending', category: 'Utilities', amount: 180, date: new Date('2025-01-30') },
  { id: '11', type: 'spending', category: 'Gym', amount: 50, date: new Date('2025-01-05') },
  { id: '12', type: 'spending', category: 'Subscriptions', amount: 40, date: new Date('2025-01-07') },
  { id: '13', type: 'spending', category: 'Clothing', amount: 90, date: new Date('2025-01-15') },
  { id: '14', type: 'spending', category: 'Gadgets', amount: 250, date: new Date('2025-01-18') },
  { id: '15', type: 'spending', category: 'Dining Out', amount: 60, date: new Date('2025-01-23') },
  { id: '16', type: 'earning', category: 'Salary', amount: 1200, date: new Date('2025-02-01') },
  { id: '17', type: 'earning', category: 'Bonus', amount: 150, date: new Date('2025-02-10') },
  { id: '18', type: 'spending', category: 'Food', amount: 70, date: new Date('2025-02-03') },
  { id: '19', type: 'spending', category: 'Food', amount: 100, date: new Date('2025-02-12') },
  { id: '20', type: 'spending', category: 'Food', amount: 130, date: new Date('2025-02-22') },
  { id: '21', type: 'spending', category: 'Entertainment', amount: 120, date: new Date('2025-02-14') },
  { id: '22', type: 'spending', category: 'Transportation', amount: 90, date: new Date('2025-02-18') },
  { id: '23', type: 'spending', category: 'Shopping', amount: 220, date: new Date('2025-02-22') },
  { id: '24', type: 'spending', category: 'Healthcare', amount: 180, date: new Date('2025-02-26') },
  { id: '25', type: 'spending', category: 'Utilities', amount: 190, date: new Date('2025-02-28') },
  { id: '26', type: 'spending', category: 'Gym', amount: 55, date: new Date('2025-02-06') },
  { id: '27', type: 'spending', category: 'Subscriptions', amount: 45, date: new Date('2025-02-09') },
  { id: '28', type: 'spending', category: 'Clothing', amount: 100, date: new Date('2025-02-16') },
  { id: '29', type: 'spending', category: 'Gadgets', amount: 260, date: new Date('2025-02-19') },
  { id: '30', type: 'spending', category: 'Dining Out', amount: 75, date: new Date('2025-02-24') },
  { id: '31', type: 'earning', category: 'Salary', amount: 1200, date: new Date('2025-03-01') },
  { id: '32', type: 'earning', category: 'Freelance', amount: 250, date: new Date('2025-03-12') },
  { id: '33', type: 'spending', category: 'Food', amount: 75, date: new Date('2025-03-05') },
  { id: '34', type: 'spending', category: 'Food', amount: 110, date: new Date('2025-03-14') },
  { id: '35', type: 'spending', category: 'Food', amount: 140, date: new Date('2025-03-25') },
  { id: '36', type: 'spending', category: 'Entertainment', amount: 130, date: new Date('2025-03-17') },
  { id: '37', type: 'spending', category: 'Transportation', amount: 85, date: new Date('2025-03-20') },
  { id: '38', type: 'spending', category: 'Shopping', amount: 200, date: new Date('2025-03-22') },
  { id: '39', type: 'spending', category: 'Healthcare', amount: 190, date: new Date('2025-03-27') },
  { id: '40', type: 'spending', category: 'Utilities', amount: 195, date: new Date('2025-03-30') },
  { id: '41', type: 'spending', category: 'Gym', amount: 55, date: new Date('2025-03-08') },
  { id: '42', type: 'spending', category: 'Subscriptions', amount: 50, date: new Date('2025-03-10') },
  { id: '43', type: 'spending', category: 'Clothing', amount: 110, date: new Date('2025-03-18') },
  { id: '44', type: 'spending', category: 'Gadgets', amount: 270, date: new Date('2025-03-21') },
  { id: '45', type: 'spending', category: 'Dining Out', amount: 80, date: new Date('2025-03-28') },
  { id: '46', type: 'spending', category: 'Travel', amount: 300, date: new Date('2025-03-15') }
];


function AddData() {
	store.clearTransactions();

	for (const data of MOCK_DATA) {
		store.addTransaction(data);
	}
}

function ClearData() {
	store.clearTransactions();
}
</script>

<template>
	<button
		class="hidden lg:block"
		style="
			position: fixed;
			right: 20px;
			bottom: 50px;
			color: #aca;
			font-weight: bold;
			cursor: pointer;
		"
		@click="AddData"
	>
		fill with test data
	</button>
	<button
		class="hidden lg:block"
		style="
			position: fixed;
			right: 20px;
			bottom: 20px;
			color: #caa;
			font-weight: bold;
			cursor: pointer;
		"
		@click="ClearData"
	>
		clear all data
	</button>
</template>
