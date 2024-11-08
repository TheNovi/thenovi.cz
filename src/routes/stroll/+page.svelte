<script lang="ts">
	import Header from '$lib/Header.svelte';
	import type { Places } from '$lib/server/db/schema';
	import { random, wait } from '$lib/util';
	import Place from './Place.svelte';
	import WeeklyStrollCountdown from './WeeklyStrollCountdown.svelte';

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
<div class="mt-2 flex flex-col items-center text-center">
	Chceš na výlet, ale nevíš kam? Zde najdeš každý týden nový tip kam vyrazit. A pokud daná lokace zrovna nebude
	vyhovovat, tak si jednoduše vylosuješ novou.
	<div class="m-2 text-xs">
		Další místo bude vylosováno za: <div><WeeklyStrollCountdown /></div>
	</div>
	<!-- Week stroll -->
	<Place place={data.week} picking={false} />

	<button type="button" disabled={picking} class="m-2 size-fit bg-slate-600" onclick={() => getRandomPlace()}>
		{#if !place}
			Nebo si vylosovuj vlastní!
		{:else}
			Zkus štěstí znovu!
		{/if}
	</button>
	<!-- User stroll -->
	<Place {place} {picking} />
</div>
