import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../pages/HomeView.vue';
import ReportsView from '../pages/ReportsView.vue';

const routes = [
	{ path: '/', component: HomeView },
	{ path: '/reports', component: ReportsView },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

export default router;
