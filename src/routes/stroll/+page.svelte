<script lang="ts">
	import type { Places } from '$lib/schema/places';
	import { onMount } from 'svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
	let place: Omit<Places, 'id'> | undefined = undefined;
	onMount(() => {
		fetch('/stroll/api')
			.then((r) => r.json())
			.then((r) => (place = r));
	});
</script>

Hello {JSON.stringify(place)}
