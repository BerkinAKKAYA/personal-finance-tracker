<script setup lang="ts">
import 'primeicons/primeicons.css';
import Header from '../components/Header.vue';
</script>

<template>
	<div class="flex flex-col gap-16">
		<Header />

		<RouterView />
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
