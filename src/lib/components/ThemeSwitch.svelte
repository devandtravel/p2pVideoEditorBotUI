<script lang="ts">
	import { theme } from '$lib/stores';
</script>

<select bind:value={$theme}>
	<option value="dark">Dark</option>
	<option value="light">Light</option>
</select>
