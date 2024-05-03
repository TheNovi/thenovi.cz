import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	let p = await db.query.places.findFirst({ orderBy: [sql`RANDOM()`] });
	return json(p);
};
