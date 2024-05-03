<script lang="ts">
	import Header from '$lib/Header.svelte';
	import type { Places } from '$lib/schema/places';
	import { random, wait } from '$lib/util';
	type Place = Omit<Places, 'id'>;

	let picking = $state(false);
	let place: Place | undefined = $state(undefined);
	// let place = $state({ name: 'Super nazev', link_KZN: 'asd' });
	async function getRandomPlace() {
		if (picking) return;
		picking = true;
		let p;
		await Promise.all([
			fetch('/stroll/api')
				.then((r) => r.json())
				.then((r) => (p = r)),
			wait(random(2, 5) * 1000),
		]);
		place = p;
		picking = false;
	}
	// $effect(() => console.log(place));
</script>

<Header title={'Stroll'} />

{#snippet button()}
	<button type="button" disabled={picking} class="size-fit bg-slate-600 m-2" onclick={getRandomPlace}>
		Vylosuj náhodné místo v čechách
	</button>
{/snippet}
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

{#snippet result(p: Place)}
	<div class="flex flex-col items-center text-center">
		{@render button()}
		{#if picking}
			<!-- TODO Some anim -->
			Losuji...
		{:else}
			<div><h2 class="m-10">{p.name}</h2></div>
			<ul class="flex row gap-5">
				{@render link('G', 'https://google.cz/search?q=', p.name)}
				{@render link('MAPS', 'https://www.google.com/maps/search/', p.name)}
				{@render link('KZN', 'https://kudyznudy.cz/', p.link_KZN)}
			</ul>
		{/if}
	</div>
{/snippet}

{#if !place}
	<div class="flex flex-col h-screen items-center justify-center text-center">
		<span> Nevíš kam zrovna jet? Stačí kliknout na tlačítko a hned budeš vědět. </span>
		{@render button()}
		{#if picking}
			<!-- TODO Some anim -->
			Losuji...
		{:else}
			&nbsp;
		{/if}
	</div>
{:else}
	{@render result(place)}
{/if}
