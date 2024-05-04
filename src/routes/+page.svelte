<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<Header title="Home" />

<div class="fixed inset-0 size-fit m-auto text-center">
	<h1 class="text-white text-6xl">TheNovi</h1>
	<span class="block my-2">¯\_(ツ)_/¯</span>
	<ul>
		<li>&gt;<a href="/stroll">stroll</a>&lt;</li>
	</ul>
</div>

<style lang="postcss">
	li a {
		text-decoration: underline;
		margin-inline: 2px;
	}
</style>
