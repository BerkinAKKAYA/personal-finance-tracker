import { defineStore } from 'pinia';

export type TransactionType = 'earning' | 'spending';
export type Transaction = {
	id: string;
	type: TransactionType;
	category: string;
	amount: number;
	date: Date;
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
		clearTransactions() {
			this.transactions = [];
			UpdateLocalStorage(this.transactions);
		},
		addTransaction(transaction: Transaction) {
			this.transactions.push(transaction);
			UpdateLocalStorage(this.transactions);
		},
		removeTransaction(id: string) {
			this.transactions = this.transactions.filter((tx) => tx.id != id);
			UpdateLocalStorage(this.transactions);
		},
	},
	getters: {},
});

function UpdateLocalStorage(data: Transaction[]) {
	localStorage.setItem(TRANSACTION_LIST_KEY, JSON.stringify(data));
}
