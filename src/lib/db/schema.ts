import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  votes: many(votes),
}));

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
});

export const nominees = pgTable('nominees', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  // Class is 0: Regular, 1: Absent, 2: Other
  class: smallint('class'),
  imageUrl: text('image_url'),
});

export const nomineesRelations = relations(nominees, ({ many }) => ({
  votes: many(votes),
}));

export const votes = pgTable(
  'votes',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    nomineeId: integer('nominee_id')
      .notNull()
      .references(() => nominees.id),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
    votes: integer('votes').notNull().default(1),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.nomineeId, t.categoryId] }),
  }),
);

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  nominee: one(nominees, {
    fields: [votes.nomineeId],
    references: [nominees.id],
  }),
  category: one(categories, {
    fields: [votes.categoryId],
    references: [categories.id],
  }),
}));
