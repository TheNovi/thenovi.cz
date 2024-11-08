import { getStrollPlaceRandom } from '$lib/server/api/stroll';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json(await getStrollPlaceRandom());
};
