import type { Transaction, TransactionType } from '../stores/transaction';

const EARNING = ['Salary'];
const SPENDING = ['Food', 'Entertainment'];

export function GenerateOptionsForType(
	allTransactions: Transaction[],
	type: 'earning' | 'spending'
): string[] {
	const userKeys = allTransactions
		.filter((x) => x.type === type)
		.map((x) => x.category);
	const premadeKeys = type == 'earning' ? EARNING : SPENDING;

	return [...new Set([...userKeys, ...premadeKeys])];
}

export function GenerateOptions(
	allTransactions: Transaction[]
): Record<TransactionType, string[]> {
	return {
		earning: GenerateOptionsForType(allTransactions, 'earning'),
		spending: GenerateOptionsForType(allTransactions, 'spending'),
	};
}
