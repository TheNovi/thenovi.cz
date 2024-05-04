<script lang="ts">
	import type { Places } from '$lib/schema/places';
	type Place = Omit<Places, 'id'>;

	const { place, picking = false }: { place: Omit<Places, 'id'> | undefined; picking: boolean } = $props();
	// $effect(() => console.log(place));
</script>

{#snippet link(name: string, prefix: string, link: string | null)}
	<!-- TODO Icons -->
	{#if link}
		<li>
			<a href={prefix + link} target="_blank" rel="noopener noreferrer">
				{name}
			</a>
		</li>
	{/if}
{/snippet}

{#if picking}
	<!-- TODO Some anim -->
	Losuji...
{:else if place}
	<div class="flex flex-col items-center mb-5">
		<h2 class="m-10">{place.name}</h2>
		<ul class="flex row gap-5">
			{@render link('G', 'https://google.cz/search?q=', place.name)}
			{@render link('MAPS', 'https://www.google.com/maps/search/', place.name)}
			{@render link('KZN', 'https://kudyznudy.cz/', place.link_KZN)}
		</ul>
	</div>
{/if}
