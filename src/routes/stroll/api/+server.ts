import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { places } from '$lib/server/db/schema';

export const GET: RequestHandler = async () => {
	let p = await db
		.select({ name: places.name, region: places.region, tz: places.tz })
		.from(places)
		.where(sql`rowid = abs(random()) % (SELECT max(rowid) FROM places) + 1`);
	// Not working on missing rowids and ids(or just make sure there aren't any in the db lol)
	return json(p ? p[0] : {});
};
