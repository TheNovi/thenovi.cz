<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<svelte:head>
	{#if !title}
		<title>TheNovi</title>
	{:else}
		<title>
			TheNovi | {title}
		</title>
	{/if}
</svelte:head>
