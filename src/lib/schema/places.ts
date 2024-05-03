import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const places = sqliteTable('places', {
	id: integer('id').primaryKey(),
	name: text('name').unique().notNull().default(''),
	link_KZN: text('link_KZN'),
	// created: integer('created')
	// 	.notNull()
	// 	.default(sql`CURRENT_TIMESTAMP`),
});
export type Places = typeof places.$inferSelect; // return type when queried
