<script lang="ts">
	import type { Places } from '$lib/schema/places';

	const { place, picking = false }: { place: Omit<Places, 'id'> | undefined; picking: boolean } = $props();
	const pickingText = 'Losuji...';
	// $effect(() => console.log(place));
</script>

{#snippet link(title: string,  prefix: string, link: string | null, ico:string)}
	{#if link}
		<li>
			<a href={prefix + link} {title} target="_blank" rel="noopener noreferrer">
				<img src={ico ? ico : `//www.google.com/s2/favicons?domain=${prefix}&sz=20`} class="size-[20px]" alt={title} />
			</a>
		</li>
	{/if}
{/snippet}

{#if picking}
	<span>
		{#each pickingText as t, i}
			<span class="picking" style="animation-delay: {i / 5}s;">{t}</span>
		{/each}
	</span>
{:else if place}
	<div class="place flex flex-col items-center mb-5">
		<h2 class="mt-8 mb-1">{place.name}</h2>
		<ul class="flex row gap-2">
			{@render link('Google', '//google.cz/search?q=', place.name, '')}
			{@render link(
				'Google Maps',
				'//www.google.com/maps/search/',
				place.name,
				'//www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico'
			)}
			{@render link('Kudy z Nudy', '//kudyznudy.cz/', place.link_KZN, '')}
		</ul>
	</div>
{/if}

<style lang="postcss">
	/*prettier-ignore */
	@keyframes appear {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	/*prettier-ignore */
	@keyframes blink {
		0% { opacity: 0.2; }
		100% { opacity: 1; }
	}
	.picking {
		animation: blink 1s both 0s infinite alternate;
	}

	.place h2 {
		opacity: initial;
		animation: appear 5s;
	}
	.place * {
		opacity: 0;
		animation: appear 2s forwards 1s;
	}
</style>
