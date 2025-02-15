import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AddTransaction from './AddTransaction.vue';
import { createTestingPinia } from '@pinia/testing';
import PrimeVue from 'primevue/config';

vi.mock('uuid', () => ({ v4: () => 'mocked-uuid' }));
vi.stubGlobal('matchMedia', () => ({
	addEventListener: vi.fn(),
}));

describe('AddTransaction.vue', () => {
	it('renders correctly if visible', async () => {
		const wrapper = mount(AddTransaction, {
			global: {
				plugins: [PrimeVue, createTestingPinia()],
			},
			props: { visible: true },
		});

		expect(wrapper.text()).toContain('Type');
		expect(wrapper.text()).toContain('Date');
		expect(wrapper.text()).toContain('Amount');
		expect(wrapper.text()).toContain('Category');
	});

	it('does not allow Save button to be clicked if required fields are empty', async () => {
		const wrapper = mount(AddTransaction, {
			global: {
				plugins: [PrimeVue, createTestingPinia()],
			},
			props: { visible: true },
		});

		await wrapper.vm.$nextTick();

		await wrapper.find('button[label="Save"]').trigger('click');
		expect(wrapper.emitted().hide).toBeFalsy();
	});
});
