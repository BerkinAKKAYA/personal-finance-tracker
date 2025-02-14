import { defineStore } from 'pinia';

export type TransactionType = 'earning' | 'spending';
export type Transaction = {
	type: TransactionType;
	category: string;
	amount: number;
};

const TRANSACTION_LIST_KEY = 'transaction_list';

export const useTransactionStore = defineStore('transaction', {
	state: () => {
		const storedTransactionsStr = localStorage.getItem(TRANSACTION_LIST_KEY);
		const storedTransactions = storedTransactionsStr
			? JSON.parse(storedTransactionsStr)
			: [];

		return {
			transactions: storedTransactions as Transaction[],
		};
	},
	actions: {
		addTransaction(transaction: Transaction) {
			this.transactions.push(transaction);

			localStorage.setItem(
				TRANSACTION_LIST_KEY,
				JSON.stringify(this.transactions)
			);
		},
	},
	getters: {},
});
