import { db } from '$lib/server/db';
import { places } from '$lib/server/db/schema';
import { createHash } from 'crypto';
import { sql } from 'drizzle-orm';

//Never underestimate timezones, they will break you
/**
 * {weekFrom1970-1-1}
 */
function seedEpochWeek() {
	//TODO Auto tests!!!
	const d = new Date(); //Can be local, only getTime is used
	// const s = (6 + new Date(0).getUTCDay()) % 7; //Get day of 1970-1-1, but start week on monday
	const s = 3; //Same as line above
	return Math.ceil((d.getTime() / 86400000 + s) / 7);
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

export async function getStrollPlaceWeek() {
	const i = r(seedEpochWeek());
	let p = await db
		.select({ name: places.name, region: places.region, tz: places.tz })
		.from(places)
		.where(sql`rowid = ${i} % (SELECT max(rowid) FROM places) + 1`);
	//Not working on missing rowids and ids (or just make sure there aren't any in the db lol)
	return p[0];
}

export async function getStrollPlaceRandom() {
	let p = await db
		.select({ name: places.name, region: places.region, tz: places.tz })
		.from(places)
		.where(sql`rowid = abs(random()) % (SELECT max(rowid) FROM places) + 1`);
	// Not working on missing rowids and ids(or just make sure there aren't any in the db lol)
	return p[0];
}
