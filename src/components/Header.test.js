import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createMemoryHistory } from 'vue-router';
import Header from './Header.vue';

const routes = [
	{ path: '/', component: { template: 'Home' } },
	{ path: '/reports', component: { template: 'Reports' } },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

describe('Header.vue', () => {
	it('renders the title correctly', () => {
		const wrapper = mount(Header, {
			global: {
				plugins: [router],
			},
		});
		expect(wrapper.find('h1').text()).toBe('Personal Finance Tracker');
	});

	it('renders navigation links', () => {
		const wrapper = mount(Header, {
			global: {
				plugins: [router],
			},
		});

		const links = wrapper.findAll('a');
		expect(links).toHaveLength(2);
		expect(links[0].text()).toBe('Home');
		expect(links[1].text()).toBe('Reports');
	});
});
