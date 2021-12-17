<script lang="ts">
	import { theme } from '$lib/stores';
</script>

<svelte:head>
	<meta name="color-scheme" content={$theme} />
	<link rel="stylesheet" href={`/${$theme}.css`} />
</svelte:head>

<slot />
