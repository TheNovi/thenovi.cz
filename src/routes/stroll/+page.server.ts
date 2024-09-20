import { places } from '$lib/schema/places';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { createHash } from 'crypto';

function seed() {
	//Never underestimate timezones, they will break you
	const d = new Date();
	// const d = new Date(Date.UTC(2025, 0, 6));
	const jan = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const week = Math.ceil(((d.getTime() - jan.getTime()) / 86400000 + jan.getUTCDay()) / 7);
	return +`${week}${d.getUTCFullYear() % 100}`;
}

function r(v: number) {
	// console.log(v);
	return parseInt(
		'0x' +
			createHash('SHA256')
				.update(v + '')
				.digest('hex')
				.slice(0, 4), //This limits max number (can be changed if needed)
		16
	);
}

//TODO As endpoint (for 3rd party sites)
export const load: PageServerLoad = async () => {
	const i = r(seed());
	let p = await db
		.select({ name: places.name, region: places.region, tz: places.tz })
		.from(places)
		.where(sql`rowid = ${i} % (SELECT max(rowid) FROM places) + 1`);
	//Not working on missing rowids and ids (or just make sure there aren't any in the db lol)
	return { week: p[0] };
};
