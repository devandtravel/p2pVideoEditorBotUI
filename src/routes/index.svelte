<script>
	import ThemeSwitch from '../lib/components/ThemeSwitch.svelte';
	import Orders from '../lib/components/Orders.svelte';
</script>

<ThemeSwitch />
<section>
	<h1>Video Editor Bot UI</h1>
	<h2>Все заказы</h2>
	<Orders />
</section>

<style>
	h1 {
		color: white;
	}
</style>
