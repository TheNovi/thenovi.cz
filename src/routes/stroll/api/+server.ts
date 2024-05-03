import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { places } from '$lib/schema/places';

export const GET: RequestHandler = async () => {
	// let p = await db.query.places.findFirst({ orderBy: [sql`RANDOM()`] });
	let p = await db
		.select({ name: places.name, link_KZN: places.link_KZN })
		.from(places)
		.orderBy(sql`RANDOM()`)
		.limit(1);

	return json(p ? p[0] : {});
};
