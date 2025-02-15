import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import EarningsSpendingsChart from './ReportsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTransactionStore } from '../stores/transaction';
import Chart from 'primevue/chart';

vi.mock('primevue/chart', () => ({
	default: vi.fn(() => 'mocked-chart'),
}));

describe('EarningsSpendingsChart.vue', () => {
	it('renders correctly and displays chart with the expected data', async () => {
		const pinia = createTestingPinia();
		const store = useTransactionStore(pinia);

		store.transactions = [
			{
				id: '1',
				type: 'earning',
				category: 'Salary',
				amount: 5000,
				date: new Date('2025-01-01'),
			},
			{
				id: '2',
				type: 'spending',
				category: 'Rent',
				amount: 1000,
				date: new Date('2025-01-01'),
			},
			{
				id: '3',
				type: 'earning',
				category: 'Freelance',
				amount: 2000,
				date: new Date('2025-02-01'),
			},
			{
				id: '4',
				type: 'spending',
				category: 'Groceries',
				amount: 500,
				date: new Date('2025-02-01'),
			},
		];

		const wrapper = mount(EarningsSpendingsChart, {
			global: {
				plugins: [pinia],
			},
		});

		expect(wrapper.findComponent(Chart).exists()).toBe(true);

		// Labels
		const chartData = wrapper.vm.spendings;
		expect(chartData.datasets[0].label).toBe('Earning');
		expect(chartData.datasets[1].label).toBe('Spending');

		// Data
		expect(chartData.labels).toContain('January 2025');
		expect(chartData.labels).toContain('February 2025');
		expect(chartData.datasets[0].data).toEqual([5000, 2000]); // Earnings
		expect(chartData.datasets[1].data).toEqual([1000, 500]); // Spendings
	});
});
