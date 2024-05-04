import { places } from '$lib/schema/places';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { createHash } from 'crypto';

function seed() {
	const d = new Date();
	// const d = new Date(2024, 10, 5);
	const jan = new Date(d.getFullYear(), 0, 1);
	const week = Math.ceil(((d.getTime() - jan.getTime()) / 86400000 + jan.getDay()) / 7);
	return +`${week}${d.getUTCFullYear() % 100}`;
}

function r(v: number) {
	return parseInt(
		'0x' +
			createHash('SHA256')
				.update(v + '')
				.digest('hex')
				.slice(0, 10), //This limits max number (can be changed if needed)
		16
	);
}

export const load: PageServerLoad = async () => {
	const i = r(seed());
	// console.log(i);
	let p = await db
		.select({ name: places.name, link_KZN: places.link_KZN })
		.from(places)
		.where(sql`rowid = ${i} % (SELECT max(rowid) FROM places) + 1`);
	//TODO Fix missing rowids and ids (or just make sure there aren't any in the db lol)
	return { week: p[0] };
};
