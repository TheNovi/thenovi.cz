<script lang="ts">
	import Header from '$lib/Header.svelte';
	import type { Places } from '$lib/schema/places';
	import Place from './Place.svelte';
	import { random, wait } from '$lib/util';

	let { data } = $props();

	let picking = $state(false);
	let place: Omit<Places, 'id'> | undefined = $state(undefined);
	// let place = $state({ name: 'Super nazev', link_KZN: 'asd' });
	async function getRandomPlace(depth = 0) {
		if (depth) console.log(`Stroll | same place d=${depth}`, data.week);
		if (picking) return;
		picking = true;
		let p: typeof place;
		await Promise.all([
			fetch('/stroll/api')
				.then((r) => r.json())
				.then((r) => (p = r)),
			depth ? undefined : wait(random(1, 3) * 1000),
		]);
		picking = false;
		if (depth < 3 && (!p || p.name == data.week.name)) return getRandomPlace(depth + 1); //Pick another if same or empty
		place = p;
	}
	// $effect(() => console.log(data.week));
</script>

<Header title={'Stroll'} />

{#snippet button()}
	<button type="button" disabled={picking} class="size-fit bg-slate-600 m-2" onclick={() => getRandomPlace()}>
		{#if !place}
			Nelíbí se? Zkus si vylosovat vlastní!
		{:else}
			Nelíbí se? Zkus štěstí znovu!
		{/if}
	</button>
{/snippet}
<div class="flex flex-col items-center text-center mt-2">
	Chceš na výlet, ale nevíš kam? Zde najdeš každý týden nový tip kam vyrazit. A pokud daná lokace zrovna nebude
	vyhovovat, tak si jednoduše vylosuješ novou.
	<i>(Toto je velice raná verze aplikace, očekávej chyby)</i>
	<Place place={data.week} picking={false} />
	{@render button()}
	<Place {place} {picking} />
</div>
