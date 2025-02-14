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
		return {
			transactions: GetFromLocalStorage(),
		};
	},
	actions: {
		clearTransactions() {
			this.transactions = [];
			UpdateLocalStorage(this.transactions);
		},
		addTransaction(transaction: Transaction) {
			this.transactions.push(transaction);
			this.transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
			UpdateLocalStorage(this.transactions);
		},
		removeTransaction(id: string) {
			this.transactions = this.transactions.filter((tx) => tx.id != id);
			UpdateLocalStorage(this.transactions);
		},
	},
	getters: {},
});

function GetFromLocalStorage(): Transaction[] {
	const storedTransactionsStr = localStorage.getItem(TRANSACTION_LIST_KEY);
	const storedTransactions: Transaction[] = storedTransactionsStr
		? JSON.parse(storedTransactionsStr)
		: [];

	storedTransactions.forEach((x) => (x.date = new Date(x.date)));
	storedTransactions.sort((a, b) => a.date.getTime() - b.date.getTime());

	return storedTransactions;
}

function UpdateLocalStorage(data: Transaction[]) {
	localStorage.setItem(TRANSACTION_LIST_KEY, JSON.stringify(data));
}
