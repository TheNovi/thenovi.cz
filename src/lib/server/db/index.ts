import { dev } from '$app/environment';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!dev && !DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');
const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
export const db = drizzle(client, { schema });
// export const db = drizzle(client);