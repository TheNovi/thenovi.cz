import { getStrollPlaceWeek } from '$lib/server/api/stroll';
import type { PageServerLoad } from './$types';

//TODO As endpoint (for 3rd party sites)
export const load: PageServerLoad = async () => {
	return { week: await getStrollPlaceWeek() };
};
