import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
	state: () => {
		return {
			count: 0,
		};
	},
	actions: {
		addTransaction(amount: number) {
			this.count += amount;
		},
	},
	getters: {
		doubleCount: (state): number => {
			return state.count * 2;
		},
		doublePlusOne(): number {
			return this.doubleCount + 1;
		},
	},
});
