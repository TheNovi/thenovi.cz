<script lang="ts">
	import Header from '$lib/Header.svelte';
	import '../app.pcss';
	let { children, data } = $props();
</script>

<Header title="" />
{@render children()}
