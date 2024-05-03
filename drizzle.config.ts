import type { Config } from 'drizzle-kit';

console.log(process.env.DB_URL);

export default {
	schema: './src/lib/schema/*',
	out: './drizzle',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DB_URL!,
		authToken: process.env.DB_TOKEN!,
	},
	verbose: true,
	strict: true,
} satisfies Config;
