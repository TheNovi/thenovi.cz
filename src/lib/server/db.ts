import { DB_TOKEN, DB_URL } from '$env/static/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../schema/places'; //TODO Better

const client = createClient({
	url: DB_URL,
	authToken: DB_TOKEN,
});
export const db = drizzle(client, { schema });
// export const db = drizzle(client);
