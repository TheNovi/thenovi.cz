<script lang="ts">
	import Header from '$lib/Header.svelte';
</script>

<Header title="Home" />

<div class="fixed inset-0 size-fit m-auto text-center">
	<h1 class="text-white text-6xl">
		<span id="the">The</span><span id="novi">Novi</span>
	</h1>
	<span id="shruge">¯\_(ツ)_/¯</span>
	<ul>
		<li>&gt;<a href="/stroll">stroll</a>&lt;</li>
	</ul>
</div>

<style lang="postcss">
	#the {
		animation: appear 5s;
	}
	#novi {
		opacity: 0;
		animation: appear 5s forwards 1s;
	}

	#shruge {
		@apply block my-2 opacity-0;
		animation: appear 5s forwards 3s;
	}

	li a {
		text-decoration: underline;
		margin-inline: 2px;
	}
</style>
