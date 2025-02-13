import { defineStore } from 'pinia';

export type TransactionType = 'earning' | 'spending';
export type Transaction = {
	type: TransactionType;
	category: string;
	amount: number;
};

export const useTransactionStore = defineStore('transaction', {
	state: () => {
		return {
			transactions: [] as Transaction[],
		};
	},
	actions: {
		addTransaction(transaction: Transaction) {
			this.transactions.push(transaction);
		},
	},
	getters: {},
});
