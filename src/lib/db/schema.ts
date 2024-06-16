import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
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
    nomineeId: serial('nominee_id')
      .notNull()
      .references(() => nominees.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.nomineeId] }),
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
}));
